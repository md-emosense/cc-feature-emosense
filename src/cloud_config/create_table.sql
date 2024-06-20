mysql -h 34.128.74.180 -u root -p;
use emosense-db;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    childName VARCHAR(255) NOT NULL,
    childBirthday DATETIME NOT NULL,
    adhdDesc TEXT
);

CREATE TABLE clinics (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    clinic_name VARCHAR(255) NOT NULL,
    streetAddress VARCHAR(4000) NOT NULL,
    province VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    suburb VARCHAR(255) NOT NULL,
    phone VARCHAR(255)
);

CREATE TABLE forum (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    isi TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT,
    FOREIGN KEY (userId) REFERENCES user(id)
);

INSERT INTO clinics (clinic_name, streetAddress, province, city, suburb, phone)
VALUES ('ADHD Centre Concentration First', 
    'Ruko Diamond Blok DMD 3 No 58-59, Gading, Serpong, Pakulonan Bar., Kec. Tangerang, Kabupaten Tangerang, Banten 15810', 
    'Banten',
    'Tangerang',
    'Tangerang',
    '(021) 5460270');