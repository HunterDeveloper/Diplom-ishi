import * as api from "../api";
import { CHART_APPLICATION } from "../constants/actionTypes";

export const chartApplications = (id) => async (dispatch) => {
  try {
    const { data } = await api.getApplication();

    const arr = [
      { x: "Bekor qilingan", y: 0, text: "" },
      { x: "Bajarilgan", y: 0, text: "" },
      { x: "Jarayonda", y: 0, text: "" },
    ];

    if (id) {
      let cloneArr = data.data.filter((elem) =>
        id === "all" ? true : elem.categoryId === id
      );

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

    console.log(arr);

    dispatch({ type: CHART_APPLICATION, payload: arr });
  } catch (error) {
    console.log(error.message);
  }
};
