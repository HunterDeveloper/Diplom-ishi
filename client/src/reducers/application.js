import {
  CREATE_APPLICATION,
  DELETE_APPLICATION,
  EDIT_APPLICATION,
  GET_APPLICATION,
} from "../constants/actionTypes";

export const applications = (applications = [], action) => {
  switch (action.type) {
    case GET_APPLICATION:
      return action.payload;
    case CREATE_APPLICATION:
      return [...applications, action.payload];
    case EDIT_APPLICATION:
      return applications.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    case DELETE_APPLICATION:
      return applications.filter((a) => a._id !== action.payload);
    default:
      return applications;
  }
};
