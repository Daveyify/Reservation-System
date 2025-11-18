document.getElementById('SignInBtn').addEventListener('click', async function (event) {
    event.preventDefault();

    const data = {
        email: document.getElementById('emailLogin').value,
        password: document.getElementById('passwordLogin').value
    };

    try{
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const message = await response.text();
        document.getElementById('responseMessage').innerText = message;

        if (response.ok) {
            window.location.href = '/html/main.html';
        }

    }catch(error){
        console.error('Error during login:', error);
        document.getElementById('responseMessage').innerText = 'Login failed. Please try again.';
    }
});

document.getElementById('indexRegister').addEventListener('click', async function (event) {
    event.preventDefault();
    window.location.href = '/html/register.html';
});