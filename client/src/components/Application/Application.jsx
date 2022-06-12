import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplication, getCategory, editApplication } from "../../actions";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import "./Application.scss";
import { Link } from "react-router-dom";

const Application = (props) => {
  const dispatch = useDispatch();

  const applications = useSelector((state) =>
    props.admin.categoryId === "all"
      ? state.applications
      : state.applications.filter(
          (a) => a.categoryId === props.admin.categoryId
        )
  );

  useEffect(() => {
    dispatch(getApplication());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <Grid lg={8} item container style={{ margin: "auto" }}>
      <div className="Application">
        <h3>Application list</h3>
        <div className="app_list">
          <ul className="menu">
            <li className="item-header item">
              <span className="num">number</span>
              <span className="name">Name</span>
              <span className="city">city</span>
              <span className="file_link">view</span>
              <span className="status">status</span>
            </li>
            {applications.length ? (
              applications.map((app, idx) => (
                <li className="item" key={idx}>
                  <span className="num">#{idx + 1}</span>
                  <div className="name">
                    <p className="text">{app.name}</p>
                    <p className="text">{app.surname}</p>
                  </div>
                  <p className="city text">{app.city}</p>
                  <Link className="file_link" to={`/control/view/${app._id}`}>
                    Open
                  </Link>
                  <div className="status">
                    <FormControl fullWidth className="select">
                      <InputLabel id="demo-simple-select-label">
                        Murojat turi
                      </InputLabel>
                      <Select
                        className={"selector " + app.status}
                        value={app.status}
                        label="Murojat turi"
                        onChange={(e) =>
                          dispatch(
                            editApplication(app._id, { status: e.target.value })
                          )
                        }
                      >
                        <MenuItem value={"in-progress"} key={1}>
                          In Progress
                        </MenuItem>
                        <MenuItem value={"cancel"} key={2}>
                          Canceled
                        </MenuItem>
                        <MenuItem value={"success"} key={3}>
                          Success
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </li>
              ))
            ) : (
              <span
                style={{ display: "block", width: "100%", textAlign: "center" }}
              >
                There are no applications
              </span>
            )}
          </ul>
        </div>
      </div>
    </Grid>
  );
};

export default Application;
