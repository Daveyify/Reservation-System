const path = require('path');
const sqlite = require('sqlite3').verbose();
const tables = require('../database/creation-database');
const fillDatabase = require('../database/fill-database');

const db = new sqlite.Database(
    path.resolve(__dirname, '../database/database.db'),
    (error) => {
        if (error) {
            return console.error(error.message);
        }

        // Create tables 
        tables.forEach((sql) => {
            db.run(sql, (err) => {
                if (err) {
                    console.error('Error creating the table:', err.message);
                } else {
                    console.log('Table created or already exists.');
                }
            });
        });

        // Fill database with initial data
        fillDatabase.forEach((sql) => {
            db.run(sql, (err) => {
                if (err) {
                    console.error('Error creating the data:', err.message);
                } else {
                    console.log('Data created.');
                }
            });
        });
    }
);

module.exports = db;