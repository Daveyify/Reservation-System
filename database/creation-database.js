const sqlite3 = require('sqlite3').verbose();

const tables =
[
    `CREATE TABLE IF NOT EXISTS user (
    iduser INT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    lastName TEXT NOT NULL,
    phone TEXT,
    role TEXT,
    reputation TEXT
    );`,

    `CREATE TABLE IF NOT EXISTS category (
    idcategory INT PRIMARY KEY NOT NULL,
    nameCategory TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS device (
    reference INT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    available TINYINT NOT NULL,
    category_idcategory INT NOT NULL,
    FOREIGN KEY (category_idcategory)
        REFERENCES category (idcategory)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    );`,

    `CREATE TABLE IF NOT EXISTS reservation(
    idreservation INT PRIMARY KEY NOT NULL,
    beginDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    status TEXT,
    user_iduser INT NOT NULL,
    FOREIGN KEY (user_iduser)
        REFERENCES user (iduser)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    );`,

    `CREATE TABLE IF NOT EXISTS reservation_has_device (
    reservation_idreservation INTEGER NOT NULL,
    device_reference INTEGER NOT NULL,
    PRIMARY KEY (reservation_idreservation, device_reference),
    FOREIGN KEY (reservation_idreservation)
        REFERENCES reservation (idreservation)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (device_reference)
        REFERENCES device (reference)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    );`
];

module.exports = tables;