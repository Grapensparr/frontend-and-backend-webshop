const userForm = document.getElementById('userForm');

export function printLoginForm() {
    const LoginEmail = document.createElement('input');
    LoginEmail.placeholder = 'E-mail';
    const loginPassword = document.createElement('input');
    loginPassword.placeholder = 'Password';
    const loginUserBtn = document.createElement('button');
    loginUserBtn.innerText = 'Log in';
    const registerUserBtn = document.createElement('button');
    registerUserBtn.innerText = 'Not yet a user? Click here to register now!';

    userForm.innerHTML = '';
    userForm.append(LoginEmail, loginPassword, loginUserBtn, registerUserBtn);

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
                welcomeMessage.innerText = 'Welcome ' + data.name + '!';
                localStorage.setItem('loggedIn', data.name);
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
    loginUserBtn.innerText = 'Already a user? Click here to log in now!';

    userForm.innerHTML = '';
    userForm.append(newUsername, newEmail, newPassword, registerUserBtn, loginUserBtn);

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
        welcomeMessage.innerText = 'Welcome!'
        printLoginForm();
    });

    userForm.innerHTML = '';
    userForm.appendChild(logoutBtn);
}