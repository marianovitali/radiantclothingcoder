class Product {
    constructor(id, brand, model, price, amount) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.amount = 1;
    }
}

const products = [];
const product1 = new Product(1, "Nike", "Sportswear Blue T-Shirt", 40, 9);
products.push(product1);
const product2 = new Product(2, "Adidas", "Classic Green Jacket", 80, 1);
products.push(product2);
const product3 = new Product(3, "Vans", "Old-School Red Trainers", 70, 16);
products.push(product3);
const product4 = new Product(4, "Puma", "New Wave Orange T-shirt", 30, 10);
products.push(product4);

let cart = []
if(localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
};

const divProducts = document.getElementById("divProducts");

// Method that shows the products.

const showProducts = () => {
    products.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">${element.brand}, ${element.model}</h5>
            <p class="card-text"> $${element.price}</p>
            <button class="btn btn-primary" id="button${element.id}"> Add to cart</button>
            </div>
        </div>
        `

        divProducts.appendChild(card);

        // Add product
        const button = document.getElementById(`button${element.id}`);
        button.addEventListener("click", () => {
            addToCart(element.id)
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
        localStorage.setItem("cart",JSON.stringify(cart));
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
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">${element.brand}, ${element.model}</h5>
            <p class="card-text"> $${element.price}</p>
            <p class="card-text"> ${element.amount}</p>
            <button class="btn btn-primary" id="delete${element.id}"> Delete product</button>
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
    deleteAllProducts();
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
    total.innerHTML = `TOTAL: $${totalPayment}`;
}