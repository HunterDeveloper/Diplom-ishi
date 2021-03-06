import {
  CREATE_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
  GET_ADMIN,
} from "../constants/actionTypes";

export const admins = (admins = [], action) => {
  switch (action.type) {
    case GET_ADMIN:
      return action.payload;
    case CREATE_ADMIN:
      return [...admins, action.payload];
    case EDIT_ADMIN:
      return admins.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    case DELETE_ADMIN:
      return admins.filter((a) => a._id !== action.payload);
    default:
      return admins;
  }
};
