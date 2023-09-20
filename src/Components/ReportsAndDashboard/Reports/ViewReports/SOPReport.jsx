import React, { useState } from "react";
import CustomLine from "../../../CustomCharts/CustomLine";
import CustomPieChart from "../../../CustomCharts/CustomPieChart";
import { useSelector } from "react-redux";
import CustomAreaChart from "../../../CustomCharts/CustomAreaChart";
import CustomColumnChartDist from "../../../CustomCharts/CustomColumnChartDist";
import CustomFunnel from "../../../CustomCharts/CustomFunnel";
import TopDataReport from "./TopDataReport";
function SOPReport({ data }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [chartsData, setChartsData] = useState(JSON.parse(data.dataSet).charts);
  const [newArr, setNewArr] = useState(
    JSON.parse(JSON.parse(data.dataSet).insideData)
  );
  const [newSamples, setNewSamples] = useState(newArr && newArr);

  let detailed =
    newSamples &&
    newSamples.filter((e) => e.data && e.hasOwnProperty("image")).length;

  let modular =
    newSamples &&
    newSamples &&
    newSamples.filter((e) => e.data && e.hasOwnProperty("file")).length -
      detailed;

  let classic = newSamples && newSamples.length - detailed - modular;

  const series = [
    classic ? classic : 0,
    detailed ? detailed : 0,
    modular ? modular : 0,
  ];

  const labels = ["Classic SOP", "Detailed SOP", "Modular  SOP"];

  const dataInsideLine = {
    name: "SOPs",
    data: [
      newSamples.filter((e) => e.createdAt.split("-")[1] == "01").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "02").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "03").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "04").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "05").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "06").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "07").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "08").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "09").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "10").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "11").length,

      newSamples.filter((e) => e.createdAt.split("-")[1] == "12").length,
    ],
  };
  return (
    <>
      <TopDataReport data={data} />
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
                <CustomPieChart labels={labels} seriesData={series} />
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
        {/* {chartsData.map(
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
        )} */}
        {/* {chartsData.map(
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
        )} */}
      </div>
      <div className="view-report-data-grid">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SOP ID
                </th>
                <th scope="col" className="px-6 py-3">
                  SOP Name
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
                    <td className="px-6 py-4">{p.title}</td>
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
    </>
  );
}

export default SOPReport;
