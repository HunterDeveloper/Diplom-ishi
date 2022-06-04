import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Auth.scss";

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/control");
    }
  }, [navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/auth",
        {
          email,
          password,
        },
        config
      );

      console.log(data);

      localStorage.setItem("authToken", data.token);

      navigate("/control");
    } catch (e) {
      setError(e.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    const { data } = await axios.post(
      "http://localhost:5000/api/admin/auth",
      {
        email,
        password,
      },
      config
    );

    console.log(data);
  };

  return (
    <div className="Auth">
      <div className="auth_content">
        <h3>Authentication</h3>
        {error && <span className="error-message">{error}</span>}
        <form className="auth_form" onSubmit={onSubmitHandler}>
          <TextField
            label="E-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <TextField
            label="Parol"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <Button type="submit" variant="contained">
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
