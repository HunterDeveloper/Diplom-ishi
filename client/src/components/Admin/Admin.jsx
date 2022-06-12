import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Admin.scss";
import { createAdmin, deleteAdmin, editAdmin, getAdmin } from "../../actions/";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Admin = (props) => {
  const dispatch = useDispatch();
  const admins = useSelector((state) =>
    state.admins.filter((a) => a._id !== props.admin._id)
  );
  const categories = useSelector((state) => state.categories);

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    categoryId: "all",
  });
  const [currentId, setCurrentId] = useState();
  const [currentAdmin, setCurrentAdmin] = useState({
    name: "",
    email: "",
    password: "",
    categoryId: "all",
  });

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const isFormValid = () =>
    (admin.name.length !== 0 || currentAdmin.name.length !== 0) &&
    (admin.email.length !== 0 || currentAdmin.email.length !== 0) &&
    (admin.password.length >= 6 || currentAdmin.password.length >= 6) &&
    (admin.categoryId.length >= 0 || currentAdmin.categoryId.length >= 0);

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
    setCurrentAdmin({ name: "", email: "", password: "", categoryId: "" });
    setCurrentId("");
    setAdmin({ name: "", email: "", password: "", categoryId: "" });
  };

  return (
    <Grid lg={8} item container style={{ margin: "auto" }}>
      <div className="Admin">
        <div className="admin_list">
          <h3>Admin list</h3>
          <ul className="menu">
            {admins.length ? (
              admins.map((a, idx) => (
                <li key={idx}>
                  <span>#{idx + 1}</span>
                  <p>{a.name}</p>
                  <p className="email">{a.email}</p>
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
              <span
                style={{ display: "block", width: "100%", textAlign: "center" }}
              >
                There are no admins
              </span>
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
                  ? setCurrentAdmin({
                      ...currentAdmin,
                      password: e.target.value,
                    })
                  : setAdmin({ ...admin, password: e.target.value })
              }
              className="input"
            />
            <FormControl fullWidth className="select">
              <InputLabel id="demo-simple-select-label">
                Tip category
              </InputLabel>
              <Select
                value={currentId ? currentAdmin.categoryId : admin.categoryId}
                label="Murojat turi"
                onChange={(e) =>
                  currentId
                    ? setCurrentAdmin({
                        ...currentAdmin,
                        categoryId: e.target.value,
                      })
                    : setAdmin({ ...admin, categoryId: e.target.value })
                }
              >
                <MenuItem value={"all"} key={1}>
                  All categories
                </MenuItem>
                {!!categories &&
                  categories.map((c) => (
                    <MenuItem value={c._id} key={1}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              size="large"
              variant="contained"
              type="submit"
              className="button"
              disabled={!isFormValid()}
            >
              {currentId ? "Edit admin" : "Add admin"}
            </Button>
          </form>
        </div>
      </div>
    </Grid>
  );
};

export default Admin;
