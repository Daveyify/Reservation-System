document.getElementById('SignUpBtn').addEventListener('click', async function (event) {
    event.preventDefault();

    const data = {
        iduser: document.getElementById('idRegister').value,
        email: document.getElementById('emailRegister').value,
        password: document.getElementById('passwordRegister').value, 
        name: document.getElementById('nameRegister').value,
        lastName: document.getElementById('lastNameRegister').value,
        phone: document.getElementById('phoneRegister').value
    };
    try{
        const response = await fetch('/api/users/create', {
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
        console.error('Error during registration:', error);
        document.getElementById('responseMessage').innerText = 'Registration failed. Please try again.';
    }
});