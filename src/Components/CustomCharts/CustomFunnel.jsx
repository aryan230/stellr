import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function CustomFunnel({ dataInside, dataLabel }) {
  const [series, setSeries] = useState([dataInside]);
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: "Data Funnel",
      align: "middle",
    },
    xaxis: {
      categories: dataLabel,
    },
    legend: {
      show: false,
    },
  };
  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
}

export default CustomFunnel;
