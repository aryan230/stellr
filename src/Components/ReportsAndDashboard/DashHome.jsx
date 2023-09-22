import React, { useEffect, useState } from "react";
import CreateNewDashboards from "./Dashboards/CreateNewDashboards";
import ViewAllDashboards from "./Dashboards/ViewAllDashboards";
import URL from "./../../Data/data.json";
import axios from "axios";
import { useSelector } from "react-redux";
import ShowCharts from "./Dashboards/ShowCharts";
function DashHome() {
  const [data, setData] = useState();
  const [createNewDash, setCreateNewDash] = useState(false);
  const [viewAllDash, setViewAllDash] = useState(false);
  const [newDash, setNewDash] = useState(false);
  const [editDashboard, setEditDashboard] = useState(false);
  const [editDashboardData, setEditDashboardData] = useState();
  let activeDash = data && data.find((item) => item.active === "true");

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

      {activeDash ? (
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
              <h1>Dashboard One</h1>
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
          <div className="dash-home-main-content">
            <div className="dash-home-main-content-inside"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashHome;
