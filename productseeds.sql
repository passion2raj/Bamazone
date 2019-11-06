DROP DATABASE if exists bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE  products (
    item_id int not null,
    product_name varchar (25) not null,
    department_name varchar (25) not null,
    price decimal (10,4) not null,
    stock_quantity int default 10,
    primary key (item_id)
);
INSERT INTO products
VALUES 
(1,'iphone 7','Electronics',500,10),
(2,'iphone 8','Electronics', 600,20),
(3,'Levis', 'Clothing',70,50),
(4,'Nike','Clothing', 40,25),
(5,'Think & grow RIch ','Books',15,100),
(6,'The Secrets','Books',12,50),
(7,'G-Shock', 'Watch',90, 12),
(8,'Citizen', 'Watch', 250,5),
(9,'Vitamix', 'Home and Kitchen', 350,10),
(10,'Cefs knife set','Home and Kitchen',75,30);