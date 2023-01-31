import {
  Box,
  Toolbar,
  AppBar,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link style={{textDecoration: 'none', color: '#eee', fontSize: "1.5rem"}} to="/">App Register</Link>
              <Link style={{textDecoration: 'none', color: '#eee', marginLeft: "10px"}} to="/login">login</Link>
            </Typography>

            <Button
              onClick={() => navigate("/tasks/new")}
              variant="contained"
              color="primary"
            >
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
