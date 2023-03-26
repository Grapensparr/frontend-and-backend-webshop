import { updateCartCount } from "./cart.js";

const main = document.getElementById('main');
const productGrid = document.createElement('div');
productGrid.classList.add('productGrid');

export function printProducts(path = 'http://localhost:3000/api/products') {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    fetch(path)
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

            const originalStock = product.lager;
            const stock = document.createElement('p');
            const cartQuantity = cart[product._id]?.quantity || 0;
            product.lager -= cartQuantity;
            if (product.lager <= 0) {
                stock.innerText = 'Out of stock';
                stock.style.color = 'red';
            } else {
                stock.innerText = 'In stock: ' + product.lager;
            }
    
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
                    stock.style.color = 'red';
                }

                cart[productId] = {
                    name: product.name,
                    price: product.price,
                    image: image.src,
                    quantity: (cart[productId] ? cart[productId].quantity : 0) + quantity,
                    instock: product.lager,
                    originalStock: originalStock,
                    productId: product._id
                }

                localStorage.setItem('cart', JSON.stringify(cart));
            
                updateCartCount(quantity);
            });

            const stockValue = localStorage.getItem(product._id);
            if (stockValue) {
                product.lager = parseInt(stockValue);
                stock.innerText = `In stock: ${product.lager}`;

                if (product.lager <= 0) {
                    addToCartBtn.disabled = true;
                    quantityInput.value = 0;
                    stock.innerText = "Out of stock";
                    stock.style.color = 'red';
                }
            }
        });
    })
    .catch(err => {
        console.error(err);
        productGrid.innerText = 'Apologies! We seem to have failed to load our products';
    });
}

export function filterByCategory() {
    fetch('http://localhost:3000/api/categories')
    .then(response => response.json())
    .then(categories => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('categoryContainer');
        categoryContainer.innerText = 'Filter by:';
  
        const allProducts = document.createElement('a');
        allProducts.innerText = 'All products';
        allProducts.href = '#';
        allProducts.addEventListener('click', () => {
            productGrid.innerHTML = ''
            printProducts();
        });

        categoryContainer.appendChild(allProducts);
  
        categories.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.innerText = category.name;
            categoryLink.href = '#';
            categoryLink.addEventListener('click', () => {
                productGrid.innerHTML = '';
                printProducts(`http://localhost:3000/api/products/category/${category._id}`);
            });

            categoryContainer.appendChild(categoryLink);
        });
        
        main.insertBefore(categoryContainer, main.firstChild);
    })
    .catch(err => {
        console.error(err);
        productGrid.innerText = 'Apologies! We seem to have failed to load our products';
    });
}