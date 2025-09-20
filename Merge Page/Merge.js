let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        name: 'Холодный кофе',
        category: "Coffee",
        country: "Казахстан",
        image: 'cold-beverages.png',
        price: 749
    },
    {
        name: 'Кофе',
        category: "Coffee",
        country: "Казахстан",
        image: 'cold-beverages.png',
        price: 749
    },
    {
        name: 'Кофе',
        category: "Coffee",
        country: "Казахстан",
        image: 'cold-beverages.png',
        price: 869
    },
    {
        name: 'Бургер',
        category: "Eats",
        country: "Казахстан",
        image: 'burger-frenchfries.png',
        price: 1200
    },
    {
        name: 'Бургер',
        category: "Eats",
        country: "Казахстан",
        image: 'burger-frenchfries.png',
        price: 1500
    },
    {
        name: 'Мороженое',
        category: "Dessert",
        country: "Казахстан",
        image: 'desserts.png',
        price: 1000
    },
    {
        name: 'Кофе',
        category: "Others",
        country: "Казахстан",
        image: 'cold-beverages.png',
        price: 749
    },
    {
        name: 'Мороженое',
        category: "Others",
        country: "Казахстан",
        image: 'desserts.png',
        price: 1000
    },
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add("item");
        newDiv.classList.add(value.category);
        newDiv.innerHTML = `
            <img src="Product Images/${value.image}">
            <div class="title">${value.name}</div>
            <div class='made'>Сделано в: ${value.country}</div>
            <div class="price">${value.price.toLocaleString()} ₸</div>
            <button onclick="addToCard(${key})">Добавить в корзину</button>`;
        list.appendChild(newDiv);
    })
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    else if (listCards[key].quantity >= 1) {
        listCards[key].quantity += 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + listCards[key].quantity * products[key].price;
        count = count + value.quantity;
        listCards[key].price = listCards[key].quantity * products[key].price;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="Product Images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} ₸</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString() + " ₸";
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

// FILTER
function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active1");
        } else {
            button.classList.remove("active1");
        }
    });

    let elements = document.querySelectorAll(".item");
    elements.forEach((element) => {
        if (value == "All") {
            element.classList.remove("hide");
        } else {
            if (element.classList.contains(value)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        }
    });
}

// Search
document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll('.item');

    elements.forEach((element) => {
        let title = element.querySelector('.title').textContent.toUpperCase();
        if (title.includes(searchInput.toUpperCase())) {
            element.classList.remove("hide");
        }
        else {
            element.classList.add("hide");
        }
    })
});

// Init
window.onload = () => {
    filterProduct("All");
}
