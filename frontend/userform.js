const userForm = document.getElementById('userForm');
userForm.classList.add('userForm');
const lineBreak = document.createElement('br');

export function printLoginForm() {
    const LoginEmail = document.createElement('input');
    LoginEmail.placeholder = 'E-mail';
    const loginPassword = document.createElement('input');
    loginPassword.placeholder = 'Password';
    const loginUserBtn = document.createElement('button');
    loginUserBtn.innerText = 'Log in';
    const registerUserBtn = document.createElement('button');
    registerUserBtn.classList.add('rightAlligned')
    registerUserBtn.innerText = 'Not yet a user? Click here to register now!';

    userForm.innerHTML = '';
    userForm.append(LoginEmail, loginPassword, loginUserBtn, lineBreak, registerUserBtn);

    loginUserBtn.addEventListener('click', () => {
        const loginUser = {
            email: LoginEmail.value, 
            password: loginPassword.value
        };
    
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.name) {
                localStorage.setItem('loggedIn', data.name);
                localStorage.setItem('userId', data.id);
                userForm.innerHTML = '';
                printOrderHistoryBtn();
                printLogoutBtn();
            } else {
                const errorMessage = document.createElement('h3');
                errorMessage.innerText = 'Invalid credentials';
            }
        });
    });
    registerUserBtn.addEventListener('click', () => {
        printRegistrationForm();
    });
}

export function printRegistrationForm() {
    const newUsername = document.createElement('input');
    newUsername.placeholder = 'Name';
    const newEmail = document.createElement('input');
    newEmail.placeholder = 'E-mail';
    const newPassword = document.createElement('input');
    newPassword.placeholder = 'Password';
    const registerUserBtn = document.createElement('button');
    registerUserBtn.innerText = 'Register';
    const loginUserBtn = document.createElement('button');
    loginUserBtn.classList.add('rightAlligned')
    loginUserBtn.innerText = 'Already a user? Click here to log in now!';

    userForm.innerHTML = '';
    userForm.append(newUsername, newEmail, newPassword, registerUserBtn, lineBreak, loginUserBtn);

    registerUserBtn.addEventListener('click', () => {
        const user = {
            name: newUsername.value, 
            email: newEmail.value, 
            password: newPassword.value
        };
    
        fetch('http://localhost:3000/api/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
    
        newUsername.value = '';
        newEmail.value = '';
        newPassword.value = '';
    });

    loginUserBtn.addEventListener('click', () => {
        printLoginForm();
    });
}

export function printLogoutBtn() {
    const logoutBtn = document.createElement('button');
    logoutBtn.innerText = 'Log out';
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userId');
        printLoginForm();
    });

    userForm.appendChild(logoutBtn);
}

export function printOrderHistoryBtn() {
    const orderHistory = document.createElement('button');
    orderHistory.innerText = 'View order history';
  
    orderHistory.addEventListener('click', () => {
        const orderHistoryPopup = document.createElement('div');
        orderHistoryPopup.classList.add('orderHistoryPopup');
      
        const orders = document.createElement('div');
        orders.classList.add('orders');

        const userId = localStorage.getItem('userId');
        fetch('http://localhost:3000/api/orders/' + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: userId })
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                    data.forEach((order, index) => {
                        const orderItem = document.createElement('div');
                        const orderNumber = index + 1;
                        orderItem.innerHTML = `<p><strong>Order ${orderNumber}:</strong></p>`;

                        const orderDetails = document.createElement('div');
                        orderDetails.innerHTML = '';
                        
                        Object.keys(order.products).forEach((productId) => {
                            const productName = order.products[productId].name;
                            const productQuantity = order.products[productId].quantity;
                            orderDetails.innerHTML += `<p>${productName} (quantity: ${productQuantity})</p>`;
                        });
                        
                        orders.append(orderItem, orderDetails);
                    });
                });
            } else {
                console.error('Failed to get order history');
            }
        });

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const closeButton = document.createElement('button');
        closeButton.classList.add('closeButton');
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', () => {
            orderHistoryPopup.remove();
            overlay.classList.remove('overlay');
        });

        orderHistoryPopup.append(orders, closeButton);
        document.body.appendChild(overlay);
        document.body.appendChild(orderHistoryPopup);
    });
  
    userForm.appendChild(orderHistory);
}