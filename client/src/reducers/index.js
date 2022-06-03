import { combineReducers } from "redux";

import { categories } from "./category";
import { applications } from "./application";

export default combineReducers({
  categories,
  applications,
});
