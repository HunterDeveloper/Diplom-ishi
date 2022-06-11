import * as api from "../api";
import { CHART_APPLICATION } from "../constants/actionTypes";

export const chartApplications = (id) => async (dispatch) => {
  try {
    const { data } = await api.getApplication();

    const arr = [
      { x: "Cancel", y: 0, text: "" },
      { x: "Success", y: 0, text: "" },
      { x: "In progress", y: 0, text: "" },
    ];

    if (id) {
      let cloneArr = data.data.filter((elem) => elem.categoryId === id);

      cloneArr.map((elem) => {
        if (elem.status === "cancel") {
          arr[0].y++;
        }
        if (elem.status === "success") {
          arr[1].y++;
        }
        if (elem.status === "in-progress") {
          arr[2].y++;
        }

        return elem;
      });
    } else {
      data.data.map((elem) => {
        if (elem.status === "cancel") {
          arr[0].y++;
        }
        if (elem.status === "success") {
          arr[1].y++;
        }
        if (elem.status === "in-progress") {
          arr[2].y++;
        }

        return elem;
      });
    }

    dispatch({ type: CHART_APPLICATION, payload: arr });
  } catch (error) {
    console.log(error.message);
  }
};
