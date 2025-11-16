const db = require('./sqliteConnection');
const createDB = require('../database/creationDB');
const fillDB= require('../database/fillDB');;


createDB.forEach((sql) => {
    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists.');
        }
    });
});

fillDB.forEach((sql) => {
    db.run(sql, (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log('Data inserted.');
        }
    });
});
