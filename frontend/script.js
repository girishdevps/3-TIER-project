const API = "/api";

let products = [];
let cart = [];

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

async function loadProducts() {
    try {
        const response = await fetch(`${API}/products`);

        if (!response.ok) {
            throw new Error("Product loading failed");
        }

        products = await response.json();
        displayProducts();
    } catch (error) {
        productGrid.innerHTML =
            "<p>Unable to load products. Please try again later.</p>";
    }
}

function displayProducts() {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3></h3>
                <p></p>
                <div class="price"></div>
                <button class="add-btn">Add to cart</button>
            </div>
        `;

        card.querySelector("h3").textContent = product.name;
        card.querySelector(".product-info p").textContent = product.description;
        card.querySelector(".price").textContent = `₹${product.price}`;

        card.querySelector(".add-btn").addEventListener("click", () => {
            addToCart(product);
        });

        productGrid.appendChild(card);
    });
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    displayCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <div class="cart-item-info">
                <h4></h4>
                <p></p>
            </div>
            <div class="cart-actions">
                <button class="minus-btn">-</button>
                <span class="quantity"></span>
                <button class="plus-btn">+</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        row.querySelector("h4").textContent = item.name;
        row.querySelector(".cart-item-info p").textContent =
            `₹${item.price} each`;
        row.querySelector(".quantity").textContent = item.quantity;

        row.querySelector(".minus-btn").onclick = () =>
            changeQuantity(item.id, -1);

        row.querySelector(".plus-btn").onclick = () =>
            changeQuantity(item.id, 1);

        row.querySelector(".remove-btn").onclick = () =>
            removeFromCart(item.id);

        cartItems.appendChild(row);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString("en-IN");
}

async function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = {
        customer: "Guest",
        items: cart.map(item => ({
            product_id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }))
    };

    try {
        const response = await fetch(`${API}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Order failed");
        }

        alert(`Order placed successfully!\nOrder ID: ${result.order_id}`);

        cart = [];
        displayCart();
    } catch (error) {
        alert("Unable to place order. Please try again.");
    }
}

document.getElementById("checkout-btn")
    .addEventListener("click", checkout);

document.getElementById("cart-toggle")
    .addEventListener("click", () => {
        document.getElementById("cart-section")
            .scrollIntoView({ behavior: "smooth" });
    });

loadProducts();
displayCart();
