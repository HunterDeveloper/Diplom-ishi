import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Category.scss";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategory,
} from "../../actions";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");
  const [currentId, setCurrentId] = useState();
  const [currentCtg, setCurrentCtg] = useState({ name: "" });

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const isFormValid = () => {
    return category.length !== 0 || currentCtg.name.length !== 0;
  };

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
    <div className="Category">
      <div className="category_list">
        <h3>Category list</h3>
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
            <Loader />
          )}
        </ul>
      </div>
      <div className="category_form">
        <h3>Category form</h3>
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
            {currentId ? "Edit category" : "Add category"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Category;