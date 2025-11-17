const db = require('../services/sqliteConnection')
const sqlite = require('../services/sqliteServices');
const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();

router.post('/users/create', async (req, res) => {
    try {
        const { iduser, email, password, name, lastName, phone } = req.body;
        const cryptedPassword = await bcrypt.hash(password, 10);
        const result = await sqlite.createUser(iduser, email, cryptedPassword, name, lastName, phone);
        res.status(201).json({ message: 'User created successfully', userId: result });
    } catch (error) {
        console.error('Error created user:', error);
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return  res.status(400).send("Email and password are required");
        }

        const user = await sqlite.getUser({ email });

        if (!user) {
            res.status(404).send("User not found");
        } 
        
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) 
        {
            res.status(401).send("Invalid password");
        } 
        
        else {
            res.status(200).json({ message: 'User logged in succesfully', user: user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login', details: error.message });
    }
});

router.get('/devices/available', async (req, res) => {
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

router.post('/reservations/create', async (req, res) => {
    try {
        const { beginDate, endDate, status, user_iduser } = req.body;
        const result = await sqlite.createAReservation(beginDate, endDate, status, user_iduser);
        res.status(201).json({ message: 'Reservation created successfully', reservationId: result });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation', details: error.message });
    }
});

router.post('/reservations/user/:id', async (req, res) => {
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

module.exports = router;
