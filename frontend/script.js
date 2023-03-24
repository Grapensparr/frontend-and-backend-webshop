import { printLoginForm, printLogoutBtn } from './userform.js';
import { printProducts, filterByCategory } from './productCards.js';

const welcomeMessage = document.getElementById('welcomeMessage');

const loggedIn = localStorage.getItem('loggedIn');
if(loggedIn) {
    welcomeMessage.innerText = 'Welcome ' + loggedIn + '!';
    printLogoutBtn();
    filterByCategory();
    printProducts();
} else {
    printLoginForm();
    filterByCategory();
    printProducts();
}