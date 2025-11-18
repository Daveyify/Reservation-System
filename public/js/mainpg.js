document.getElementById('makeReservation').addEventListener('click', async function (event) {
    event.preventDefault();
    window.location.href = 'reservations.html';
});

document.getElementById('manageReservation').addEventListener('click', async function (event) {
    event.preventDefault();
    window.location.href = 'manageReservation.html';
});

document.getElementById('logOut').addEventListener('click', async function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
});

