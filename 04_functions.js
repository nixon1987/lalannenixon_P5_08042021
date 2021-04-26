const fetch = require("node-fetch");
fetch('https://oc-p5-api.herokuapp.com/api/teddies')
.then((reponse)=> reponse.json())
.then((nounours)=> {
    afficherNomDesNounours(nounours)
    afficherPrixTotal(nounours)
    afficherMoitierPrix(nounours)
    afficherPrixQuatreVingtsP(nounours)
    afficherColors(nounours)
    afficherColorisDisponibles(nounours)
    afficherSuperieurTrente(nounours)
    afficherSommeDescriptions(nounours) 
    afficherTroisiemeCouleurDispo(nounours)
});


function afficherNomDesNounours(array) {
    // for (const element of array) {
    //     console.log(element.name)
    // }
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log(element.name)
    }
}


function afficherPrixTotal(array) {
    let counter = 0
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        counter += element.price
    }
    console.log(counter)
}

function afficherMoitierPrix(array){
    let counter = 0
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        counter += (0.5)*element.price
    }

    console.log(counter)
}

function afficherPrixQuatreVingtsP(array){
    let counter = 0
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        counter += (0.8)*element.price
    }

    console.log(counter)
}

function afficherColors(array){
    let counter = 0
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        counter += element.colors
    }

    console.log(counter)
}

function afficherColorisDisponibles(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log(`Le nounours ${element.name} est disponible en ${element.colors.length}`)
        
    }
}


function afficherSuperieurTrente(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.price > 3000){
            console.log(`${element.name} coûte + de 30€ (il coûte ${element.price}€)`)
        }
        else{
            console.log(`Seul ${element.name} est abordable`)
        }
    }
}

function afficherSommeDescriptions(array) {
    let panier =""
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        panier += element.description
    }

    console.log(panier)
}

function afficherTroisiemeCouleurDispo(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(element.colors.length == 3){
            console.log(`${element.name} existe en trois couleurs : ${element.colors}`)
        }else if(element.colors.length == 4){
            console.log(`${element.name} existe en quatre couleurs : ${element.colors}`)
        }else{
            console.log(`${element.name} existe uniquement en : ${element.colors}`)
        }

    }
}

console.log(localStorage)



// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(function (reponse){
//         return reponse.json()
//     })
//     .then(function (data) {
//         console.log(data.name)
//     });

// function afficherNounoursNameParagraphe(articles) {
//   document.getElementById("main").innerHTML += `
//     <p>${articles.name}</p>

//     `;
// }

// function afficherDivAvecNomEtPrixNounours(articles) {
//   document.getElementById("main").innerHTML += `
//     <article class="blog">
//     <h2 id="blog_title" class="blog_title">${articles.name}</h2>
//     <P id="nameParagraphe" class="blog_body">${articles.price / 100 + "€"}</P>
// </article>
//     `;
// }

// function afficherPhotoDesNounours(articles) {
//   document.getElementById("main").innerHTML += `
//     <article class="blog">
//     <img class = "image" src="${articles.imageUrl}" alt="image de ${articles.name}">
// </article>
    
//     `;
// }