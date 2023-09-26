import React, { useEffect, useState } from "react";
import CreateNewDashboards from "./Dashboards/CreateNewDashboards";
import ViewAllDashboards from "./Dashboards/ViewAllDashboards";
import URL from "./../../Data/data.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ShowCharts from "./Dashboards/ShowCharts";
import { getUserMetrics } from "../../redux/actions/userActions";
function DashHome() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [createNewDash, setCreateNewDash] = useState(false);
  const [viewAllDash, setViewAllDash] = useState(false);
  const [newDash, setNewDash] = useState(false);
  const [editDashboard, setEditDashboard] = useState(false);
  const [editDashboardData, setEditDashboardData] = useState();
  const [loadingDash, setLoading] = useState(false);
  let activeDash = data && data.find((item) => item.active === "true");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userMetrics = useSelector((state) => state.userMetrics);
  const { userMetrics: userData, sucess, loading, error } = userMetrics;

  useEffect(() => {
    dispatch(getUserMetrics());
  }, [dispatch]);

  console.log(userData);

  useEffect(() => {
    setLoading(true);
    var config = {
      method: "get",
      url: `${URL}api/dashboards/mydashboards`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        setLoading(false);
        setData(response.data);
      })
      .catch(function(error) {
        setLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    var config = {
      method: "get",
      url: `${URL}api/dashboards/mydashboards`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        setLoading(false);
        setData(response.data);
      })
      .catch(function(error) {
        setLoading(false);
        console.log(error);
      });
  }, [newDash]);

  console.log(activeDash);
  return (
    <div className="dash-home">
      {createNewDash && (
        <CreateNewDashboards
          setCreateNewDash={setCreateNewDash}
          newDash={newDash}
          setNewDash={setNewDash}
        />
      )}
      {viewAllDash && (
        <ViewAllDashboards
          setViewAllDash={setViewAllDash}
          setNewDash={setNewDash}
          newDash={newDash}
          editDashboard={editDashboard}
          setEditDashboard={setEditDashboard}
          editDashboardData={editDashboardData}
          setEditDashboardData={setEditDashboardData}
        />
      )}

      {loadingDash ? (
        <div className="loader-div-main-stellr">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : activeDash ? (
        <>
          <div className="dash-inside-home-header">
            <div className="dash-home-header-top">
              <h1>{activeDash.name}</h1>
              <p>Private Dashboard</p>
            </div>
            <div className="dash-home-header-bottom">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCreateNewDash(true);
                }}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200"
              >
                Create new dashboard
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setViewAllDash(true);
                }}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200"
              >
                View all dashboards
              </button>
            </div>
          </div>
          <div className="dash-home-main-content">
            <div className="dash-home-main-content-inside">
              <ShowCharts
                insideData={JSON.parse(
                  JSON.parse(activeDash.dataSet).insideData
                )}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="dash-inside-home-header">
            <div className="dash-home-header-top">
              <h1>Dashboard Default</h1>
              <p>Default Dashboard</p>
            </div>
            <div className="dash-home-header-bottom">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCreateNewDash(true);
                }}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200"
              >
                Create new dashboard
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setViewAllDash(true);
                }}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200"
              >
                View all dashboards
              </button>
            </div>
          </div>
          {loading ? (
            <div className="loader-div-main-stellr">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="dash-home-main-content">
              <div className="dash-home-main-content-inside">
                <div className="pt-10">
                  <div className="pb-20">
                    <div className="mx-auto bg-gradient-to-l from-indigo-600 to-indigo-700 h-64 rounded-md">
                      <div className="mx-auto container w-full flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center flex-col">
                          <div className="mt-20">
                            <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold leading-10 text-white">
                              <span className="font-light">
                                Welcome to Your{" "}
                              </span>
                              Data Universe, {userInfo.name}
                            </h2>
                          </div>
                          {/* <div className="mt-6 mx-2 md:mx-0 text-center">
                            <p className="lg:text-lg md:text-base leading-6 text-sm  text-white">
                              Statistical Insights and Analytics
                            </p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    {userData && (
                      <div className="mx-auto container md:-mt-20 -mt-15 flex justify-center items-center">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-2 gap-y-2 lg:gap-x-6 md:gap-x-6 md:gap-y-6 md:gap-y-6">
                          <div className="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                            <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                              {userData.projects && userData.projects.length}
                            </h2>
                            <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                              Projects
                            </p>
                          </div>
                          <div className="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                            <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                              {userData.samples && userData.samples.length}
                            </h2>
                            <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                              Samples
                            </p>
                          </div>
                          <div className="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                            <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                              {userData.protocols && userData.protocols.length}
                            </h2>
                            <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                              Protocols
                            </p>
                          </div>
                          <div className="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                            <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                              {userData.sops && userData.sops.length}
                            </h2>
                            <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                              SOPs
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="flex items-center justify-center rounded bg-gray-50 h-28 hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setCreateNewDash(true);
                  }}
                >
                  <p className="text-2xl text-gray-400">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DashHome;
