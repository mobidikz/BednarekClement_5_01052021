//Fontion de récupération des données dans le local storage
function loadPanier() {
    const panier = JSON.parse(localStorage.getItem("unNounours"));
    console.log(panier);

    const ligneProduit = document.getElementById("lignes-produit");
    ligneProduit.innerHTML = (

        panier.map((produit, index) => (

            `
                <div class="container">
                    <div class="row my-3">
                        <div class="col"> ${produit.Nom} </div>

                        <div class="col"> ${produit.Couleur} </div>

                        <div class="col">
                            🐻
                        </div>

                        <div class="col">
                            <p class=""> ${produit.Prix} € </p>
                        </div>

                        <button onclick="supprProduit(${index})" type="button" class="btn btn-danger col">Supprimer</button>
                        
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

};

    

function supprProduit(index) {
    const panier = JSON.parse(localStorage.getItem("unNounours"));
    console.log("bouton suppr !", index);

    panier.splice(index, 1);
    console.log(panier);

    localStorage.setItem("unNounours", JSON.stringify(panier));
    console.log(panier);

    loadPanier();
};

//Fonction envois des informations à l'API
async function send(e) {

    // Création de l'objet contact
    const contact = new Object();
    contact.firstName = document.getElementById("firstName").value;
    contact.lastName = document.getElementById("lastName").value;
    contact.city = document.getElementById("city").value;
    contact.address = document.getElementById("address").value;
    contact.email = document.getElementById("email").value;

    localStorage.setItem("contact", JSON.stringify(contact));

    //Création du tableau products
    let products = JSON.parse(localStorage.getItem("unNounours"));
    products = products.map(t => t.id);
    
    
    const headers = {
        'Accept': 'application/json', 
        'Content-Type': 'application/json; charset=UTF-8'
    }
    
    //try et catch pour la gestion des erreurs
    try {
        const response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ contact, products }) // { contact: contact, products: products }
        })
      
        const body = await response.json()

        


        window.location = `/pages/confirmation-commande.html?order-id=${body.orderId}`; // redirige sur la page et ajoute un paramètre url
        return true;
      
        console.log(body);
    } catch (err) {
        alert("Oups... Une erreur est survenue.")
        console.log(err);
    }
    return false;
  };

loadPanier();

