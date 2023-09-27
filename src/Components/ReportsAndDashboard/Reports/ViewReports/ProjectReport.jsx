import React, { useRef, useState } from "react";
import CustomLine from "../../../CustomCharts/CustomLine";
import CustomPieChart from "../../../CustomCharts/CustomPieChart";
import { useSelector } from "react-redux";
import CustomAreaChart from "../../../CustomCharts/CustomAreaChart";
import CustomColumnChartDist from "../../../CustomCharts/CustomColumnChartDist";
import CustomFunnel from "../../../CustomCharts/CustomFunnel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import TopDataReport from "./TopDataReport";
import generatePDF from "react-to-pdf";

function ProjectReport({ data }) {
  const pdfRef = useRef();

  const [chartsData, setChartsData] = useState(JSON.parse(data.dataSet).charts);
  const [newArr, setNewArr] = useState(
    JSON.parse(JSON.parse(data.dataSet).insideData).projects
  );
  const [projectStats, setProjectStats] = useState(
    JSON.parse(JSON.parse(data.dataSet).insideData).projectStats
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let projectList = newArr && newArr.map((e) => e.name);
  let dataInsideLine = newArr && {
    name: "Projects",
    data: [
      newArr.filter((e) => e.createdAt.split("-")[1] == "01").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "02").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "03").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "04").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "05").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "06").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "07").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "08").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "09").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "10").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "11").length,

      newArr.filter((e) => e.createdAt.split("-")[1] == "12").length,
    ],
  };

  const labels = ["My Projects", "Collaborated Projects"];
  console.log(newArr);
  const downloadPDF = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "Download PDF",
    onAfterPrint: () => alert("Print Sucess"),
  });

  const download = async () => {
    if (pdfRef.current) {
      const input = pdfRef.current;
      html2canvas(input)
        .then((canvas) => {
          const pdf = new jsPDF("p", "mm", "a4");
          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            0,
            0,
            input.clientWidth,
            input.clientHeight
          ); // Adjust dimensions as needed
          pdf.save("my_component.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };
  return (
    <div ref={pdfRef}>
      <TopDataReport data={data} />
      {/* <button onClick={() => generatePDF(pdfRef, { filename: "page.pdf" })}>
        download
      </button> */}
      <div className="view-report-charts">
        {chartsData.map(
          (e) =>
            e === "line" && (
              <div className="py-10">
                <CustomLine dataInside={dataInsideLine ? dataInsideLine : []} />
              </div>
            )
        )}
        {chartsData.map(
          (e) =>
            e === "pie" && (
              <div className="py-10">
                <CustomPieChart
                  labels={labels}
                  seriesData={
                    newArr
                      ? [
                          newArr.filter((p) => p.user == userInfo._id).length,
                          newArr.length -
                            newArr.filter((p) => p.user == userInfo._id).length,
                        ]
                      : []
                  }
                />
              </div>
            )
        )}
        {chartsData.map(
          (e) =>
            e === "area" && (
              <div className="py-10">
                <CustomAreaChart
                  dataInside={dataInsideLine ? dataInsideLine : []}
                />
              </div>
            )
        )}
        {chartsData.map(
          (e) =>
            e === "column" && (
              <div className="py-10">
                <CustomColumnChartDist
                  dataInside={
                    projectStats
                      ? {
                          name: "Record Count",
                          data: projectStats.stats.map((e) => e.entries),
                        }
                      : []
                  }
                  dataLabel={
                    projectStats ? projectStats.stats.map((e) => e.name) : []
                  }
                />
              </div>
            )
        )}
        {chartsData.map(
          (e) =>
            e === "funnel" && (
              <div className="py-10">
                <CustomFunnel
                  dataInside={
                    projectStats
                      ? {
                          name: "Record Count",
                          data: projectStats.stats.map((e) => e.entries),
                        }
                      : []
                  }
                  dataLabel={projectStats.stats.map((e) => e.name)}
                />
              </div>
            )
        )}
      </div>
      <div className="view-report-data-grid">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Project ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {newArr &&
                newArr.length > 0 &&
                newArr.map((p) => (
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {p._id}
                    </th>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectReport;
