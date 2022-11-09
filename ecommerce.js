class Product {
    constructor(id, brand, model, price, stock) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.stock = stock;
    };
    // checkStock(){
    //     if(this.stock > 0) {

    //     }
    //     else {

    //     }
    // }
};

alert("Welcome to Radiant Clothing Store.");


const productList = [];
const product1 = new Product(1, "Nike", "Sportswear Blue T-shirt", 40, 9);
productList.push(product1);
const product2 = new Product(2, "Adidas", "Classic Green Jacket", 80, 1);
productList.push(product2);
const product3 = new Product(3, "Vans", "Old-School Red Trainers", 70, 16);
productList.push(product3);
const product4 = new Product(4, "Puma", "New Wave Orange T-shirt", 30, 10);
productList.push(product4);

console.log(productList);

let totalPayment = 0;
let keepBuying = true;
let decision;
const showList = `Choose your product \n 1.${product1.brand} ${product1.model} Price $${product1.price} \n 2.${product2.brand} ${product2.model} Price $${product2.price} \n 3.${product3.brand} ${product3.model} Price $${product3.price} \n 4.${product4.brand} ${product4.model} Price $${product4.price}`
let productSelected = parseInt(prompt(showList));
let coupon;

while (keepBuying === true) {
    totalPayment = totalPayment + productList[productSelected-1].price
    decision = parseInt(prompt("Would you like to buy something else? \n 1. Yes  2. No"))
    if (decision === 1) {
        productSelected = parseInt(prompt(showList));
    }
    else {
        keepBuying = false;
        let couponOption = parseInt(prompt("Your total is $" + totalPayment + " Would you like to use a Coupon? \n 1. Yes 2. No"))
        if (couponOption === 1) {
            coupon = prompt("Write your coupon here:");
            discount(coupon);
        };
    };
};

// get a discount of the total price.
function discount(coupon) {
    if (coupon === "10discount") {
        totalPayment = totalPayment - (totalPayment * (10 / 100));
    }

    else if (coupon === "20discount") {
        totalPayment = totalPayment - (totalPayment * (20 / 100));

    }
    else {
        prompt("Your coupon was incorrect! No discount was made.")
    };
};

alert(`Your total is $${totalPayment}`);