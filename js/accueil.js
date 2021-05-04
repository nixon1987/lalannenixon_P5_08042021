main();

// --------------------------------Appel des données ------------------------------------//

async function main() {
  let articles = await getArticles();
  for (let index = 0; index < articles.length; index++) {
    const nounours = articles[index];
    afficherLeToutSousFormeDeDivisions(nounours);
  }
}

function getArticles() {
  return fetch("https://oc-p5-api.herokuapp.com/api/teddies")
    .then((response) => response.json())
    .then((articles) => articles)
    .catch((error) => alert(error));
}

// --------------------------------fin appel des données ------------------------------------//

// -----------------------------------------------Affichage des nounours--------------------------------//

function afficherLeToutSousFormeDeDivisions(articles) {
  document.getElementById("main").innerHTML += `
<div class="card">
        <img
          src="${articles.imageUrl}"
          alt="image nounours"
          class="image"
        />
        <p class="name">${articles.name}</p>
        <div class="price__btn">
          <p class="price">${articles.price / 100}€</p>
          <a href="produit.html?${articles._id}"
            ><button id="button" class="btn">
              <span>Voir produit</span>
            </button>
          </a>
        </div>
      </div> 
    `;
}

// -----------------------------------------------fin affichage des nounours--------------------------------//

// -------------------------------------------------code pour le nombre d'article dans le panier-------------------//

// Variable contenant les produits dans le localStorage
let produitEnregistrerDansLelocalStorage = JSON.parse(
  localStorage.getItem("produit")
);

// affichage du nombre de produit dans le panier page d'acceuil

affichageNombreProduitPanierClient();
function affichageNombreProduitPanierClient() {
  if (produitEnregistrerDansLelocalStorage != null) {
    document.querySelector(".nb__produit").innerHTML = `
    <span class="nb__produit">${produitEnregistrerDansLelocalStorage.length}</span>
    `;
  } else {
    document.querySelector(".nb__produit").innerHTML = `
    <span class="nb__produit">0</span>
    `;
  }
}

// ------------------------------------------------- fin code pour le nombre d'article dans le panier-------------------//
