import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function CustomColumnChartDist({ dataInside, dataLabel }) {
  const series = [dataInside];
  const options = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function(chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    // colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    yaxis: [
      {
        labels: {
          formatter: function(val) {
            return val.toFixed(0);
          },
        },
      },
    ],
    xaxis: {
      categories: dataLabel,
      labels: {
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      },
    },
  };
  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
}

export default CustomColumnChartDist;
