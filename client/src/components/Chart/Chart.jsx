import React, { useEffect, useState } from "react";

import "./Chart.scss";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Tooltip,
  Category,
  DataLabel,
  ColumnSeries,
} from "@syncfusion/ej2-react-charts";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { chartApplications, getApplication, getCategory } from "../../actions";

export let data1 = [
  { x: "USA", y: 46 },
  { x: "GBR", y: 27 },
  { x: "CHN", y: 26 },
  { x: "CHN", y: 26 },
  { x: "CHN", y: 26 },
  { x: "CHN", y: 26 },
  { x: "CHN", y: 26 },
];
export let data2 = [
  { x: "USA", y: 37 },
  { x: "GBR", y: 23 },
  { x: "CHN", y: 18 },
  { x: "CHN", y: 26 },
];
export let data3 = [
  { x: "USA", y: 38 },
  { x: "GBR", y: 17 },
  { x: "CHN", y: 26 },
  { x: "CHN", y: 26 },
];

const Chart = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const application = useSelector((state) => state.chartApplication);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(chartApplications());
    dispatch(getApplication());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <Grid lg={8} item container style={{ margin: "auto" }}>
      {application ? (
        <div className="Chart">
          <header>
            <h4>Analystic</h4>
            <FormControl fullWidth className="select">
              <InputLabel id="demo-simple-select-label">
                Categoriyalar
              </InputLabel>
              <Select
                value={categoryId}
                label="Kategoriyalar"
                onChange={(e) => setCategoryId(e.target.value)}
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
          </header>
          <ChartComponent
            id="bar-chart"
            primaryXAxis={{
              valueType: "Category",
              majorGridLines: { width: 0 },
            }}
            primaryYAxis={{
              labelFormat: "{value}",
              edgeLabelPlacement: "Shift",
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 },
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={"#fff"}
          >
            <Inject
              services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
            />

            <SeriesCollectionDirective>
              {application.map((a) => {
                if (a.status === "cancel") {
                  return (
                    <SeriesDirective
                      dataSource={[a]}
                      xName="date"
                      yName="count"
                      name="cancel"
                      type="Column"
                      marker={{
                        dataLabel: {
                          visible: true,
                          position: "Top",
                          font: { fontWeight: "600", color: "#ffffff" },
                        },
                      }}
                    ></SeriesDirective>
                  );
                } else if (a.status === "success") {
                  return (
                    <SeriesDirective
                      dataSource={[a]}
                      xName="date"
                      yName="count"
                      name="success"
                      type="Column"
                      marker={{
                        dataLabel: {
                          visible: true,
                          position: "Top",
                          font: { fontWeight: "600", color: "#ffffff" },
                        },
                      }}
                    ></SeriesDirective>
                  );
                } else {
                  return (
                    <SeriesDirective
                      dataSource={[a]}
                      xName="date"
                      yName="count"
                      name="progress"
                      type="Column"
                      marker={{
                        dataLabel: {
                          visible: true,
                          position: "Top",
                          font: { fontWeight: "600", color: "#ffffff" },
                        },
                      }}
                    ></SeriesDirective>
                  );
                }
              })}

              {/* <SeriesDirective
                dataSource={application.success}
                xName="date"
                yName="count"
                name="asd3"
                type="Column"
                marker={{
                  dataLabel: {
                    visible: true,
                    position: "Top",
                    font: { fontWeight: "600", color: "#ffffff" },
                  },
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={application.progress}
                xName="date"
                yName="count"
                name="asd2"
                bearFillColor="#fff"
                type="Column"
                marker={{
                  dataLabel: {
                    visible: true,
                    position: "Top",
                    font: { fontWeight: "600", color: "#ffffff" },
                  },
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={application.cancel}
                xName="date"
                yName="count"
                name="asd1"
                type="Column"
                marker={{
                  dataLabel: {
                    visible: true,
                    position: "Top",
                    font: { fontWeight: "600", color: "#ffffff" },
                  },
                }}
              ></SeriesDirective> */}
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      ) : null}
    </Grid>
  );
};

export default Chart;
