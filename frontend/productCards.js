const main = document.getElementById('main');
const productGrid = document.createElement('div');
productGrid.classList.add('productGrid');

export function printProductsGuest() {
    fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((products) => {
        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.classList.add('productCard');

            const image = document.createElement('img');
            image.src = './productImage.jpg';
    
            const name = document.createElement('h3');
            name.innerText = product.name;
    
            const description = document.createElement('p');
            description.innerText = product.description;
    
            const price = document.createElement('p');
            price.innerText = product.price + ' SEK';

            productCard.append(image, name, description, price);
            productGrid.appendChild(productCard);
            main.appendChild(productGrid);
        });
    })
    .catch(err => {
        console.error(err);
        productGrid.innerHTML = '<p>Apologies! We seem to have failed to load our products</p>';
    });
}

export function printProductsUser() {
    fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((products) => {
        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.classList.add('productCard');
            productCard.setAttribute('dataProductId', product._id);
    
            const image = document.createElement('img');
            image.src = './productImage.jpg';
    
            const name = document.createElement('h3');
            name.innerText = product.name;
    
            const description = document.createElement('p');
            description.innerText = product.description;
    
            const price = document.createElement('p');
            price.innerText = product.price + ' SEK';
    
            const quantity = document.createElement('div');
            quantity.classList.add('quantity');

            const minus = document.createElement('button');
            minus.innerText = '-';

            const quantityInput = document.createElement('input');
            quantityInput.value = 1;

            const plus = document.createElement('button');
            plus.innerText = '+';

            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('addToCart');
            addToCartBtn.innerText = 'Add to Cart';

            quantity.append(minus, quantityInput, plus, addToCartBtn);
            productCard.append(image, name, description, price, quantity);
            productGrid.appendChild(productCard);
            main.appendChild(productGrid);
    
            quantityInput.addEventListener('input', () => {
                if (isNaN(quantityInput.value) || quantityInput.value < 1) {
                    quantityInput.value = 1;
                }
            });
    
            minus.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });
    
            plus.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value);
                quantityInput.value = currentValue + 1;
            });
    
            addToCartBtn.addEventListener('click', () => {
                const productId = addToCartBtn.closest('.productCard').getAttribute("dataProductId");
                const quantity = parseInt(quantityInput.value);
                console.log(`Adding ${quantity} of product ${productId} to cart`);
                
                //Add function for product -> cart
            });
        });
    })
    .catch(err => {
        console.error(err);
        productGrid.innerHTML = '<p>Apologies! We seem to have failed to load our products</p>';
    });
}