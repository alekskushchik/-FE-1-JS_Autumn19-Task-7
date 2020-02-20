class Ui {

  render() {
    ROOT_UI.innerHTML += '<button class="btn"><i class="fa fa-bars"></i></button>';
    ROOT_UI.innerHTML += '<button class="btn"><i class="fa fa-th-large"></i></button>';
    // create select form
    let form = document.createElement('form');
    let select = document.createElement('select');
    select.id = 'select';
    ROOT_UI.appendChild(form);
    form.appendChild(select);
    select.innerHTML += `
    <option value="" selected disabled>Виберіть сортування</option>
    <option value="up">Ціна по зростанню</option>
    <option value="down">Ціна по спаданню</option>
    <option value="abc">А ==> Я</option>
    <option value="cba">Я ==> А</option>
    <option value="calorieUp">Калорійність по зростанню</option>
    <option value="calorieDown">Калорійність по спаданню</option>`;

    // create search form
    let searchForm = document.createElement('form');
    ROOT_UI.appendChild(searchForm);
    searchForm.innerHTML = '<input type="text" id="filterInput" onkeyup="searchByIngredients()" placeholder="Пошук за інгредієнтами..">';
    const selectOption = document.querySelector('select');
    ROOT_UI.appendChild(cartIcon);
    cartIcon.innerHTML = `<div class="cart-icon"><i class="fa fa-cart-plus"></i><div class="cart-items">0</div></div>`;

    selectOption.addEventListener('change', (event) => {
      if (event.target.value === 'up') {
        sortAsc();
      } else if (event.target.value === 'down') {
        sortDesc();
      } else if (event.target.value === 'abc') {
        sortABC()
      } else if (event.target.value === 'cba') {
        sortCBA()
      } else if (event.target.value === 'calorieUp') {
        calorieUp()
      } else if (event.target.value === 'calorieDown') {
        calorieDown()
      }
    });

    let filterIngredients = document.querySelector('.products-filter');
    let filterList = document.createElement('ul');
    filterList.className = 'products-filter__ingredients-list';
    filterIngredients.append(filterList);
    for(let key in INGREDIENTS[0]) {
      filterList.innerHTML += `
    <li class='products-filter__ingredients-item'>
    <label for='${INGREDIENTS[0][key].name}'>
    <input type="checkbox" name="${INGREDIENTS[0][key].name}" id='${INGREDIENTS[0][key].id}' class='products-filter__checkbox' onclick="filterByIngredients()">${INGREDIENTS[0][key].name}
    </label><br>
    </li>
    `;
    }
  }

  getCartButtons() {
    const buttons = [...document.querySelectorAll('.cart-btn')];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = 'Товар у кошику';
        button.disabled = true;
      } else {
        button.addEventListener('click', (event) => {
          event.target.innerText = "Товар у кошику";
          event.target.disabled = true;
          // get product from products
          let cartItem = { ...Storage.getProduct(id), amount: 1 };
          // add product to the cart
          cart = [...cart, cartItem];
          // save cart in the local storage
          Storage.saveCart(cart);
          // set cart values
          this.setCartValues(cart);
          // display cart item
          this.addCartItem(cartItem);
          // show the cart
          this.showCart()
        })
      }
    })
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += parseInt(item.price) * item.amount;
      itemsTotal += item.amount;
    });
    let cartItems = document.querySelector('.cart-items');
    let cartTotal = document.querySelector('.cart-total');
    cartTotal.innerText = `${tempTotal.toFixed(2)} грн.`;
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    cartItem.className = 'cart-item';
    cartItem.innerHTML += `<img src="${item.img}" alt=""/>
         <div>
             <h4>Піца "${item.name}"</h4>
             <h5>${parseInt(item.price)} грн.</h5>
             <span class="remove-item" data-id="${item.id}">видалити з кошика</span>
         </div>
        <div>
            <i class="fa fa-chevron-up" data-id="${item.id}"></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fa fa-chevron-down" data-id="${item.id}"></i>
        </div>`;
    cartContent.className = 'cart-content';
    cartContent.appendChild(cartItem);
  }

  showCart() {
    cartDOM.classList.add('showCart');
    cartOverlay.classList.add('transparentBcg');
    cartOverlay.appendChild(cartDOM);
    cartDOM.prepend(cartContent);
  }

  setupApp() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartIcon.addEventListener('click', this.showCart);
    const cartCloseBtn = document.querySelector('.close-cart');
    cartCloseBtn.addEventListener('click', this.hideCart);
  }

  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item))
  }

  hideCart() {
    cartDOM.classList.remove('showCart');
    cartOverlay.classList.remove('transparentBcg');
  }

  cartLogic() {
    const clearCartBtn = document.querySelector('.clear-cart');
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });

    cartContent.addEventListener("click", event => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        cartItem.remove();
        const buttons = [...document.querySelectorAll(".cart-btn")];
        buttons.forEach(button => {
          if (button.dataset.id === id) {
            button.disabled = false;
            button.innerHTML = `<i class="fa fa-shopping-cart"></i>Додати в кошик`;
          }
        });
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cart = cart.filter(item => item.id !== id);
          this.setCartValues(cart);
          Storage.saveCart(cart);
          cartItem.removeChild(lowerAmount.parentElement.parentElement);
          const buttons = [...document.querySelectorAll(".cart-btn")];
          buttons.forEach(button => {
            if (button.dataset.id === id) {
              button.disabled = false;
              button.innerHTML = `<i class="fa fa-shopping-cart"></i>Додати в кошик`;
            }
          });
        }
      }
    });
  }

  clearCart() {
    cart = [];
    this.setCartValues(cart);
    Storage.saveCart(cart);
    const buttons = [...document.querySelectorAll(".cart-btn")];
    buttons.forEach(button => {
      button.disabled = false;
      button.innerHTML = `<i class="fa fa-shopping-cart"></i>Додати в кошик`;
    });
    while (cartItem.children.length > 0) {
      cartItem.removeChild(cartItem.children[0]);
    }
    this.hideCart();
  }

  getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id)
  }
}