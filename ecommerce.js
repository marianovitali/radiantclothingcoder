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

let cart = []
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
};


const divProducts = document.getElementById("divProducts");
const listadoProductos = "json/products.json";
let productos = [];
// Method that shows the products.

const showProducts = () => {

    fetch(listadoProductos)
        .then(response => response.json())
        .then(products => {
            productos = products
            products.forEach(element => {
                const card = document.createElement("div");
                card.innerHTML += `
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

            })
        })
        .catch(error => console.log(error))
}

showProducts();

const addToCart = (id) => {
    console.log(id)
    const product = productos.find((product) => product.id === id);
    
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
    console.log(cart)
    cart.forEach((element) => {
        console.log(element)
        totalPayment += parseInt(element.price) * element.amount;
    })
    total.innerHTML = `$${totalPayment}`;
}

