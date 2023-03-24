import { printLoginForm, printLogoutBtn } from './userform.js';
import { printProducts, filterByCategory } from './productCards.js';

const loggedIn = localStorage.getItem('loggedIn');
if(loggedIn) {
    printLogoutBtn();
    filterByCategory();
    printProducts();
} else {
    printLoginForm();
    filterByCategory();
    printProducts();
}