CREATE TABLE users(
    id int PRIMARY KEY unique,  
    name varchar (20),  
    category char(1),  
    price int,
    imgURL varchar(500)
)
select * from users