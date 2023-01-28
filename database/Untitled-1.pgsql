

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    description VARCHAR(255)
)

DROP TABLE task

select * from task

INSERT INTO task (title, description) VALUES ('TAREA2', 'descripcion tarea er1')

DELETE FROM task WHERE id = 4