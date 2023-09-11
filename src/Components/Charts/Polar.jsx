import React from "react";
import ReactApexChart from "react-apexcharts";

function Polar() {
  let series = [
    {
      name: "Subject",
      data: 2,
    },
  ];
  let options = {
    chart: {
      type: "polarArea",
      toolbar: {
        show: true,
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {},
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="polarArea"
      height={300}
    />
  );
}

export default Polar;
