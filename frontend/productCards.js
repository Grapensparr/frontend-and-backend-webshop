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

            const stock = document.createElement('p');
            stock.innerText = 'In stock: ' + product.lager;
    
            const quantity = document.createElement('div');
            quantity.classList.add('quantity');

            const minus = document.createElement('button');
            minus.innerText = '-';

            const quantityInput = document.createElement('input');
            quantityInput.value = 1;
            quantityInput.setAttribute('min', '0');
            quantityInput.setAttribute('max', product.lager);

            const plus = document.createElement('button');
            plus.innerText = '+';

            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('addToCart');
            addToCartBtn.innerText = 'Add to Cart';

            quantity.append(minus, quantityInput, plus, addToCartBtn);
            productCard.append(image, name, description, price, stock, quantity);
            productGrid.appendChild(productCard);
            main.appendChild(productGrid);
    
            quantityInput.addEventListener('input', () => {
                if (isNaN(quantityInput.value) || quantityInput.value < 1) {
                  quantityInput.value = 1;
                } else if (quantityInput.value > product.lager) {
                    quantityInput.value = product.lager;
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
                if (currentValue < product.lager) {
                    quantityInput.value = currentValue + 1;
                }
            });
      
            addToCartBtn.addEventListener('click', () => {
                const productId = addToCartBtn.closest('.productCard').getAttribute('dataProductId');
                const quantity = parseInt(quantityInput.value);
                console.log(`Adding ${quantity} of product ${productId} to cart`);
            
                product.lager -= quantity;
                stock.innerText = 'In stock: ' + product.lager;
            
                if (quantity > product.lager) {
                    quantityInput.value = product.lager;
                }

                if (product.lager <= 0) {
                    addToCartBtn.disabled = true;
                    stock.innerText = 'Out of stock';
                    stock.style.color = 'red'
                }

                localStorage.setItem(productId, product.lager);
            
                //Add function for product -> cart
            });

            const stockValue = localStorage.getItem(product._id);
            if (stockValue) {
                product.lager = parseInt(stockValue);
                stock.innerText = `In stock: ${product.lager}`;

                if (product.lager <= 0) {
                    addToCartBtn.disabled = true;
                    quantityInput.value = 0;
                    stock.innerText = "Out of stock"
                    stock.style.color = 'red'
                }
            }
        });
    })
    .catch(err => {
        console.error(err);
        productGrid.innerHTML = '<p>Apologies! We seem to have failed to load our products</p>';
    });
}