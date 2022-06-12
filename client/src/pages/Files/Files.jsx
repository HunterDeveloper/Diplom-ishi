import { Grid, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getApplication, getAdmin } from "../../actions";
import { Loader, Navbar } from "../../components";

import "./Files.scss";

export const URL = "http://localhost:5000/";

const Files = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState("");
  const application = useSelector((state) =>
    id ? state.applications.find((a) => a._id === id) : null
  );

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/control/auth");
    }
    dispatch(getAdmin());
    dispatch(getApplication());

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
      <Grid lg={8} item container style={{ margin: "auto" }}>
        <h2>Files page</h2>
        <div className="file_list">
          {application ? (
            application.files.map((f, i) => {
              if (
                ["mp4"].indexOf(f.split(".")[f.split(".").length - 1]) === -1
              ) {
                return (
                  <div className="Files" key={i}>
                    <header>
                      <h3>
                        #{i + 1}-file {f}
                      </h3>
                    </header>
                    <div className="file_image">
                      <img src={URL + f} alt="application-img" />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="Files" key={i}>
                    <header>
                      <h3>
                        #{i + 1}-file {f}
                      </h3>
                    </header>
                    <div className="file_video">
                      <video controls>
                        <source src={URL + f} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <Loader />
          )}
        </div>
      </Grid>
    </>
  );
};

export default Files;
