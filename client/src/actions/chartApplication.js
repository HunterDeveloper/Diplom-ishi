import * as api from "../api";
import { CHART_APPLICATION } from "../constants/actionTypes";

import moment from "moment";

export const chartApplications = () => async (dispatch) => {
  try {
    const { data } = await api.getApplication();

    const arr = data.data.map((a) => {
      a.count = 1;
      return a;
    });

    const obj = {
      cancel: [],
      success: [],
      progress: [],
    };

    data.data.map((d, i) => {
      d.count = 1;
      d.date = moment(d.date).format("L");
      if (d.status === "cancel") {
        let idx;
        let e = obj.cancel.find((a, ind) => {
          idx = ind;
          return a.date === d.date;
        });
        if (e) {
          obj.cancel[idx].count++;
        } else obj.cancel.push(d);
      } else if (d.status === "success") {
        let idx;
        let e = obj.success.find((a, ind) => {
          idx = ind;
          return a.date === d.date;
        });
        if (e) {
          obj.success[idx].count++;
        } else obj.success.push(d);
      } else {
        let idx;
        let e = obj.progress.find((a, ind) => {
          idx = ind;
          return a.date === d.date;
        });
        if (e) {
          obj.progress[idx].count++;
        } else obj.progress.push(d);
      }

      return d;
    });

    console.log(obj);

    dispatch({ type: CHART_APPLICATION, payload: arr });
  } catch (error) {
    console.log(error.message);
  }
};
