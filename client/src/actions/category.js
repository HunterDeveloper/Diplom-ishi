import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORY,
} from "../constants/actionTypes";

import * as api from "../api";

export const getCategory = () => async (dispatch) => {
  try {
    const { data } = await api.getCategory();

    dispatch({ type: GET_CATEGORY, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    const { data } = await api.createCategory(category);

    dispatch({ type: CREATE_CATEGORY, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editCategory = (id, updatedCategory) => async (dispatch) => {
  try {
    const { data } = await api.editCategory(id, updatedCategory);

    dispatch({ type: EDIT_CATEGORY, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);

    dispatch({ type: DELETE_CATEGORY, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
