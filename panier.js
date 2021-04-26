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
        <p>${produitEnregistrerDansLelocalStorage[index].choixPrice}</p>
      </div>
      `;
  }
}

//vider le panier et redirection pour refresh

let viderLePanier = document.querySelector(".btn__viderlepanier");
viderLePanier.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("produit");
  alert(
    "Nous allons vider le panier, vous allez être redirigé en page d'acceuil"
  );
  window.location.href = "index.html";
});

// Creation d'un tableau pour la méthode reduce
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

let formulaire = `      
      <form action="post" id="formulaire__commande">
        <fieldset class="container___formulaire">
          <legend> Mon Formulaire de commande</legend>
          <p><input type="text" name="nom" placeholder="Nom" class="nom" required></p>
          <p><input type="text" name="nom" placeholder="Prénom" class="prenom" required></p>
          <p><input type="text" name="nom" placeholder="Adresse de livraison" class="adresse" required></p>
          <p><input type="text" name="nom" placeholder="Ville" class="ville" required></p>
          <p><input type="text" name="nom" placeholder="Code Postal" class="codePostal" required></p>
          <p><input type="text" name="nom" placeholder="Email" class="email" required></p>
          <p><input type="submit" value="Envoyer" class="button"></p>
        </fieldset>
      </form>`;

lesPrixDansPanier.insertAdjacentHTML("beforeend", formulaire);

// récupération des valeurs du formulaire et envoie dans le localStorage

let boutonValiderCommande = document.querySelector(".button");

boutonValiderCommande.addEventListener("click", (e) => {
  e.preventDefault();
  let contact = {
    lastName: document.querySelector(".nom").value,
    firstName: document.querySelector(".prenom").value,
    address: document.querySelector(".adresse").value,
    city: document.querySelector(".ville").value,
    // codePostal: document.querySelector(".codePostal").value,
    email: document.querySelector(".email").value,
  };

  // Gestion validation du formulaire

  let lastName = contact.lastName;
  let firstName = contact.firstName;
  let address = contact.address;
  let city = contact.city;
  // let leCodePostal = contact.codePostal;
  let email = contact.email;

  function controleNom() {
    if (/^[A-Za-z]{3,20}$/.test(lastName)) {
      return true;
    } else {
      alert("le champ nom n'est pas correctment renseigné");
      return false;
    }
  }

  function controlePrenom() {
    if (/^[A-Za-z]{3,20}$/.test(firstName)) {
      return true;
    } else {
      alert("le champ prenom n'est pas correctment renseigné");
      return false;
    }
  }

  function controleAdresse() {
    if (/^[A-Za-z0-9\s]{5,20}$/.test(address)) {
      return true;
    } else {
      alert("Le champ adresse n'est pas correctment renseigné");
      return false;
    }
  }

  function controleVille() {
    if (/^[A-Za-z]{3,20}$/.test(city)) {
      return true;
    } else {
      alert("Le champ ville n'est pas correctment renseigné");
      return false;
    }
  }

  // function controleCodePostale() {
  //   if (/^[0-9]{5}$/.test(leCodePostal)) {
  //     return true;
  //   } else {
  //     alert("Le champ code postale doit être composé de 5 chiffres");
  //     return false;
  //   }
  // }

  function controleEmail() {
    if (/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(email)) {
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
    // controleCodePostale() &&
    controleEmail()
  ) {
    localStorage.setItem("formulaire", JSON.stringify(contact));
  } else {
    ("");
  }

  // ------------------------------------Variable contenant les produits dans le localStorage---------------------//
  let produitEnregistrerDansLelocalStorage = JSON.parse(
    localStorage.getItem("produit")
  );

  // -----------------------------------creation du tableau produit pour l'envoie au serveur-----------------------//
  let products = [];
  produitEnregistrerDansLelocalStorage.forEach(
    (produitEnregistrerDansLelocalStorage) => {
      products.push(produitEnregistrerDansLelocalStorage.idProduit);
    }
  );

  // ----------------------------------------------envoie sur le serveur-----------------------------//

  let promise = fetch("https://oc-p5-api.herokuapp.com/api/teddies/order", {
    method: "POST",
    body: JSON.stringify({ contact, products }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    // ----------------------------------------------reception des info du serveur-----------------------------//

    .then((reponse) => reponse.json())
    .then((reponse) => {
      // --------------------------------ouverture modal---------------------------------//
      let body = document.body;
      let div = document.createElement("div");
      div.innerHTML = `<aside id="modal1" class="modal";">
        <div class="modal-wrapper">
          <h2>Confirmation de commande</h2>
          <p>
            Votre commande d'un total ${total}€ a bien été prise en compte <br /> <br> sous le
            numéro: "${reponse.orderId}"<br /> <br>
            Toute l'équipe d'ORINOCO vous remercie!!
          </p>
          <button id="btn_confirmation_commande">De rien!</button>
        </div>
      </aside>`;
      body.append(div);
      // --------------------------------fermeture modal---------------------------------//
      let closeModal = document.getElementById("btn_confirmation_commande");
      closeModal.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "index.html";
        localStorage.removeItem("produit");
      });
    });
});
