const path = require('path');
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database(
    path.resolve(__dirname, '../database/database.db'),
    (error) => {
        if (error) {
            return console.error('Error connecting to the database: ', error.message);
        } 
        else {
            console.log('Connected to the SQLite database.');
        }
    }
);

module.exports = db;