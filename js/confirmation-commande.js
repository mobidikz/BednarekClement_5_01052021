console.log("test");


//Fontion de récupération des données dans le local storage
function loadPanier() {
    const panier = JSON.parse(localStorage.getItem("unNounours"));
    console.log(panier);

    const ligneProduit = document.getElementById("lignes-produit-conf");
    ligneProduit.innerHTML = (

        panier.map((produit) => (

            `
                <div class="container">
                    <div class="row">
                        <div class="col"> ${produit.Nom} </div>

                        <div class="col"> ${produit.Couleur} </div>

                        <div class="col">
                            🐻
                        </div>

                        <div class="col">
                                <p class=""> ${produit.Prix} € </p>
                        </div>
                        
                    </div>
                </div>
            `
        )).join('')
    );

    const reducer = (acc, cur) => acc + parseFloat(cur.Prix); // reduce() pour ajouer les élément du tableau entre eux ET parseFloat() pour transforter la sting et float
    const prixTotal = panier.reduce(reducer, 0);
    console.log("Prix total " + prixTotal);

    const prixTotalInser = document.getElementById("prix-total");
    prixTotalInser.innerHTML = (prixTotal + " €");
}

//Fontion de récupération de l'adresse
function loadAddress() {
    const address = JSON.parse(localStorage.getItem("contact"));
    console.log(address);

    const blockAddress = document.getElementById("adresse-livraison");
    blockAddress.innerHTML = (
        `
            <div class="container text-right">
                <div class="row">
                    <div class="col"> ${address.firstName} ${address.lastName} </div>
                </div>

                <div class="row">  
                    <div class="col"> ${address.city} </div>
                    
                </div>

                <div class="row">  
                    <div class="col"> ${address.address} </div>
                </div>

                <div class="row">  
                    <div class="col"> ${address.email} </div>
                </div>
            </div>
        `
    );
}

// Récuperation du numéro de commande
async function orderId(){
    const parsedUrl = new URL(window.location.href);
    const id = parsedUrl.searchParams.get("order-id");

    const orderId = document.getElementById("order-id");
    orderId.innerHTML = id;

};


loadPanier();
loadAddress();
orderId();