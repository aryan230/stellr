import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import URL from "./../../../Data/data.json";
import EditDashboard from "./EditDashboard";
function ViewAllDashboards({
  setViewAllDash,
  newDash,
  editDashboard,
  setEditDashboard,
  editDashboardData,
  setEditDashboardData,
  setNewDash,
}) {
  const [data, setData] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    var config = {
      method: "get",
      url: `${URL}api/dashboards/mydashboards`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var config = {
      method: "get",
      url: `${URL}api/dashboards/mydashboards`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [newDash]);

  return (
    <div className="modal">
      <div className="dash-modal-container dash-modal-view">
        <div className="top-modal">
          <button
            onClick={(e) => {
              setViewAllDash(false);
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
        <div className="dash-main-container">
          {/* <div className="w-[80%] mx-auto pb-10">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    <svg
                      className="w-3 h-3 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                
              </ol>
            </nav>
          </div> */}

          {editDashboard ? (
            <EditDashboard
              setEditDashboard={setEditDashboard}
              editDashboardData={editDashboardData}
              setViewAllDash={setViewAllDash}
              setNewDash={setNewDash}
              data={data ? data : []}
            />
          ) : (
            <div className="dash-main-container-inside">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Dashboard Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Last Updated At
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Active
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.length > 0 &&
                      data.map((p) => (
                        <tr className="bg-white border-b">
                          {/* <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {p._id}
                        </th> */}
                          <td className="px-6 py-4">{p.name}</td>
                          <td className="px-6 py-4">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(p.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            {p.active === "true" ? (
                              <span className="bg-emerald-500 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                Active
                              </span>
                            ) : (
                              <span className="bg-red-400 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                Not Active
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={(e) => {
                                setEditDashboardData(p);
                                setEditDashboard(true);
                              }}
                              type="button"
                              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllDashboards;
