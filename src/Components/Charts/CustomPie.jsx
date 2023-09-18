import React, { useState } from "react";
import Chart from "react-apexcharts";
function CustomPie({ labels, seriesData }) {
  const [isDark, setIsDark] = useState(false);

  const series = seriesData;

  const options = {
    labels: labels,
    dataLabels: {
      enabled: true,
    },

    colors: ["#4669FA", "#F1595C", "#50C793"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "Poppins",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div>
      <Chart options={options} series={series} type="pie" height="200" />
    </div>
  );
}

export default CustomPie;
