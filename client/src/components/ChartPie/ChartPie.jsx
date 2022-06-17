import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chartApplications, getApplication, getCategory } from "../../actions";

import "./ChartPie.scss";

const ChartPie = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const application = useSelector((state) => state.chartApplication);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (categoryId) {
      dispatch(chartApplications(categoryId || props.admin.categoryId));
    } else {
      dispatch(chartApplications(props.admin ? props.admin.categoryId : null));
    }
    dispatch(getApplication());
    dispatch(getCategory());
  }, [dispatch, categoryId, props]);

  const onChangeCategory = (id) => {
    setCategoryId(id);
  };

  return (
    <Grid lg={8} item container style={{ margin: "auto" }}>
      <div className="ChartPie">
        <header>
          <h4>Analitika</h4>
          {!props.admin || props.admin.categoryId === "all" ? (
            <FormControl fullWidth className="select">
              <InputLabel id="demo-simple-select-label">
                Kategoriyalar
              </InputLabel>
              <Select
                value={categoryId}
                label="Kategoriyalar"
                onChange={(e) => onChangeCategory(e.target.value)}
              >
                <MenuItem value="">Hammasi</MenuItem>
                {categories.length
                  ? categories.map((ctg, idx) => (
                      <MenuItem value={ctg._id} key={idx}>
                        {ctg.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          ) : null}
        </header>
        <AccumulationChartComponent
          height="700"
          id="pie-chart"
          title="Murojatlar statistikasi"
          titleStyle={{ size: "24px", fontWeight: "400" }}
          legendSettings={{
            visible: true,
            position: "Bottom",
            textStyle: { size: "18px" },
          }}
          enableSmartLabels={true}
          enableAnimation={true}
          center={{ x: "50%", y: "50%" }}
          tooltip={{
            enable: true,
          }}
        >
          <Inject
            services={[
              AccumulationLegend,
              PieSeries,
              AccumulationTooltip,
              AccumulationDataLabel,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={application}
              name="Murojatlar"
              xName="x"
              yName="y"
              dataLabel={{
                visible: true,
                position: "Inside",
                name: "text",
                font: {
                  color: "#fff",
                  fontWeight: "500",
                  size: "16px",
                },
              }}
              radius="70%"
            ></AccumulationSeriesDirective>
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </Grid>
  );
};

export default ChartPie;
