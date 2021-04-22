main();

// Récupération de l'URL de l'article selectionné
let url = window.location.search;
let id = url.slice(1);

// affichage de l'article selectionné en fonction de son URL et du nombre d'option
async function main() {
  let articles = await getArticles();
  let idProduct = articles.find((element) => element._id === id);
  for (let index = 0; index < articles.length; index++) {
    const nounours = articles[index];
    if (id === nounours._id && nounours.colors.length == 3) {
      afficherLeChoixTroisArticles(nounours);
    } else if (id === nounours._id && nounours.colors.length == 1) {
      afficherLeChoixUnArticle(nounours);
    } else if (id === nounours._id && nounours.colors.length == 4) {
      afficherLeChoixQuatreArticles(nounours);
    } else {
      (" ");
    }
  }
  choixProduit();
}

// appel du backend
function getArticles() {
  return fetch("https://oc-p5-api.herokuapp.com/api/teddies/")
    .then((response) => response.json())
    .then((articles) => articles)
    .catch((error) => alert(error));
}

// Fonction pour un article ayant 3 options
function afficherLeChoixTroisArticles(articles) {
  document.getElementById("main").innerHTML += `
      <p class="description">${articles.description}</p>
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
              <option value=${articles.colors[0]}>${articles.colors[0]}</option>
              <option value=${articles.colors[1]}>${articles.colors[1]}</option>
              <option value=${articles.colors[2]}>${articles.colors[2]}</option>
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

// Fonction pour un article ayant 1 options
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
              <option value=${articles.colors[0]}>${articles.colors[0]}</option>
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

// Fonction pour un article ayant 4 options
function afficherLeChoixQuatreArticles(articles) {
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
              <option value=${articles.colors[0]}>${articles.colors[0]}</option>
              <option value=${articles.colors[1]}>${articles.colors[1]}</option>
              <option value=${articles.colors[2]}>${articles.colors[2]}</option>
            <option value=${articles.colors[3]}>${articles.colors[3]}</option>
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

// choix du client produit & Option + eventlistener des actions du client
function choixProduit() {
  let ajouter = document.getElementById("btn__envoyer");
  let idOption = document.querySelector("#option__produit");
  let idName = document.querySelector(".name");
  let idPrice = document.querySelector(".price");

  ajouter.addEventListener("click", function (e) {
    e.preventDefault();
    let optionProduit = {
      choixOption: idOption.value,
      choixName: idName.innerHTML,
      choixPrice: idPrice.innerHTML,
      quantite: 1,
    };

    ProduitDansLocalStorage(optionProduit);
    nombreDeProduitPanier();
  });
}

// affichage du nombre de produit dans le panier page produit

nombreDeProduitPanier();
function nombreDeProduitPanier() {
  let nombreDeProduitInitialPanier = JSON.parse(
    localStorage.getItem("produit")
  );
  let indicateurPanier = document.getElementById("nb__produit");
  if (nombreDeProduitInitialPanier) {
    indicateurPanier.textContent = nombreDeProduitInitialPanier.length;
  } else {
    indicateurPanier.textContent = 0;
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
