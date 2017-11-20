BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS computers CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    location VARCHAR(30) NOT NULL
);

INSERT INTO users (name, location) VALUES
('Alina', 'Moscow'),
('John', 'London'),
('Eve', 'Paris'),
('Perry', 'Auckland'),
('Bex', 'Damascus');

COMMIT;
