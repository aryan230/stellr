import React, { useState } from "react";
import Chart from "react-apexcharts";
function PieChartProtocol({ newSamples }) {
  const [isDark, setIsDark] = useState(false);

  let basic =
    newSamples &&
    newSamples.filter(
      (e) => e.data && Object.entries(JSON.parse(e.data)).length === 6
    ).length;

  let inter =
    newSamples &&
    newSamples.filter((e) => e.data && e.hasOwnProperty("file")).length;

  let comp = newSamples.length - basic - inter;

  const subjectPatient =
    newSamples &&
    newSamples.filter((e) => Object.entries(JSON.parse(e.data)).length === 6)
      .length;
  const series = [basic, inter ? inter : 0, comp ? comp : 0];

  const options = {
    labels: [
      "Basic Protocols",
      "Comprehensive Protocols",
      "Interactive  Protocols",
    ],
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
      <Chart options={options} series={series} type="pie" height="250" />
    </div>
  );
}

export default PieChartProtocol;
