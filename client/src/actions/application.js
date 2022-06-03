import {
  CREATE_APPLICATION,
  DELETE_APPLICATION,
  EDIT_APPLICATION,
  GET_APPLICATION,
} from "../constants/actionTypes";

import * as api from "../api";

export const getApplication = () => async (dispatch) => {
  try {
    const { data } = await api.getApplication();

    dispatch({ type: GET_APPLICATION, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createApplication = (application) => async (dispatch) => {
  try {
    const { data } = await api.createApplication(application);

    dispatch({ type: CREATE_APPLICATION, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editApplication = (id, updatedApplication) => async (dispatch) => {
  try {
    const { data } = await api.editApplication(id, updatedApplication);

    dispatch({ type: EDIT_APPLICATION, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  try {
    await api.deleteApplication(id);

    dispatch({ type: DELETE_APPLICATION, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
