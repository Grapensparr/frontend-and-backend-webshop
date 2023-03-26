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

function showCart() {
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
        quantityContainer.classList.add('cartPopupQuantity');
    
        const minusBtn = document.createElement('button');
        minusBtn.innerText = '-';
        minusBtn.classList.add('quantityButton');
        minusBtn.addEventListener('click', () => {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                cartItem.instock++;
                quantity.innerText = cartItem.quantity;
                totalPrice.innerText = `Total price: ${cartItem.price * cartItem.quantity} SEK (${cartItem.price} SEK x ${cartItem.quantity})`;
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
        plusBtn.classList.add('quantityButton');
        plusBtn.addEventListener('click', () => {
            if (cartItem.quantity < cartItem.originalStock) {
                cartItem.quantity++;
                cartItem.instock--;
                quantity.innerText = cartItem.quantity;
                totalPrice.innerText = `Total price: ${cartItem.price * cartItem.quantity} SEK (${cartItem.price} SEK x ${cartItem.quantity})`;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartCount(1);
                totalPriceSum += cartItem.price;
                total.innerText = `Total: ${totalPriceSum} SEK`;
            }
        });
    
        const totalPrice = document.createElement('div');
        totalPrice.classList.add('cartPopupTotalPrice');
        totalPrice.innerText = `Total price: ${cartItem.price * cartItem.quantity} SEK (${cartItem.price} SEK x ${cartItem.quantity})`;

        totalPriceSum += cartItem.price * cartItem.quantity;

        quantityContainer.append(minusBtn, quantity, plusBtn);
        productDetails.append(name, quantityContainer, totalPrice);
        printItem.append(image, productDetails);
        cartItemsContainer.appendChild(printItem);
    }
  
    const total = document.createElement('div');
    total.classList.add('cartPopupTotal');
    total.innerText = `Total: ${totalPriceSum} SEK`;

    const purchaseButton = document.createElement('button');
    purchaseButton.classList.add('purchaseButton');
    purchaseButton.innerText = 'Purchase';
    if(userId) {
        purchaseButton.disabled = false;
    } else {
        purchaseButton.disabled = true;
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('errorMessage')
        errorMessage.innerText = 'Please note that you must be logged in to place an order.'
        cartPopup.appendChild(errorMessage);
    }

    purchaseButton.addEventListener('click', makePurchase)

    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton');
    closeButton.innerText = 'X';
    closeButton.addEventListener('click', () => {
        cartPopup.remove();
        overlay.classList.remove('overlay');
        localStorage.setItem('cart', JSON.stringify(cartItems));
        productGrid.innerHTML = '';
        printProducts();
    });

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    cartPopup.append(cartItemsContainer, total, purchaseButton, closeButton);
    document.body.appendChild(cartPopup);
}