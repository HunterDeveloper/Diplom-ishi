import { combineReducers } from "redux";

import { categories } from "./category";
import { applications } from "./application";
import { admins } from "./admin";

export default combineReducers({
  categories,
  applications,
  admins,
});
