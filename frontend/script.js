import { printLoginForm, printLogoutBtn, printOrderHistoryBtn } from './userform.js';
import { printProducts, filterByCategory } from './productCards.js';
import { shoppingCartSymbol } from './cart.js';

const loggedIn = localStorage.getItem('loggedIn');
if(loggedIn) {
    printOrderHistoryBtn();
    printLogoutBtn();
} else {
    printLoginForm();
}

filterByCategory();
printProducts();
shoppingCartSymbol();