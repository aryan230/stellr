import React, { useState } from "react";
import Chart from "react-apexcharts";

const Pie = ({ newSamples }) => {
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

    colors: ["#4669FA", "#F1595C", "#50C793", "#0CE7FA", "#FA916B", "#5d00d2"],
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
      <Chart options={options} series={series} type="pie" height="350" />
    </div>
  );
};

export default Pie;
