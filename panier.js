// Variable contenant les produits dans le localStorage
let produitEnregistrerDansLelocalStorage = JSON.parse(
  localStorage.getItem("produit")
);

// injecter les produits dans le panier

if (produitEnregistrerDansLelocalStorage === null) {
  document.getElementById("main").innerHTML += `
    <div class="panier__vide">
        <img src="logo/panier__vide.jpg" alt="image d'un panier vide">
      </div>
    `;
} else {
  for (
    let index = 0;
    index < produitEnregistrerDansLelocalStorage.length;
    index++
  ) {
    document.getElementById("main").innerHTML += `
      <div class="produit__panier">
        <p>${produitEnregistrerDansLelocalStorage[index].choixName}</p>
        <p>${produitEnregistrerDansLelocalStorage[index].choixOption}</p>
        <p>${produitEnregistrerDansLelocalStorage[index].quantite}</p>
        <p>${produitEnregistrerDansLelocalStorage[index].choixPrice}</p>
      </div>
      `;
  }
}

// Creation d'un array pour la méthode reduce
let tableauDesPrix = [];

// Boucles pour récupérer tout les prix dans le panier
for (let i = 0; i < produitEnregistrerDansLelocalStorage.length; i++) {
  const element = produitEnregistrerDansLelocalStorage[i].choixPrice;
  let prixTotal = parseInt(element);
  tableauDesPrix.push(prixTotal);
}

// Méthode reduce pour calculer le total
let reducer = (accumulator, currentValue) => accumulator + currentValue;
let total = tableauDesPrix.reduce(reducer, 0);

// insertion du total dans le HTML

let lesPrixDansPanier = document.getElementById("main");
let leTotalDansHtml = `<div class="prix__total">Le Prix Total est de : ${total}€</div>`;
lesPrixDansPanier.insertAdjacentHTML("beforeend", leTotalDansHtml);

// insertion du formulaire de commande

let formulaire = `      <div class="container___formulaire" id="formulaire__commande">
<h1>Formulaire de commande</h1>
        <input class="nom" type="text" placeholder="Nom" required><br>
        <input class="prenom" type="text" placeholder="Prenom" required><br>
        <input class="adresse" type="text" placeholder="Adresse de livraison" required><br>
        <input class="ville" type="text" placeholder="Ville" required><br>
        <input class="codePostal" type="text" placeholder="Code Postale" required><br>
        <input class="email" type="text" placeholder="Email" required><br>
        <input class="button" type="submit" value="Valider la commande">
      </div>`;

lesPrixDansPanier.insertAdjacentHTML("beforeend", formulaire);

// récupération des valeurs du formulaire et envoie dans le localStorage

let boutonValiderCommande = document.querySelector(".button");

boutonValiderCommande.addEventListener("click", (e) => {
  e.preventDefault();
  let valeursFormulaires = {
    nom: document.querySelector(".nom").value,
    prenom: document.querySelector(".prenom").value,
    adresse: document.querySelector(".adresse").value,
    ville: document.querySelector(".ville").value,
    codePostal: document.querySelector(".codePostal").value,
    email: document.querySelector(".email").value,
  };

  // Gestion validation du formulaire
  // nom prenom ville
  let leNom = valeursFormulaires.nom;
  let lePrenom = valeursFormulaires.prenom;
  let ladresse = valeursFormulaires.adresse;
  let laVille = valeursFormulaires.ville;
  let leCodePostal = valeursFormulaires.codePostal;
  let lemail = valeursFormulaires.email;

  function controleNom() {
    if (/^[A-Za-z]{3,20}$/.test(leNom)) {
      return true;
    } else {
      alert("le champ nom n'est pas correctment renseigné");
      return false;
    }
  }

  function controlePrenom() {
    if (/^[A-Za-z]{3,20}$/.test(lePrenom)) {
      return true;
    } else {
      alert("le champ prenom n'est pas correctment renseigné");
      return false;
    }
  }

  function controleAdresse() {
    if (/^[A-Za-z0-9\s]{5,20}$/.test(ladresse)) {
      return true;
    } else {
      alert("Le champ adresse n'est pas correctment renseigné");
      return false;
    }
  }

  function controleVille() {
    if (/^[A-Za-z]{3,20}$/.test(laVille)) {
      return true;
    } else {
      alert("Le champ ville n'est pas correctment renseigné");
      return false;
    }
  }

  function controleCodePostale() {
    if (/^[0-9]{5}$/.test(leCodePostal)) {
      return true;
    } else {
      alert("Le champ code postale doit être composé de 5 chiffres");
      return false;
    }
  }

  function controleEmail() {
    if (/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(lemail)) {
      return true;
    } else {
      alert("L'email n'est pas correctment renseigné");
      return false;
    }
  }

  if (
    controleNom() &&
    controlePrenom() &&
    controleAdresse() &&
    controleVille() &&
    controleCodePostale() &&
    controleEmail()
  ) {
    localStorage.setItem("formulaire", JSON.stringify(valeursFormulaires));
  } else {
    ("");
  }

  // Elements à renvoyer au back-end

  let aEnvoyerBackEnd = {
    valeursFormulaires,
    produitEnregistrerDansLelocalStorage,
  };
});
