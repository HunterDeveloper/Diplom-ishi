import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Category.scss";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategory,
} from "../../actions";
import { useEffect } from "react";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");
  const [currentId, setCurrentId] = useState();
  const [currentCtg, setCurrentCtg] = useState({ name: "" });

  const isFormValid = () => {
    return category.length !== 0 || currentCtg.name.length !== 0;
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(editCategory(currentId, currentCtg));
      clean();
    } else {
      dispatch(createCategory({ name: category }));
      clean();
    }
  };

  const onEditHandler = (id) => {
    setCurrentId(id);
    const category = categories.find((c) => c._id === id);
    setCurrentCtg(category);
  };

  const onDeleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const clean = () => {
    setCurrentCtg({ name: "" });
    setCurrentId("");
    setCategory("");
  };

  return (
    <Grid lg={8} item container style={{ margin: "auto" }}>
      <div className="Category">
        <div className="category_list">
          <h3>Kategoriyalar ro'yxati</h3>
          <ul className="menu">
            {categories.length ? (
              categories.map((ctg, idx) => (
                <li key={idx}>
                  <span>#{idx + 1}</span>
                  <p>{ctg.name}</p>
                  <div className="item_icons">
                    <button onClick={() => onEditHandler(ctg._id)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => onDeleteHandler(ctg._id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <span
                style={{ display: "block", width: "100%", textAlign: "center" }}
              >
                Kategoriyalar yo'q
              </span>
            )}
          </ul>
        </div>
        <div className="category_form">
          <h3>Kategoriya formasi</h3>
          <form className="form" onSubmit={onSubmitHandler}>
            <TextField
              label="Kategoriya"
              variant="outlined"
              value={currentId ? currentCtg.name : category}
              onChange={(e) =>
                currentId
                  ? setCurrentCtg({ name: e.target.value })
                  : setCategory(e.target.value)
              }
              className="input"
            />
            <Button
              size="large"
              disabled={!isFormValid()}
              variant="contained"
              type="submit"
              className="button"
            >
              {currentId ? "O'rgartirish" : "Yaratish"}
            </Button>
          </form>
        </div>
      </div>
    </Grid>
  );
};

export default Category;
