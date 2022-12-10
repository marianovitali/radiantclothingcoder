//Logre implementar un api local con fetch y promesas, sin embargo a la hora de querer realizar el metodo del carrito por mas que intente no pude lograr filtrar por id!


class Product {
    constructor(id, brand, model, price, img) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.img = img;
        this.amount = 1;
    }
}

const products = [];

const product1 = new Product(1, "GVNG", "Anorak (Lightblue and Pink)", 140, "img/gvngswanorak.png");
products.push(product1);
const product2 = new Product(2, "GVNG", "Anorak (White and Orange)", 130, "img/gvngswanorak2.png");
products.push(product2);
const product3 = new Product(3, "BASTARD", "Hoodie (Black)", 150, "img/hoodiebastard.png");
products.push(product3);
const product4 = new Product(4, "TYLER", "Hoodie Tyler The Creator (Black)", 190, "img/hoodietyler.png");
products.push(product4);
const product5 = new Product(5, "Levis", "Jeans Unisex Summer (Blue)", 140, "img/pantsblue.png");
products.push(product5);
const product6 = new Product(6, "Levis", "Jeans Unisex Summer (Grey)", 120, "img/pantsummer.png");
products.push(product6);
const product7 = new Product(7, "2pac", "T-Shirt 2pac All Eyes On Me", 80, "img/remera2pac.png");
products.push(product7);
const product8 = new Product(8, "Cross Clothing", "T-Shirt Cross (White)", 70, "img/remeracross.png");
products.push(product8);
const product9 = new Product(9, "Notorious", "T-shirt BIGGIE", 80, "img/remeranotorious.png");
products.push(product9);
const product10 = new Product(10, "A$AP", "T-SHIRT A$AP ROCKY ", 60, "img/remerarocky.png");
products.push(product10);
const product11 = new Product(11, "BASTARD", "Shorts Bastard (Black)", 90, "img/shortbastard.png");
products.push(product11);
const product12 = new Product(12, "Loop", "Shorts LoopCompany (Black)", 100, "img/shortloopcompany.png");
products.push(product12);

let cart = []
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
};


const divProducts = document.getElementById("divProducts");

// Method that shows the products.

const showProducts = () => {
    products.forEach(element => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="producto">
            <img class="producto__imagen" src="${element.img}" alt="imagen camisa"> 
            <p class="producto__nombre">${element.brand}, ${element.model}</h5>
            <p class="producto__precio"> $${element.price}</p>
            <button class="botonCart" id="button${element.id}"> Add to cart</button>
        </div>
        `

        divProducts.appendChild(card);

        // Add product
        const button = document.getElementById(`button${element.id}`);
        button.addEventListener("click", () => {
            addToCart(element.id)
        })

        button.addEventListener("click", () => {
            Toastify({
                text: "Product added to cart",
                className: "Toastify__toast",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #0a1425, #0a1425)"
                },

            }).showToast();
        })
    });
}

showProducts();

const addToCart = (id) => {
    const product = products.find((product) => product.id === id);
    const productCart = cart.find((product) => product.id === id);
    if (productCart) {
        productCart.amount++;
    } else {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    calculateTotal();
}


// Cart

const divCart = document.getElementById("divCart");
const showCartButton = document.getElementById("showCartButton");
showCartButton.addEventListener("click", () => {
    showCart();
});

const showCart = () => {
    divCart.innerHTML = "";
    cart.forEach(element => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="grid">
            <div class="producto">
            <img class="producto__imagen" src="${element.img}" alt="imagen camisa">
            <p class="producto__nombre">${element.brand}, ${element.model}</h5>
            <p class="producto__precio"> $${element.price}</p>
            <p class=""> ${element.amount}</p>
            <button class="botonCart" id="delete${element.id}"> Delete product</button>
            </div>
        </div>
        `
        divCart.appendChild(card);
        const button = document.getElementById(`delete${element.id}`)
        button.addEventListener("click", () => {
            deleteFromCart(element.id);
        })
    });

    calculateTotal();
}

// Method that deletes a specific product.
const deleteFromCart = (id) => {
    const product = cart.find((product) => product.id == id);
    const index = cart.indexOf(product);
    cart.splice(index, 1);
    showCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

const clearCart = document.getElementById("clearCartButton");
clearCart.addEventListener("click", () => {
    Swal.fire ({
        title:"Are you sure you want to delete everything?",
        icon:"warning",
        confirmButtonText: "Accept",
        showCancelButton: true,
        cancelButtonText:"Cancel",
        cancelButtonColor: "#FFCE00",
        confirmButtonColor:  "B7950b",
    }).then((result) => {
        if(result.isConfirmed) {
            deleteAllProducts();
            Swal.fire ( {
                title: "Products Deleted",
                icon: "success",
                confirmButtonText: "Accept",
                confirmButtonColor: "#B7950B",
            })
        }
    })
})



// Method that deletes all products inside the cart.

const deleteAllProducts = () => {
    cart = [];
    showCart();
    localStorage.clear();
}


// Show messege about your purchase.

const total = document.getElementById("total");
const calculateTotal = () => {
    let totalPayment = 0;
    cart.forEach((element) => {
        totalPayment += element.price * element.amount;
    })
    total.innerHTML = `$${totalPayment}`;
}

