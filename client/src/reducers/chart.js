import { CHART_APPLICATION } from "../constants/actionTypes";

export const chartApplication = (chartApplication = [], action) => {
  switch (action.type) {
    case CHART_APPLICATION:
      return action.payload;
    default:
      return chartApplication;
  }
};
