"use strict";

// variables
const items = document.getElementsByClassName("item");
const cartItem = document.createElement('div');
const cartContent = document.createElement('div');
const cartOverlay = document.querySelector('.cart-overlay');
const cartDOM = document.querySelector('.cart');
const cartIcon = document.createElement('div');
let cart = [];
let buttonsDOM = [];

// local storage
class Storage {
    static saveProducts(CATALOG){
        localStorage.setItem("products", JSON.stringify(CATALOG))
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id)
    }
    static saveCart(){
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttonsPopup = document.getElementsByClassName("btn-popup");    
    const buttons = document.getElementsByClassName("btn");    
    const overlay = document.querySelector('#overlay');
    const popup = document.querySelector('.popup');


    buttonsPopup[0].addEventListener('click', function () {
        productsPage.renderList();
        ui.getCartButtons();
        buttons[0].className = 'btn active';
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    buttonsPopup[1].addEventListener('click', function () {
        productsPage.renderGrid();
        buttons[1].className = 'btn active';
        ui.getCartButtons();
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
    
    const productsPage = new Products();
    Storage.saveProducts(CATALOG);
    const ui = new Ui();
    ui.render();

    // setup App
    ui.setupApp();
    ui.cartLogic();
    ui.getSingleButton();

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(){
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }    
    
    buttons[0].addEventListener('click', function () {
        productsPage.renderList();
        ui.getCartButtons();
        buttons[0].className = 'btn active';
    });

    buttons[1].addEventListener('click', function () {
        productsPage.renderGrid();
        buttons[1].className = 'btn active';
        ui.getCartButtons();
    });


    let editPizza = document.getElementsByClassName('.edit-pizza')
        for (let i = 0; i < editPizza.length; i++) {
            editPizza[i].addEventListener('click', sayHi); 
         }
    
         function sayHi(){
            alert('Hi!')
         }
});

function sortDesc() {
    let arr = Array.from(items);
    arr.sort(function(a, b) {
        return Number(b.getAttribute('data-price')) - Number(a.getAttribute('data-price'))
    });
    print(arr);
}

function sortAsc() {
    let arr = Array.from(items);
    arr.sort(function(a, b) {
        return Number(a.getAttribute('data-price')) - Number(b.getAttribute('data-price'))
    });
    print(arr);
}

function sortABC() {
    let arr = Array.from(items);
    arr.sort(function(a, b) {
        if (a.getAttribute('data-name') < b.getAttribute('data-name')) {
            return -1;
        } else if (a.getAttribute('data-name') > b.getAttribute('data-name')) {
            return 1;
        }
        return 0;
    });
    print(arr);
}

function sortCBA() {
    let arr = Array.from(items);
    arr.sort(function(a, b) {
        if (a.getAttribute('data-name') > b.getAttribute('data-name')) {
            return -1;
        } else if (a.getAttribute('data-name') < b.getAttribute('data-name')) {
            return 1;
        }
        return 0;
    });
    print(arr);
}

function calorieDown() {
    let arr = Array.from(items);
    arr.sort(function(a, b) {
        return Number(b.getAttribute('data-calorie')) - Number(a.getAttribute('data-calorie'))
    });
    print(arr);
}

function calorieUp() {
    let arr = Array.from(items);
    arr.sort(function(a, b) {
        return Number(a.getAttribute('data-calorie')) - Number(b.getAttribute('data-calorie'))
    });
    print(arr);
}

function searchByIngredients() {
    let input = document.getElementById('filterInput');
    let filter = input.value.toUpperCase();
    let items = document.getElementsByClassName('item');
    let ingredients = document.getElementsByClassName("ingredients");
    for (let i = 0; i < items.length; i++) {
        if (ingredients[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

function filterByIngredients() {
    //Filter for ingredients
    let items = document.getElementsByClassName('item');

    let filter = event.target;
    let ingredients = document.getElementsByClassName("ingredients");
    for (let i = 0; i < items.length; i++) {
        if (ingredients[i].innerHTML.toUpperCase().includes(filter.name.toUpperCase(), 0)) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
    if (filter.checked !== true) {
        let productsPage = new Products();
        productsPage.renderGrid();
    }
}

function print(arr) {
    arr.map(function (item, index) {
        if (index === 0) {
            ROOT_PRODUCTS.innerHTML = '' + item.outerHTML + '';
        }
        else {
            ROOT_PRODUCTS.innerHTML += '' + item.outerHTML + '';
        }
    })
}

function renderPopup() {
    let overlayEditPizza = document.querySelector('.overlay-edit-pizza');
    overlayEditPizza.classList.add('visible');
    // console.log(event.target.innerText);
    let popUpContent = document.querySelector('.popup-edit-pizza__content');
    popUpContent.innerHTML = event.target.innerText;
}

function closePopup () {
    let overlayEditPizza = document.querySelector('.overlay-edit-pizza');
    overlayEditPizza.classList.remove('visible');
}