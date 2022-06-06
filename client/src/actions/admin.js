import * as api from "../api";
import {
  CREATE_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
  GET_ADMIN,
} from "../constants/actionTypes";

export const getAdmin = () => async (dispatch) => {
  try {
    const { data } = await api.getAdmin();

    dispatch({ type: GET_ADMIN, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createAdmin = (admin) => async (dispatch) => {
  try {
    const { data } = await api.createAdmin(admin);

    dispatch({ type: CREATE_ADMIN, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editAdmin = (id, updatedAdmin) => async (dispatch) => {
  try {
    const { data } = await api.editAdmin(id, updatedAdmin);

    dispatch({ type: EDIT_ADMIN, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAdmin = (id) => async (dispatch) => {
  try {
    await api.deleteAdmin(id);

    dispatch({ type: DELETE_ADMIN, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
