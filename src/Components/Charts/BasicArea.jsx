import { filter } from "lodash";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

const BasicArea = ({ height = 200, newSamples }) => {
  const [isDark, setisDark] = useState(false);
  let [calculated, setCalculated] = useState(false);
  const [series, setSeries] = useState();
  const [isFiltering, setIsFiltering] = useState(true);

  const filterData = async () => {
    setIsFiltering(true);

    // Simulate an asynchronous filter operation (e.g., an API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (newSamples) {
      const filtered = await [
        {
          name: "Samples",
          data: [
            await newSamples.filter((e) => e.createdAt.split("/")[1] == "01")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "02")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "03")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "04")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "05")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "06")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "07")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "08")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "09")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "10")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "11")
              .length,

            await newSamples.filter((e) => e.createdAt.split("/")[1] == "12")
              .length,
          ],
        },
      ];

      if (filtered[0].data.length === 12) {
        setSeries(filtered);
        setIsFiltering(false);
      }
    }
  };
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

  useEffect(() => {
    if (!series) {
      if (newSamples) {
        filterData();
      }
    }
  }, [series, newSamples]);
  useEffect(() => {
    console.log(series && series[0].data.length);
  }, [series]);

  return (
    <div>
      {isFiltering ? (
        <p>Filtering...</p>
      ) : (
        series && (
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={220}
          />
        )
      )}
    </div>
  );
};

export default BasicArea;
