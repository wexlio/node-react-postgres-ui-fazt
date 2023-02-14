import {
  Box,
  Toolbar,
  AppBar,
  Container,
  Typography,
  Button,
  Menu,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   handleClose();
  //   localStorage.clear();
  //   navigate("/");
  // };

  const [tasks, setTasks] = useState([]);

  const handleLogout = async () => {
    try {
      handleClose();
      localStorage.clear();
      const res = await fetch(`http://localhost:7000/logout`);
      const data = await res.json();
      
      setTasks(data);
      return navigate("/");
    } catch (error) {
      return console.error("Ocurrio algo desed get primcipañ");
    }
  };

  // useEffect(() => {
  //   handleLogout();
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#eee",
                  fontSize: "1.5rem",
                }}
                to="/"
              >
                App Register
              </Link>
            </Typography>

            <div
              style={{
                marginRight: "10px",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "#eee",
                  marginLeft: "10px",
                }}
                to="/login"
              >
                Login
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#eee",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                to="/singup"
              >
                Singup
              </Link>
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Options
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/");
                    handleClose();
                  }}
                  disableRipple
                >
                  <HomeIcon />
                  Home
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <ListAltIcon />
                  My tasks
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/tasks/new");
                    handleClose();
                  }}
                  disableRipple
                >
                  <AddIcon />
                  Add Tasks
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                  <EditIcon />
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} disableRipple>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </StyledMenu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
