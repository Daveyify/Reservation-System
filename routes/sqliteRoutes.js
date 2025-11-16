const db = require('../services/sqliteConnection')
const sqlite = require('../services/sqliteServices');

const express = require('express');
const router = express.Router();

router.post('/createUser', async (req, res) => {
    try {
        const { iduser, email, password, name, lastName, phone } = req.body;
        const result = await sqlite.createUser(iduser, email, password, name, lastName, phone);
        res.status(201).json({ message: 'User created successfully', userId: result });
    } catch (error) {
        console.error('Error created user:', error);
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
});

router.get('/getUser', async (req, res) => {
    try {
        const { email, password } = req.params;
        const user = await sqlite.getUserById(email, password);
        if (user.length === 0) {
            res.status(404).send("User not found or incorrect credentials");
        } else {
            res.status(201).json({ message: 'User logged in succesfully', user: user });
        }
    } catch (error) {
        res.status(500)
    }
});

router.get('/availableDevices', async (req, res) => {
    try {
        const devices = await sqlite.getAllAvailableDevices();
        if (devices.length === 0) {
            res.status(404).send("No available devices found");
        } else{
            res.status(201).json({ message: 'Available devices retrived successfully', devices: devices});
        }
    } catch (error) {
        console.error('Error retrieving available devices:', error);
        res.status(500).json({ error: 'Failed to retrieve available devices', details: error.message });
    }
});

router.post('/createReservation', async (req, res) => {
    try {
        const { beginDate, endDate, status, user_iduser } = req.body;
        const result = await sqlite.createAReservation(beginDate, endDate, status, user_iduser);
        res.status(201).json({ message: 'Reservation created successfully', reservationId: result });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation', details: error.message });
    }
});

router.post('/getUserReservations', async (req, res) => {
    try{
        const { user_iduser } = req.body;
        const reservations = await sqlite.getUserReservations(user_iduser);
        if (reservations.length === 0) {
            res.status(404).send("No reservations found for this user");
        } else {
            res.status(201).json({ message: 'User reservations retrived successfully', reservations: reservations});
        }
    } catch (error) {
        console.error('Error retrieving user reservations:', error);
        res.status(500).json({ error: 'Failed to retrieve user reservations', details: error.message });
    }
});
