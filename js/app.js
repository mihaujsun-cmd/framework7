var routes = routes;

let app = new Framework7({
  el: "#app",
  name: "MaToDo",
  theme: "auto",
  routes: routes,
});

var mainView = app.views.create(".view-main", {
  url: "/",
});

// ── Bloc 4 : LocalStorage ──────────────────────────────────────────
var CLE = 'ma-todo-taches';

function sauvegarder() {
  localStorage.setItem(CLE, JSON.stringify(taches));
}

function chargerTaches() {
  var data = localStorage.getItem(CLE);
  if (data) return JSON.parse(data);
  return [
    { id: 1, texte: "Ranger mes fournitures", fait: false },
    { id: 2, texte: "Réviser JavaScript", fait: true },
    { id: 3, texte: "Faire la lessive", fait: false },
  ];
}

var taches = chargerTaches();

// ── Bloc 3 : Filtre actif ──────────────────────────────────────────
var filtreActif = 'toutes';

function tachesVisibles() {
  if (filtreActif === 'afaire') return taches.filter(function (t) { return !t.fait; });
  if (filtreActif === 'faites') return taches.filter(function (t) { return t.fait; });
  return taches;
}

// ── Rendu d'une ligne ──────────────────────────────────────────────
function ligneTache(t) {
  return `
    <li class="item-content" data-id="${t.id}">
      <div class="item-media">
        <label class="checkbox">
          <input type="checkbox" ${t.fait ? "checked" : ""} />
          <i class="icon icon-checkbox"></i>
        </label>
      </div>
      <div class="item-inner">
        <div class="item-title ${t.fait ? 'tache-faite' : ''}">${t.texte}</div>
        <div class="item-after">
          <a href="#" class="btn-suppr"><i class="icon f7-icons">trash</i></a>
        </div>
      </div>
    </li>
  `;
}

// ── Bloc 2 : Afficher + compteur ───────────────────────────────────
function afficher() {
  $$(".liste-taches").html(tachesVisibles().map(ligneTache).join(""));
  var restantes = taches.filter(function (t) { return !t.fait; }).length;
  $$('.compteur').text(restantes + ' tâche(s) restante(s)');
}

// ── Ajouter ────────────────────────────────────────────────────────
function ajouterTache(texte) {
  if (texte.trim() === "") return;
  var nouvelId =
    taches.reduce(function (m, t) {
      return Math.max(m, t.id);
    }, 0) + 1;
  taches.push({ id: nouvelId, texte: texte.trim(), fait: false });
  sauvegarder();
  afficher();
  app.toast.create({ text: 'Tâche ajoutée !', closeTimeout: 1200 }).open();
}

// ── Supprimer ──────────────────────────────────────────────────────
function supprimerTache(id) {
  taches = taches.filter(function (t) {
    return t.id !== parseInt(id, 10);
  });
  sauvegarder();
  afficher();
}

// ── Bloc 1 : Cocher / décocher ─────────────────────────────────────
function basculerTache(id) {
  var t = taches.find(function (x) { return x.id === parseInt(id, 10); });
  if (t) { t.fait = !t.fait; sauvegarder(); afficher(); }
}

// ── Initialisation page taches ─────────────────────────────────────
$$(document).on("page:init", ".page[data-name='taches']", function () {
  afficher();
});

// ── Listeners globaux ──────────────────────────────────────────────
$$(document).on("click", "#btn-ajouter", function () {
  var champ = $$("#champ-tache");
  ajouterTache(champ.val());
  champ.val("");
});

$$(document).on("click", ".btn-suppr", function (e) {
  e.preventDefault();
  var id = $$(this).parents(".item-content").attr("data-id");
  supprimerTache(id);
});

$$(document).on("change", ".liste-taches input[type='checkbox']", function () {
  var id = $$(this).parents(".item-content").attr("data-id");
  basculerTache(id);
});

$$(document).on("click", ".filtre-btn", function () {
  $$(".filtre-btn").removeClass("button-active");
  $$(this).addClass("button-active");
  filtreActif = $$(this).attr("data-filtre");
  afficher();
});