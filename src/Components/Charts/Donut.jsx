import React, { useState } from "react";
import Chart from "react-apexcharts";

const Donut = ({ newSamples }) => {
  const [isDark, setIsDark] = useState(false);

  const subjectPatient =
    newSamples && newSamples.filter((e) => e.type === "Subject/Patient").length;

  const Clinical =
    newSamples && newSamples.filter((e) => e.type === "Clinical").length;
  const MolecularBiology =
    newSamples &&
    newSamples.filter((e) => e.type === "Molecular Biology").length;

  const Reagent =
    newSamples && newSamples.filter((e) => e.type === "Reagent").length;

  const Primer =
    newSamples && newSamples.filter((e) => e.type === "Primer").length;

  const Antibody =
    newSamples && newSamples.filter((e) => e.type === "Antibody").length;

  const series = [
    subjectPatient ? subjectPatient : 0,
    Clinical ? Clinical : 0,
    MolecularBiology ? MolecularBiology : 0,
    Reagent ? Reagent : 0,
    Primer ? Primer : 0,
    Antibody ? Antibody : 0,
  ];
  const options = {
    labels: [
      "Subject/Patient",
      "Clinical",
      "Molecular Biology",
      "Reagent",
      "Primer",
      "Antibody",
    ],
    dataLabels: {
      enabled: true,
    },

    colors: ["#50C793", "#F1595C", "#FBBF24", "#f27457", "#c71df8", "#692eef"],
    legend: {
      position: "bottom",
      fontSize: "16px",
      fontFamily: "Poppins",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "26px",
              fontWeight: "bold",
              fontFamily: "Poppins",
              color: isDark ? "#CBD5E1" : "#475569",
            },
            value: {
              show: true,
              fontFamily: "Poppins",
              color: isDark ? "#CBD5E1" : "#475569",
              formatter(val) {
                // eslint-disable-next-line radix
                return `${parseInt(val)}%`;
              },
            },
            total: {
              show: true,
              fontSize: "1.5rem",
              color: isDark ? "#CBD5E1" : "#475569",
              label: "Total",
              formatter() {
                return "100%";
              },
            },
          },
        },
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
      <Chart options={options} series={series} type="donut" height="300" />
    </div>
  );
};

export default Donut;
