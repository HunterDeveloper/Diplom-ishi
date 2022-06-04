import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";

const Control = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/control/auth");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Control;
