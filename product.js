main();

// ---------------------------------appel du back-end---------------------------------------//

function getArticles() {
  return fetch("https://oc-p5-api.herokuapp.com/api/teddies/")
    .then((response) => response.json())
    .then((articles) => articles)
    .catch((error) => alert(error));
}

// ---------------------------------fin appel du back-end---------------------------------------//

// ----------------------------------affichage du produit selectionné--------------------------//

// Récupération de l'URL de l'article affiché en page produit
let url = window.location.search;
let id = url.slice(1);

// affichage de l'article selectionné en fonction de son URL et du nombre d'option

async function main() {
  let articles = await getArticles();
  let idProduct = articles.find((element) => element._id === id);
  let optionsCouleurs = idProduct.colors;
  for (let index = 0; index < articles.length; index++) {
    const nounours = articles[index];
    if (id === nounours._id) {
      afficherLeChoixUnArticle(nounours);
    } else {
      (" ");
    }
  }
  choixProduit();

  // selection des options via une boucle
  let structureOptions = [];
  for (let i = 0; i < optionsCouleurs.length; i++) {
    structureOptions += `<option value=${optionsCouleurs[i]}>${optionsCouleurs[i]}</option> `;
  }

  // positionnement des options dans le html
  let positionOptions = document.getElementById("option__produit");
  positionOptions.innerHTML = structureOptions;
}

// Fonction pour les articles
function afficherLeChoixUnArticle(articles) {
  document.getElementById("main").innerHTML += `
      <div class="card">
        <img
          src="${articles.imageUrl}"
          alt="Hôtel Le soleil du matin"
          class="image"
        />
        <div class="name__option">
          <p class="name">${articles.name}</p>
          <form action="option__produit">
            <select name="option__produit" id="option__produit">
              
            </select>
          </form>
        </div>
        <div class="price__btn">
          <p class="price">${articles.price / 100}€</p>
          <button id="btn__envoyer" type="submit" class="btn" name="btn__envoyer"><span>Ajouter au panier</span></button>
        </div>
      </div>
    `;
}

// ----------------------------------fin affichage du produit selectionné--------------------------//

// ----------------------------------Gestion du click sur le bouton ajouter au panier--------------------------//

// choix du client produit & Option + eventlistener des actions du client
function choixProduit() {
  let ajouter = document.getElementById("btn__envoyer");
  let idOption = document.querySelector("#option__produit");
  let idName = document.querySelector(".name");
  let idPrice = document.querySelector(".price");

  ajouter.addEventListener("click", function (e) {
    e.preventDefault();
    let optionProduit = {
      idProduit: id,
      choixOption: idOption.value,
      choixName: idName.textContent,
      choixPrice: idPrice.innerHTML,
    };

    nombreDeProduitPanier();
    ProduitDansLocalStorage(optionProduit);
  });
}

// affichage du nombre de produit dans le panier page produit

function nombreDeProduitPanier() {
  let nombreDeProduitInitialPanier = JSON.parse(
    localStorage.getItem("produit")
  );
  console.log(nombreDeProduitInitialPanier);
  let indicateurPanier = document.getElementById("nb__produit");
  if (nombreDeProduitInitialPanier !== null) {
    indicateurPanier.innerHTML = nombreDeProduitInitialPanier.length + 1;
  } else {
    indicateurPanier.innerHTML = 1;
  }
}

// Passage des données dans le localStorage au format JSON
function ProduitDansLocalStorage(optionProduit) {
  let produitEnregistrerDansLelocalStorage = JSON.parse(
    localStorage.getItem("produit")
  );

  if (produitEnregistrerDansLelocalStorage) {
    produitEnregistrerDansLelocalStorage.push(optionProduit);
    localStorage.setItem(
      "produit",
      JSON.stringify(produitEnregistrerDansLelocalStorage)
    );
  } else {
    produitEnregistrerDansLelocalStorage = [];
    produitEnregistrerDansLelocalStorage.push(optionProduit);
    localStorage.setItem(
      "produit",
      JSON.stringify(produitEnregistrerDansLelocalStorage)
    );
  }
}

// ----------------------------------fin gestion du click sur le bouton ajouter au panier--------------------------//
