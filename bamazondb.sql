CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER auto_increment NOT NULL primary key,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10, 2) NOT NULL, 
    stock_quantity INTEGER (11) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beggar's Banquet - Rolling Stones", "vinyl records", 17.29, 7),
("Ace of Spades - Motorhead", "vinyl records", 15.99, 11),
("Rocket to Russia - The Ramones", "vinyl records", 17.99, 6),
("Paranoid - Black Sabbath", "vinyl records", 16.34, 2),
("Odelay - Beck", "compact discs", 12.95, 11),
("Paul's Boutique - Beastie Boys", "compact discs", 10.99, 13),
("Nevermind - Nirvana", "compact discs", 9.83, 11),
("London Calling - The Clash", "cassette tapes", 6.50, 3),
("Cosmo's Factory - Creedence Clearwater Revival", "cassette tapes", 4.15, 4),
("Doolittle - The Pixies", "cassette tapes", 5.99, 4)