const sqlite3 = require('sqlite3').verbose();

const fillDatabase = [`
        INSERT INTO user (iduser, email, password, name, lastName, phone, role, reputation) VALUES 
        (1034776951, 'davidsuancha23@gmail.com', 'password123', 'David', 'Suancha', '3123456789', 'user', 'good'),
        (1102345687, 'laura.gomez@gmail.com', 'laura123', 'Laura', 'Gomez', '3104567891', 'user', 'excellent'),
        (1129876543, 'juan.perez@gmail.com', 'juanpass', 'Juan', 'Perez', '3119876543', 'admin', 'good'),
        (902345671,  'maria.rojas@gmail.com', 'maria2024', 'Maria', 'Rojas', '3006549871', 'user', 'average'),
        (1187654320, 'carlos.mendez@gmail.com', 'carlos321', 'Carlos', 'Mendez', '3124561234', 'user', 'bad'),
        (1098765432, 'andrea.lopez@gmail.com', 'andrea654', 'Andrea', 'Lopez', '3147896541', 'user', 'good'),
        (1076543219, 'felipe.ramirez@gmail.com', 'felipepass', 'Felipe', 'Ramirez', '3159632587', 'admin', 'excellent'),
        (1154321098, 'sofia.martinez@gmail.com', 'sofia777', 'Sofia', 'Martinez', '3167418529', 'user', 'good'),
        (1012345678, 'camilo.ortiz@gmail.com', 'camilo555', 'Camilo', 'Ortiz', '3178529634', 'user', 'average'),
        (1199999900, 'valentina.torres@gmail.com', 'vale999', 'Valentina', 'Torres', '3183692581', 'user', 'excellent');
    `,

    `INSERT INTO category (idcategory, nameCategory) VALUES 
        (1, 'Cameras'),
        (2, 'Microphones'),
        (3, 'Lights'),
        (4, 'Tripods'),
        (5, 'Cables'),
        (6, 'Adaptators'),
        (7, 'Memory Cards'),
        (8, 'Batteries'),
        (9, 'Drones'),
        (10, 'Accesories');
    `,

    `INSERT INTO device (reference, name, brand, available, category_idcategory) VALUES
        (1001, 'Canon EOS R5', 'Canon', 1, 1),
        (1002, 'Sony A7 III', 'Sony', 1, 1),
        (2001, 'Blue Yeti USB Mic', 'Blue', 1, 2),
        (2002, 'Rode NT1-A', 'Rode', 1, 2),   
        (3001, 'Godox SL60W', 'Godox', 1, 3),
        (3002, 'Neewer 660 LED', 'Neewer', 1, 3),
        (4001, 'Manfrotto Compact Action', 'Manfrotto', 1, 4),
        (4002, 'Joby GorillaPod 3K', 'Joby', 1, 4),
        (5001, 'HDMI 2.1 Cable 3m', 'Belkin', 1, 5),
        (5002, 'USB-C to USB-A Cable', 'Anker', 1, 5),
        (6001, 'USB-C to HDMI Adapter', 'Ugreen', 1, 6),
        (6002, 'Lightning to Jack Adapter', 'Apple', 1, 6),
        (7001, 'SanDisk Extreme 128GB', 'SanDisk', 1, 7),
        (7002, 'Lexar Professional 64GB', 'Lexar', 1, 7),
        (8001, 'Canon LP-E6NH Battery', 'Canon', 1, 8),
        (8002, 'Sony NP-FZ100 Battery', 'Sony', 1, 8),
        (9001, 'DJI Mini 3 Pro', 'DJI', 1, 9),
        (9002, 'Autel EVO Nano+', 'Autel', 1, 9),
        (10001, 'Camera Cleaning Kit', 'Altura', 1, 10),
        (10002, 'Lens Filter Set 58mm', 'K&F Concept', 1, 10);
    `,

    `INSERT INTO reservation (idreservation, beginDate, endDate, status, user_iduser) VALUES
        (5001, '2024-07-01 10:00:00', '2024-07-05 10:00:00', 'confirmed', 1034776951),
        (5002, '2024-07-03 14:00:00', '2024-07-04 14:00:00', 'pending', 1102345687),
        (5003, '2024-07-02 09:00:00', '2024-07-06 09:00:00', 'confirmed', 1129876543),
        (5004, '2024-07-05 16:00:00', '2024-07-10 16:00:00', 'cancelled', 902345671),
        (5005, '2024-07-07 11:00:00', '2024-07-12 11:00:00', 'confirmed', 1187654320);`,
    
    `INSERT INTO reservation_has_device (reservation_idreservation, device_reference) VALUES
        (5001, 1001),
        (5001, 2001),
        (5002, 3001),
        (5003, 1002),
        (5003, 4001),
        (5004, 5001),
        (5005, 9001),
        (5005, 6001);`,
];

module.exports = fillDatabase

