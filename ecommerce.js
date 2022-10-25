alert("Welcome to Radiant Clothing Store.");

let cart = 0;
let keepBuying = true;
let decision;
let productList = "Choose your product: \n 1. Nike Sportswear Blue T-shirt: $40 \n 2. Adidas Classic Green Jacket: $80 \n 3. Vans Old-School Red Trainers: $70 \n 4. Puma New Wave Orange T-shirt: $30";
let product = parseInt(prompt(productList));
let coupon;

while (keepBuying === true) {

    if (product === 1) {
        cart = cart + 40;
    }
    else if (product === 2) {
        cart = cart + 80;
    }
    else if (product === 3) {
        cart = cart + 70;
    }
    else if (product == 4) {
        cart = cart + 30;
    };

    decision = parseInt(prompt("Would you like to buy something else? \n 1. Yes  2. No"))
    if (decision === 1) {
        product = parseInt(prompt(productList));
    }
    else {
        keepBuying = false;
        let couponOption = parseInt(prompt("Your total is $" + cart + " Do you have a Coupon? \n 1. Yes 2. No"))
        if (couponOption === 1) {
            coupon = prompt("Write your coupon here:");
            discount(coupon);
        };
    };
};

// get a discount of the total price.
function discount(coupon) {
    if (coupon === "10discount") {
        cart = cart - (cart * (10 / 100));
    }

    else if (coupon === "20discount") {
        cart = cart - (cart * (20 / 100));

    }
    else {
        prompt("Your coupon was incorrect! No discount was made.")
    };
};

alert(`Your total is $${cart}`);