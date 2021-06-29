// Test de la console dans la navigateur
console.log("La peluche dans ton nombril");

// Récuperation du tableau de tout les produits
const fetchProduits = async() => {
    return await fetch("http://localhost:3000/api/teddies").then(res => res.json());
};


// Création de la Card Produit
async function showProduits() {
    const produits = await fetchProduits();
    console.log(produits);

    const results = document.getElementById("results");
    results.innerHTML = (

        produits.map(produit => (

            `
                <div class="row container-products justify-content-center">
                    <div class="col col-md-9 col-lg-6 container-products_card text-center my-4  rounded border border-info bg-info">

                        <div class="container-products_card_img py-3">
                            <img class="produit-photo img-fluid float " src="${produit.imageUrl}"/>
                        </div>

                        <div class="container-products_card_name">
                            <h3 class="produit-nom text-center"> ${produit.name} </h3>
                        </div>

                        <div class="container-products_card_stars text-center pt-3">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <div class="container-products_card_price">
                            <p class="produit-prix text-center"> ${numberWithCommas(produit.price)} € </p>
                        </div>

                        <a  class="btn btn-warning my-3" href="/pages/produit.html?id=${produit._id}">Voir produit</a> 
                    </div>
                </div>
            `
        )).join('')
    );
};

// Fonction pour mettre une virgule à deux chiffres en partant de la droite
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');
}

console.log(results);
showProduits();
