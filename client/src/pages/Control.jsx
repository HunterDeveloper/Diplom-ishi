import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Admin, Application, Category, ChartPie, Navbar } from "../components";

import axios from "axios";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";

const Control = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/control/auth");
    }

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/control",
          config
        );

        setAdmin(data.admin);
      } catch (error) {
        localStorage.removeItem("authToken");
        navigate("/");
        setError("You are not authorized please login");
      }
    };
    fetchData();
  }, [navigate, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(!error);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Navbar admin={admin} />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        action={action}
      />
      <Category />
      {admin.status === "owner" ? <Admin admin={admin} /> : null}
      <Application admin={admin} />
      <ChartPie admin={admin} />
    </>
  );
};

export default Control;
