const loginformhandler = async (event) => {
    event.preventDefault();
    console.log('hello')
    const name = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (name && password) {
        const response = await fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Check your Username or Password");
        }
    }
};

const signupformhandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (email && username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.status);
        }
    }
};

document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        loginformhandler(event);
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        signupformhandler(event);
    }
});

document.querySelector('#login-submit').addEventListener('click', loginformhandler);
document.querySelector('#signup-submit').addEventListener('click', signupformhandler);