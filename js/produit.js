// Récuperation de l'objet produit
const fetchProduit = async() => {
    // /pages/produit.html?id=8
    const parsedUrl = new URL(window.location.href);
    const id = parsedUrl.searchParams.get("id"); //

    const res = await fetch(`http://localhost:3000/api/teddies/${id}`);
    const data = await res.json();

    return data
};

// Création de la Présentation Produit
async function presProduct() {
    console.log("fonction showProduits() appellée ");
    produit = await fetchProduit(); // Les variables non-déclarées sont toujours globales

    const nomProduitTitre = document.getElementById("nom-produit-titre");
    nomProduitTitre.innerHTML = produit.name;

    const nomProduit = document.getElementById("nom-produit");
    nomProduit.innerHTML = produit.name;


    const descriptionProduitTitre = document.getElementById("description-produit-titre");
    descriptionProduitTitre.innerHTML = produit.description;

    const descriptionProduit = document.getElementById("description-produit");
    descriptionProduit.innerHTML = produit.description;

    const couleurProduit = document.getElementById("couleur-produit");
    couleurProduit.innerHTML = generateSelect(produit.colors);

    const prixProduit = document.getElementById("prix-produit");
    prixProduit.innerHTML = numberWithCommas(produit.price + " €");
              
   const imageProduit = document.getElementById("image-produit");
   imageProduit.setAttribute("src" , produit.imageUrl); 
   
   idProduit = produit._id;
                               
};

// Selection de la couleur du produit
function generateSelect(items) {
    let select =`<select>`;

    for (let item of items) {
        select += `<option value="${item}">${item}</option>`
    }

    select += "</select>";

    return select;
};

// Fonction pour mettre une virgule à deux chiffres en partant de la droite
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');
}

//ajout dans panier
let couleurProduit ="";
let nomProduit = "";
let prixProduit ="";
let idProduit =""

function setData(){
 
    couleurProduit = document.querySelector("select").value;
    console.log(couleurProduit);
    
    nomProduit = produit.name;
    prixProduit = numberWithCommas(produit.price);

    const unNounours = JSON.parse(localStorage.getItem("unNounours")) || []; //retourne le premier qui est vrais 

    unNounours.push(
        {
             Nom : nomProduit,
             Prix : prixProduit,
             Couleur : couleurProduit,
             id : idProduit
        }
    );
  
    localStorage.setItem("unNounours", JSON.stringify(unNounours));

}

presProduct();
setData();

