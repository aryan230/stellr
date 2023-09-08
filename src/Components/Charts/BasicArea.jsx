import React, { useEffect, useState } from "react";
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

  // useEffect(() => {
  //   if (!calculated) {
  //     if (newSamples) {
  //       newSamples.forEach((element, index) => {
  //         let month = new Date(element.createdAt).getMonth();
  //         let index2 = samSeries.findIndex((e) => e.val === month);
  //         samSeries[index2].data = samSeries[index2].data + 1;
  //       });
  //     }
  //   }
  // }, [newSamples, calculated]);

  console.log(samSeries);
  const series = [
    {
      data: [
        newSamples
          ? newSamples.filter(
              (e) => new Date(e.createdDate).getMonth() + 1 === 1
            ).length
          : 0,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() === 2)
            .length,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() === 3)
            .length,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() === 4)
            .length,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() === 5)
            .length,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() === 6)
            .length,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() + 1 === 7)
            .length,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() + 1 === 8)
            .length,
        newSamples &&
          newSamples.filter((e) => new Date(e.createdDate).getMonth() + 1 === 9)
            .length,
        newSamples &&
          newSamples.filter(
            (e) => new Date(e.createdDate).getMonth() + 1 === 10
          ).length,
        newSamples
          ? newSamples.filter(
              (e) => new Date(e.createdAt).getMonth() + 1 === 11
            ).length
          : 0,
        newSamples
          ? newSamples.filter(
              (e) => new Date(e.createdAt).getMonth() + 1 === 12
            ).length
          : 0,
      ],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: ["#4669FA"],
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      colors: "#4669FA",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [50, 100, 0],
      },
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
        show: false,
      },
      axisTicks: {
        show: false,
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
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
};

export default BasicArea;
