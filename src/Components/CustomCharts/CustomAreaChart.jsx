import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function CustomAreaChart({ dataInside, height }) {
  const [series, setSeries] = useState([dataInside]);
  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    title: {
      text: "Data trends by Month",
      align: "left",
    },
    subtitle: {
      text: "Data Movements",
      align: "left",
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

    legend: {
      horizontalAlign: "left",
    },
  };
  return (
    series && (
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={height ? height : 350}
      />
    )
  );
}

export default CustomAreaChart;
