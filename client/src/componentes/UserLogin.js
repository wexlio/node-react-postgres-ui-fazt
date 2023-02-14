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
import { useNavigate } from "react-router-dom";

export function UserLogin() {
  // const [user1, setUser1] = useState([]);

  // const userRegister = async () => {
  //   const response = await fetch("http://localhost:5000/cookie");
  //   const data = await response.json();
  //   console.log(data);
  //   setUser1(data);
  // };

  // useEffect(() => {
  //   userRegister()
  // }, []);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch("http://localhost:7000/signin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json" },
      });

      const data = await response.json();
      console.log(data)
      navigate(`/profile/${data.user.id}`);

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
                label="Write your username"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="username"
                value={user.username}
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
                type="password"
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
