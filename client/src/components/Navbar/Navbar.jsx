import React from "react";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Navbar.scss";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="nav_link">
              ASOSIY
            </Link>
          </Typography>
          {props.admin ? (
            <div className="admin">
              <span>{props.admin.name}</span>
              <p>{props.admin.email}</p>
            </div>
          ) : null}
          {location.pathname === "/" ? (
            <Link className="control_link" to="/control/auth">
              <Button color="inherit" size="large">
                Kirish
              </Button>
            </Link>
          ) : (
            <Button color="inherit" size="large" onClick={logoutHandler}>
              Chiqish
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
