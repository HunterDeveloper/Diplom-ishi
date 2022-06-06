import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORY,
} from "../constants/actionTypes";

export const categories = (categories = [], action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload;
    case CREATE_CATEGORY:
      return [...categories, action.payload];
    case EDIT_CATEGORY:
      return categories.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    case DELETE_CATEGORY:
      return categories.filter((c) => c._id !== action.payload);
    default:
      return categories;
  }
};
