const options = {
  chart: {
    type: "column",
  },
  title: {
    text: "Total Payment Received per Day",
  },

  xAxis: {
    categories: [],
    title: {
      text: "Date",
    },
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Payment",
    },
  },

  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  series: [
    {
      name: "Total Payment",
    },
  ],
};

export default options;
