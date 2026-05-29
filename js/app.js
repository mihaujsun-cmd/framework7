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