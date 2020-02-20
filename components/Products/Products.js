class Products {

    renderGrid() {
        header.render();
        footer.render();
        let out = '';
        CATALOG.forEach(({id, name, price, img, ingredients, kkal, size}) => {
            out += `
            <div class="item" data-price="${parseInt(price)}" data-name="${name}" data-calorie="${parseInt(kkal)}">
            <div class="container">            
                <h4 class="item-title">Піца "${name}"</h4>                

                <img src="img/pizza-icon.png" class="image">
                <div class="overlay-item">
                    <div class="icon"><img src="${img}" alt=""></div>
                </div><br>                
             <div class="description">                
                <span class="ingredients">Склад: ${ingredients.join(', ')}.</span><br>
                <span class="edit-pizza">Змінити інгредієнти</span><br>
                <span>Калорійність: ${kkal}/100 гр</span><br>
                <span>Розмір/вага: ${size}</span><br>
                <span class="price">Ціна: ${price}</span><br>
                <button class="cart-btn" data-id="${id}"><i class="fa fa-shopping-cart" aria-hidden="true"></i></i> Додати у кошик</button>
            </div>   
            </div>
            </div>`;
        });
        ROOT_PRODUCTS.innerHTML = out;
        ROOT_PRODUCTS.className = 'products';
        let input = document.getElementById('filterInput');
        input.style.display = '';
        let selectElement = document.querySelector('select');
        for (let i = 3; i <= 6; i++){
            selectElement[i].removeAttribute('disabled');
        }

        let editPizza = document.querySelectorAll('.edit-pizza')
        for (let i = 0; i < editPizza.length; i++) {
        editPizza[i].addEventListener('click', renderPopup); 
        }

     let popupEditPizzaClose = document.querySelector('.popup-edit-pizza__close');
     popupEditPizzaClose.addEventListener('click', closePopup)
    }

    renderList() {
        header.render();
        footer.render();
        let out = '';
        CATALOG.forEach(({id, name, price, img, ingredients, kkal, size}) => {
            out += `<div id="list" class="item" data-price="${parseInt(price)}" data-name="${name}" data-calorie="${parseInt(kkal)}">
            <img class="icon-pizza" src="img/icon-pizza.png" alt="">
            <h4 class="product-title">Піца "${name}"</h4>
            <span class="price">Ціна: ${price}</span><br>
            <button class="cart-btn" data-id="${id}"><i class="fa fa-shopping-cart" aria-hidden="true"></i></i> Додати у кошик</button>
            </div>`;
        });
        ROOT_PRODUCTS.innerHTML = out;
        ROOT_PRODUCTS.className = 'list';

        let input = document.getElementById('filterInput');
        input.style.display = 'none';
        let selectElement = document.querySelector('select');
        for (let i = 3; i <= 6; i++){
            selectElement[i].setAttribute('disabled', 'disabled');
        }
    }
}