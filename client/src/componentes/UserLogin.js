import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export function UserLogin() {
  // const [user, setUser] = useState([]);

  // const userRegister = async () => {
  //   const response = await fetch("http://localhost:4000/users");
  //   const data = await response.json();
  //   console.log(data);
  //   setUser(data);
  // };

  // useEffect(() => {
  //   userRegister()
  // }, []);

  // const navigate = useNavigate();

  const [user, setUser] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      console.log("token is: ", data);
      // navigate("/login");
      if (data.mensagge === 'Clave invalida') {
        console.log("Clave invalida 2.0")
      } else {
        console.log("El token es: ", data.header("auth-token"))
      }
    } catch (error) {
      console.error("el error ostrados es: ", error);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            background: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography
            variant="5"
            textAlign="center"
            color="white"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {/* {editing ? "Edit task" : "Create task"} */}
            LOGIN
          </Typography>
          <CardContent>
            <form onSubmit={handleSumbit}>
              <TextField
                variant="filled"
                label="Write your correo"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="correo"
                value={user.correo}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "#777" } }}
              />
              <TextField
                variant="filled"
                label="Write your password"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="password"
                value={user.password}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "#777" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth={true}
                style={{
                  margin: "20px 0",
                }}
                // disabled={task.title === "" || task.description === ""}
              >
                Done
                {/* {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )} */}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
