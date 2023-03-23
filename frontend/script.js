import { printLoginForm, printLogoutBtn } from './userform.js';
import { printProductsGuest, printProductsUser } from './productCards.js';

const welcomeMessage = document.getElementById('welcomeMessage');

const loggedIn = localStorage.getItem('loggedIn');
if(loggedIn) {
    welcomeMessage.innerText = 'Welcome ' + loggedIn + '!';
    printLogoutBtn();
    printProductsUser();
} else {
    printLoginForm();
    printProductsGuest();
}