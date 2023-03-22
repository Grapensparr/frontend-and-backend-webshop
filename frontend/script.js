import { printLoginForm, printLogoutBtn } from './userform.js';

const welcomeMessage = document.getElementById('welcomeMessage');

const loggedIn = localStorage.getItem("loggedIn");
if(loggedIn) {
    welcomeMessage.innerText = 'Welcome ' + loggedIn + '!';
    printLogoutBtn();
} else {
    printLoginForm();
}