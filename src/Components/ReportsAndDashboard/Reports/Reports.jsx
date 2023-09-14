import axios from "axios";
import React, { useState } from "react";
import URL from "./../../../Data/data.json";
import { useSelector } from "react-redux";
function Reports({
  setReportTab,
  dataValue,
  newReport,
  setNewReport,
  setActiveReport,
}) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("samples");
  const [charts, setCharts] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    let insideData = await JSON.stringify(dataValue);
    var data = await JSON.stringify({
      name,
      description,
      type,
      dataSet: JSON.stringify({
        charts: charts,
        insideData,
      }),
    });

    var config = {
      method: "post",
      url: `${URL[0]}api/reports`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setNewReport(true);
        setActiveReport("reports");
        setReportTab(false);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(data);
  };
  return (
    <div className="modal">
      <div className="report-modal-container">
        <div className="top-modal">
          <button
            onClick={(e) => {
              setReportTab(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <path
                d="M28.2838 15.7712L22.6269 21.4281L16.9701 15.7712C16.72 15.5212 16.3809 15.3807 16.0273 15.3807C15.6737 15.3807 15.3345 15.5212 15.0845 15.7712C14.8344 16.0213 14.6939 16.3604 14.6939 16.714C14.6939 17.0676 14.8344 17.4068 15.0845 17.6568L20.7413 23.3137L15.0845 28.9705C14.8344 29.2206 14.6939 29.5597 14.6939 29.9134C14.6939 30.267 14.8344 30.6061 15.0845 30.8562C15.3345 31.1062 15.6737 31.2467 16.0273 31.2467C16.3809 31.2467 16.72 31.1062 16.9701 30.8562L22.6269 25.1993L28.2838 30.8562C28.5338 31.1062 28.873 31.2467 29.2266 31.2467C29.5802 31.2467 29.9194 31.1062 30.1694 30.8562C30.4195 30.6061 30.5599 30.267 30.5599 29.9134C30.5599 29.5597 30.4195 29.2206 30.1694 28.9705L24.5126 23.3137L30.1694 17.6568C30.4195 17.4068 30.5599 17.0676 30.5599 16.714C30.5599 16.3604 30.4195 16.0213 30.1694 15.7712C29.9194 15.5212 29.5802 15.3807 29.2266 15.3807C28.873 15.3807 28.5338 15.5212 28.2838 15.7712Z"
                fill="#8F8585"
              />
            </svg>
          </button>
        </div>
        <div className="report-main-container">
          <div className="reports-main-container-inside">
            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter name for report
              </label>
              <input
                type="text"
                id="default-input"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Report Description
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write here..."
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={""}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="countries_disabled"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Entity
              </label>
              <select
                disabled="true"
                id="countries_disabled"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected="">Samples</option>
              </select>
            </div>

            <div className="report-main-container-chart">
              <h3 className="mb-5 text-lg font-medium text-gray-900">
                Choose Charts:
              </h3>
              <ul className="grid w-full gap-6 md:grid-cols-3">
                <li>
                  <input
                    type="checkbox"
                    id="react-option"
                    defaultValue=""
                    className="hidden peer"
                    required=""
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCharts((prev) => [...prev, "area"]);
                      } else {
                        setCharts((prev) => prev.filter((e) => e != "area"));
                      }
                    }}
                  />
                  <label
                    htmlFor="react-option"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                  >
                    <div className="block">
                      <img
                        src="https://apexcharts.com/wp-content/uploads/2018/05/area-chart-spline.svg"
                        alt=""
                        className="w-15 h-15"
                      />
                      <div className="w-full text-lg font-semibold">
                        Area Chart
                      </div>
                      <div className="w-full text-sm">
                        Visualization of samples throughput over time.
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="pie"
                    defaultValue=""
                    className="hidden peer"
                    required=""
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCharts((prev) => [...prev, "pie"]);
                      } else {
                        setCharts((prev) => prev.filter((e) => e != "pie"));
                      }
                    }}
                  />
                  <label
                    htmlFor="pie"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                  >
                    <div className="block">
                      <img
                        src="https://apexcharts.com/wp-content/uploads/2020/01/combine-other-slice-in-pie-chart.png"
                        alt=""
                        className="h-15"
                      />
                      <div className="w-full text-lg font-semibold">
                        Pie Chart
                      </div>
                      <div className="w-full text-sm">
                        Status distribution of samples.
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            {/* <>
              {data &&
                Object.keys(data[0]).map((e) => (
                  <div className="flex items-center pl-4 border border-gray-200 rounded">
                    <input
                      id={e}
                      type="checkbox"
                      defaultValue=""
                      name="bordered-checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={e}
                      className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
                    >
                      {e}
                    </label>
                  </div>
                ))}
            </> */}
            <div className="py-10">
              {" "}
              <button
                type="button"
                onClick={submitHandler}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-[30%]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
