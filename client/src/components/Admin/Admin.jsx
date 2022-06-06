import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Admin.scss";
import { createAdmin, deleteAdmin, editAdmin, getAdmin } from "../../actions/";
import { Button, TextField } from "@mui/material";

const Admin = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
  const [currentId, setCurrentId] = useState();
  const [currentAdmin, setCurrentAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(editAdmin(currentId, currentAdmin));
      clean();
    } else {
      dispatch(createAdmin(admin));
      clean();
    }
  };

  const onEditHandler = (id) => {
    const admin = admins.find((a) => a._id === id);
    setCurrentAdmin(admin);
    setCurrentId(id);
  };

  const onDeleteHandler = (id) => {
    dispatch(deleteAdmin(id));
  };

  const clean = () => {
    setCurrentAdmin({ name: "", email: "", password: "" });
    setCurrentId("");
    setAdmin({ name: "", email: "", password: "" });
  };

  return (
    <div className="Admin">
      <div className="admin_list">
        <h3>Admin list</h3>
        <ul className="menu">
          {admins.length ? (
            admins.map((a, idx) => (
              <li key={idx}>
                <span>#{idx + 1}</span>
                <p>{a.name}</p>
                <p>{a.email}</p>
                <div className="item_icons">
                  <button onClick={() => onEditHandler(a._id)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => onDeleteHandler(a._id)}>
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <Loader />
          )}
        </ul>
      </div>
      <div className="admin_form">
        <h3>Admin form</h3>
        <form className="form" onSubmit={onSubmitHandler}>
          <TextField
            label="Name"
            variant="outlined"
            value={currentId ? currentAdmin.name : admin.name}
            onChange={(e) =>
              currentId
                ? setCurrentAdmin({ ...currentAdmin, name: e.target.value })
                : setAdmin({ ...admin, name: e.target.value })
            }
            className="input"
          />
          <TextField
            label="E-mail"
            variant="outlined"
            value={currentId ? currentAdmin.email : admin.email}
            onChange={(e) =>
              currentId
                ? setCurrentAdmin({ ...currentAdmin, email: e.target.value })
                : setAdmin({ ...admin, email: e.target.value })
            }
            className="input"
          />
          <TextField
            label="Password"
            variant="outlined"
            value={currentId ? currentAdmin.password : admin.password}
            onChange={(e) =>
              currentId
                ? setCurrentAdmin({ ...currentAdmin, password: e.target.value })
                : setAdmin({ ...admin, password: e.target.value })
            }
            className="input"
          />
          <Button
            size="large"
            variant="contained"
            type="submit"
            className="button"
          >
            {currentId ? "Edit admin" : "Add admin"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
