export function shoppingCart() {
    const cartSymbol = document.createElement('div');
    cartSymbol.classList.add('cartSymbol');
    cartSymbol.innerHTML = '<i class="fa-solid fa-cart-shopping fa-3x"></i>';

    const cartCount = document.createElement('div');
    cartCount.classList.add('cartCount');
    cartCount.innerText = localStorage.getItem('cartCount') || 0;

    cartSymbol.appendChild(cartCount);

    document.body.appendChild(cartSymbol);
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
