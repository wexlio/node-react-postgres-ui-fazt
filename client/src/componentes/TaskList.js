import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  let err = ""

  const navigate = useNavigate()

  const mostrarData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/tasks`);
      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.error("Ocurrio algo");
    }
  };

  useEffect(() => {
    mostrarData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      console.log(res);

      err = res.status

      if ( err === 401) {
        console.log("no tienes permiso para realizar esta accion")
      } else {
        const filter = tasks.filter((task) => task.id !== id);
        setTasks(filter);
      }

    } catch (error) {
      console.error("Ocurrio algo");
    }
  };

  return (
    <>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <Card
          style={{
            marginBottom: ".7rem",
            background: "#1e272e",
          }}
          key={task.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "#ddd",
              }}
            >
              <Typography>{task.title}</Typography>

              <Typography>{task.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  if (task.status === 401) {
                    console.log("no tienes permisos para realizar esta accion")
                  } else {
                    console.log(err, 999)
                    navigate(`/tasks/${task.id}/edit`)
                  }
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  handleDelete(task.id);
                }}
                style={{
                  marginLeft: ".5rem",
                }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
