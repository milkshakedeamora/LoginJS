function switchTo(section) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('loggedInSection').style.display = 'none';    

    if (section === 'login') {
        document.getElementById('loginSection').style.display = 'block';
    } else if (section === 'register') {
        document.getElementById('registerSection').style.display = 'block';
    } else if (section === 'loggedIn') {
        document.getElementById('loggedInSection').style.display = 'block';
        document.getElementById('loggedInUser').textContent = currentUser;
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        currentUser = username.toLowerCase();
        switchTo('loggedIn');
    } else {
        document.getElementsByClassName("login")[0].textContent = data.message;
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        document.getElementsByClassName("erro")[0].textContent = data.message;
    } else {
        document.getElementsByClassName("erro")[0].textContent = data.message;
    }
});

function logout() {
    currentUser = null;
    switchTo('login');
}