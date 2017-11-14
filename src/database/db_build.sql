BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS computers CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    location VARCHAR(30) NOT NULL
);

CREATE TABLE computers (
    computerId SERIAL PRIMARY KEY,
    usersId INTEGER REFERENCES users,
    operatingSystem VARCHAR(30) NOT NULL
);

INSERT INTO users (name, location) VALUES
('Alina', 'Moscow'),
('John', 'London'),
('Eve', 'Paris'),
('Perry', 'Auckland'),
('Bex', 'Damascus');

INSERT INTO computers (usersId, operatingSystem) VALUES
(1, 'Windows'),
(3, 'Mac'),
(5, 'Linux'),
(4, 'Linux'),
(4, 'Windows'),
(2, 'Mac');

COMMIT;
