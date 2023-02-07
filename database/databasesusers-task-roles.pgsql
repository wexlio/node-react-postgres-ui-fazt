select * from task

CREATE TABLE users(
    id serial PRIMARY KEY,  
    name varchar (20),  
    correo varchar (50),  
    password varchar (70),
    role varchar(20) default('user')
)

CREATE TABLE task(
    id serial, 
    title VARCHAR(255),
    description VARCHAR(255),
    id_user VARCHAR(10)
)

ALTER TABLE users ALTER COLUMN role SET DATA TYPE DEFAULT 'user'

CREATE TABLE roles(
    role varchar(10)
)

INSERT INTO users (name, correo, password, role) VALUES ('diego', 'diegoespinozareyna@gmail.com', '18692602', 'admin')

DROP TABLE users
DROP TABLE task

DROP TABLE roles

select * from users
select * from roles
select * from task



INSERT INTO roles (role)
VALUES ('user')

INSERT INTO roles (role)
VALUES ('moderator')

INSERT INTO roles (role)
VALUES ('admin')

select u.id, u.name, u.correo, r.role 
from users u inner join roles r 
on u.role = r.role
WHERE id = 7
