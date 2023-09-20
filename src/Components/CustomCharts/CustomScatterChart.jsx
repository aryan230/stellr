import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function CustomScatterChart({ dataInside }) {
  function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y = yrange;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  const [series, setSeries] = useState([
    {
      name: "TEAM 1",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        1,
        2
      ),
    },
    {
      name: "TEAM 2",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        1,
        2
      ),
    },
    {
      name: "TEAM 3",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        1,
        3
      ),
    },
    {
      name: "TEAM 4",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        1,
        4
      ),
    },
    {
      name: "TEAM 5",
      data: generateDayWiseTimeSeries(
        new Date("15 Feb 2017 GMT").getTime(),
        1,
        5
      ),
    },
  ]);

  const options = {
    chart: {
      height: 350,
      type: "scatter",
      zoom: {
        type: "xy",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      max: 70,
    },
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="scatter"
      height={350}
    />
  );
}

export default CustomScatterChart;
