import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Admin, Category, Navbar } from "../components";

import axios from "axios";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Control = () => {
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
        setError("You are not authorized please login");
      }
    };

    fetchData();
  }, [navigate]);

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
      <Navbar />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        action={action}
      />
      <Category />
      {admin.status === "owner" ? <Admin /> : null}
    </>
  );
};

export default Control;
