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
