import { printProducts } from "./productCards.js";
import { makePurchase } from "./puchase.js";

export function shoppingCartSymbol() {
    const cartSymbol = document.createElement('div');
    cartSymbol.classList.add('cartSymbol');
    cartSymbol.innerHTML = '<i class="fa-solid fa-cart-shopping fa-3x"></i>';

    const cartCount = document.createElement('div');
    cartCount.classList.add('cartCount');
    cartCount.innerText = localStorage.getItem('cartCount') || 0;

    cartSymbol.appendChild(cartCount);

    document.body.appendChild(cartSymbol);

    cartSymbol.addEventListener('click', () => {
        showCart();
    })
}

export function updateCartCount(quantity) {    
    const cartCount = document.querySelector('.cartCount');
    const currentCartCount = parseInt(cartCount.innerText) || 0;
    const updatedCartCount = currentCartCount + quantity;

    localStorage.setItem('cartCount', updatedCartCount);

    cartCount.classList.add('cartCountAnimation');
    setTimeout(() => {
        cartCount.classList.remove('cartCountAnimation');
    }, 1000);

    cartCount.innerText = updatedCartCount;
}

export function showCart() {
    const userId = localStorage.getItem('userId');
    const productGrid = document.querySelector('.productGrid')
    const cartItems = JSON.parse(localStorage.getItem('cart')) || {};
    const cartPopup = document.createElement('div');
    cartPopup.classList.add('cartPopup');
  
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.classList.add('cartItemsContainer');
  
    let totalPriceSum = 0;
    for (const productId in cartItems) {
        const cartItem = cartItems[productId];
        const printItem = document.createElement('div');
        printItem.classList.add('cartPopupItem');
    
        const image = document.createElement('img');
        image.src = cartItem.image;
        image.alt = cartItem.name;
        image.classList.add('cartPopupImage');
    
        const productDetails = document.createElement('div');
        productDetails.classList.add('cartPopupDetails');
    
        const name = document.createElement('div');
        name.classList.add('cartPopupName');
        name.innerText = cartItem.name;
    
        const quantityContainer = document.createElement('div');
    
        const minusBtn = document.createElement('button');
        minusBtn.innerText = '-';
        minusBtn.addEventListener('click', () => {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                cartItem.instock++;
                quantity.innerText = cartItem.quantity;
                totalPrice.innerText = `Total price: ${cartItem.price * cartItem.quantity} SEK`;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartCount(-1);
                totalPriceSum -= cartItem.price;
                total.innerText = `Total: ${totalPriceSum} SEK`;
            }
        });
    
        const quantity = document.createElement('span');
        quantity.innerText = cartItem.quantity;
    
        const plusBtn = document.createElement('button');
        plusBtn.innerText = '+';
        plusBtn.addEventListener('click', () => {
            if (cartItem.quantity < cartItem.originalStock) {
                cartItem.quantity++;
                cartItem.instock--;
                quantity.innerText = cartItem.quantity;
                totalPrice.innerText = `Total price: ${cartItem.price * cartItem.quantity} SEK`;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartCount(1);
                totalPriceSum += cartItem.price;
                total.innerText = `Total: ${totalPriceSum} SEK`;
            }
        });
    
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', () => {
            delete cartItems[productId];
            localStorage.setItem('cart', JSON.stringify(cartItems));
            printItem.remove();
            totalPriceSum -= cartItem.price * cartItem.quantity;
            total.innerText = `Total: ${totalPriceSum} SEK`;
            updateCartCount(-cartItem.quantity);
        });

        const totalPrice = document.createElement('div');
        totalPrice.innerText = `Total price: ${cartItem.price * cartItem.quantity} SEK`;

        totalPriceSum += cartItem.price * cartItem.quantity;

        quantityContainer.append(minusBtn, quantity, plusBtn, removeBtn);
        productDetails.append(name, quantityContainer, totalPrice);
        printItem.append(image, productDetails);
        cartItemsContainer.appendChild(printItem);
    }
  
    const total = document.createElement('div');
    total.innerText = `Total: ${totalPriceSum} SEK`;

    const purchaseBtn = document.createElement('button');
    purchaseBtn.innerText = 'Purchase';
    if(userId) {
        purchaseBtn.disabled = false;
    } else {
        purchaseBtn.disabled = true;
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('errorMessage')
        errorMessage.innerText = 'Please note that you must be logged in to place an order.'
        cartPopup.appendChild(errorMessage);
    }

    purchaseBtn.addEventListener('click', makePurchase)

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('closeBtn');
    closeBtn.innerText = 'X';
    closeBtn.addEventListener('click', () => {
        cartPopup.remove();
        overlay.classList.remove('overlay');
        localStorage.setItem('cart', JSON.stringify(cartItems));
        productGrid.innerHTML = '';
        printProducts();
    });

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    cartPopup.append(cartItemsContainer, total, purchaseBtn, closeBtn);
    document.body.appendChild(cartPopup);
}