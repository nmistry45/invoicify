import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Grid } from "@mui/material";
import chartOptions from "./chartOptions";
import chartTransformation from "./transformation";

const ChartsComp = (props) => {
  const data = props.data;
  const [options, setOptions] = useState(chartOptions);
  let chartConfig = {};
  useEffect(() => {
    chartConfig = chartTransformation(data);
    setOptions(Object.assign({}, chartConfig));
  }, [data]);

  return (
    <Grid>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Grid>
  );
};
export default ChartsComp;
