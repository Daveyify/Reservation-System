const db = require('./sqliteConnection');



function createUser({ iduser, email, password, name, lastname, phone }) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO user (iduser, email, password, name, lastName, phone, role, reputation) 
        VALUES (?, ?, ?, ?, ?, ?, "user", "excellent")`;

        db.run(sql, [iduser, email, password, name, lastname, phone], function (err) {
            if (err) {
                console.error('Error creating user:', err.message);
                reject(err);
            } else {
                resolve({ iduser, email, password, name, lastname, phone });
            }
        })
    });
}

function getUser({email, password}) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE email = ? AND password = ?`;

        db.get(sql, [email, password], (err, row) => {
            if (err) {
                console.error('Error retrieving user:', err.message);
                reject(err);
            } else {
                resolve(row);
            }
        })
    });
}


function getAllAvailableDevices() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM device WHERE status = "available"`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error retrieving devices:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function createAReservation(beginDate, endDate, status, user_iduser) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO reservation (beginDate, endDate, status, user_iduser) VALUES (?, ?, ?, ?)`;
        db.run(sql, [beginDate, endDate, status, user_iduser], function (err) {
            if (err) {
                console.error('Error creating reservation:', err.message);
                reject(err);
            } else {
                resolve({ idreservation: this.lastID, beginDate, endDate, status, user_iduser });
            }
        });
    });
}

function getMyReservations(user_iduser) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM reservation WHERE user_iduser = ?`;
        db.all(sql, [user_iduser], (err, rows) => {
            if (err) {
                console.error('Error retrieving reservations:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


module.exports = {
    createUser,
    getUser,
    getAllAvailableDevices,
    createAReservation,
    getMyReservations
};


