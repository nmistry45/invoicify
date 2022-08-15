/**
 * Function: Chart Transformation.
 * Usage: This transforms the data to the format required for chart plotting
 */

import options from "./chartOptions";
import merge from "lodash/merge";

const chartTransformation = (apiData) => {
  const chartOptions = Object.assign({}, options);
  const data = apiData;
  let finalChartConfig = {};
  let dataSeries = [];
  let series = [];

  let chartObject = Object.assign(
    {},
    {
      xAxis: {
        categories: [],
      },
    }
  );
  const paid_date_array = [];
  data.forEach((item) => {
    if (item.paid_date) {
      paid_date_array.push(item.paid_date);
    }
  });
  const xAxisCategories = [...new Set(paid_date_array)];
  xAxisCategories.forEach((pDate) => {
    let total_per_day = 0;
    data.forEach((item) => {
      if (
        pDate === item.paid_date &&
        item.payment_status.toLowerCase() === "paid"
      )
        total_per_day = total_per_day + item.total;
    });
    dataSeries.push(total_per_day);
  });

  chartObject = {
    xAxis: {
      categories: [...xAxisCategories],
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    series: [{ data: dataSeries }],
  };
  finalChartConfig = merge(chartOptions, chartObject);

  return finalChartConfig;
};
/**
 * The transformation is being exported as chartTransformation
 * so that this transfromation can be imported into other modules.
 */
export default chartTransformation;
