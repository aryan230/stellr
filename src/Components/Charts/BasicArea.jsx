import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

const BasicArea = ({ height = 200, newSamples }) => {
  const [isDark, setisDark] = useState(false);
  let [calculated, setCalculated] = useState(false);
  const [samSeries, setisSeries] = useState([
    {
      month: "Jan",
      val: 1,
      data: 0,
    },
    {
      month: "Feb",
      val: 1,
      data: 0,
    },
    {
      month: "Aug",
      val: 7,
      data: 0,
    },
    {
      month: "Sep",
      val: 8,
      data: 0,
    },
  ]);
  const series = [
    {
      name: "Samples",
      data: [
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "01").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "02").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "03").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "04").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "05").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "06").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "07").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "08").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "09").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "10").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "11").length,
        newSamples &&
          newSamples.filter((e) => e.createdAt.split("/")[1] == "12").length,
      ],
    },
  ];
  const options = {
    chart: {},
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },

    tooltip: {
      theme: "dark",
    },
    zoom: {
      enabled: false,
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
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
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={220}
      />
    </div>
  );
};

export default BasicArea;
