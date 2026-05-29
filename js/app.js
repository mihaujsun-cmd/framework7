var routes = routes;

HEAD
let app = new Framework7({
  el: "#app",
  name: "MaToDo",
  theme: "auto",
  routes: routes,
});

var mainView = app.views.create(".view-main", {
  url: "/",
});

let taches = [
  { id: 1, texte: "Ranger mes fournitures", fait: false },
  { id: 2, texte: "Réviser JavaScript", fait: true },
  { id: 3, texte: "Faire la lessive", fait: false },
];

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
        <div class="item-title">${t.texte}</div>
        <div class="item-after">
          <a href="#" class="btn-suppr"><i class="icon f7-icons">trash</i></a>
        </div>
      </div>
    </li>
  `;
}

function afficher() {
  $$(".liste-taches").html(taches.map(ligneTache).join(""));
}

function ajouterTache(texte) {
  if (texte.trim() === "") return;
  var nouvelId =
    taches.reduce(function (m, t) {
      return Math.max(m, t.id);
    }, 0) + 1;
  taches.push({ id: nouvelId, texte: texte.trim(), fait: false });
  afficher();
}

function supprimerTache(id) {
  taches = taches.filter(function (t) {
    return t.id !== parseInt(id, 10);
  });
  afficher();
}

// ── Initialisation de la page taches ──────────────────────────────
$$(document).on("page:init", ".page[data-name='taches']", function () {
  
  afficher();

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

});

let $$ = Dom7; // utilitaire DOM intégré à Framework7

let app = new Framework7({
    el: '#app',
    name: 'MaToDo',
    theme: 'auto',
});

let taches = [
 { id: 1, texte: "Réviser l'algorithmique", fait: false },
 { id: 2, texte: "Faire les exercices Framework7", fait: true },
 { id: 3, texte: "Faire les courses", fait: false },
];

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
            <div class="item-title">${t.texte}</div>
            <div class="item-after">
            <a href="#" class="btn-suppr"><i class="icon f7-icons">trash</i></a>
            </div>
        </div>
    </li>`;
}

function afficher() {
    $$('.liste-taches').html(taches.map(ligneTache).join(""));
}

function ajouterTache(texte) { 
if (texte.trim() === '') return; 
var nouvelId = taches.reduce(function (m, t) { return Math.max(m, t.id); }, 0) + 1; 
taches.push({ id: nouvelId, texte: texte.trim(), fait: false }); 
afficher(); 
} 


afficher();


$$(document).on('click', '#btn-ajouter', function () { 
var champ = $$('#champ-tache'); 
ajouterTache(champ.val()); 
champ.val(''); 
}); 

function supprimerTache(id) { 
taches = taches.filter(function (t) { return t.id !== parseInt(id, 10); }); 
afficher(); 
} 

$$(document).on('click', '.btn-suppr', function (e) { 
e.preventDefault(); 
var id = $$(this).parents('.item-content').attr('data-id'); 
supprimerTache(id); 
}); 



// ============================================================
//  SÉANCE 2 — déclarer le tableau des tâches, puis :
//    - une fonction afficher() qui construit la liste
//    - une fonction ajouterTache(texte)
//    - une fonction supprimerTache(id)
// ============================================================



//  SÉANCE 3 — ajouter :
//    - basculerTache(id) pour cocher / décocher
//    - le compteur de tâches restantes
//    - les filtres (Toutes / À faire / Faites)
//    - chargerTaches() et sauvegarder() avec localStorage
// ------------------------------------------------------------

// Exemple de structure de données (à activer en séance 2) :
// var taches = [
//   { id: 1, texte: "Réviser l'algorithmique", fait: false },
// ];
