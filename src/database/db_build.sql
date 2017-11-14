BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id          SERIAL     PRIMARY KEY,
    name    VARCHAR(30)       NOT NULL,
    location        VARCHAR(30) NOT NULL
);

INSERT INTO users (name, location) VALUES ('Alina', 'Moscow');

COMMIT;
