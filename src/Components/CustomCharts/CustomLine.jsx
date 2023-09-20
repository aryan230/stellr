import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function CustomLine({ dataInside }) {
  const [series, setSeries] = useState([dataInside]);
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Data Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };
  return (
    dataInside &&
    series && (
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    )
  );
}

export default CustomLine;
