let form = document.getElementById("form");
let name = document.getElementById("name");
let firstName = document.getElementById("firstName");
let adresse = document.getElementById("adresse");
let ville = document.getElementById("ville");
let codePostal = document.getElementById("codePostal");
let submit = document.getElementById("submitButton");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let form = document.getElementById("form");
  let name = document.getElementById("name");
  let firstName = document.getElementById("firstName");
  let adresse = document.getElementById("adresse");
  let ville = document.getElementById("ville");
  let codePostal = document.getElementById("codePostal");
  let email = document.getElementById('email')
  let submit = document.getElementById("submitButton");


  if (
    name.checkValidity() &&
    firstName.checkValidity() &&
    adresse.checkValidity() &&
    ville.checkValidity() &&
    codePostal.checkValidity()&&
    email.checkValidity()
  ) {
    console.log("il y a quelque chose");
  } else {
    console.log("il y a rien");
  }
});
