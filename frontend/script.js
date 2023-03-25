import { printLoginForm, printLogoutBtn } from './userform.js';
import { printProducts, filterByCategory } from './productCards.js';
import { shoppingCart } from './cart.js';

const loggedIn = localStorage.getItem('loggedIn');
if(loggedIn) {
    printLogoutBtn();
} else {
    printLoginForm();
}

filterByCategory();
printProducts();
shoppingCart();