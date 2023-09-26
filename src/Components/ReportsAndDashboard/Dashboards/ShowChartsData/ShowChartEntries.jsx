import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listMyCollabProjects,
  listMyProjects,
} from "../../../../redux/actions/projectActions";
import { listMyCollabOrgs } from "../../../../redux/actions/organizationActions";
import axios from "axios";
import { listMyEntries } from "../../../../redux/actions/entryActions";
import CustomLine from "../../../CustomCharts/CustomLine";
import CustomAreaChart from "../../../CustomCharts/CustomAreaChart";
import URL from "./../../../../Data/data.json";

function ShowChartEntries({ c }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectStats, setProjectStats] = useState();
  const [projectEntryData, setProjectEntryData] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectListMy = useSelector((state) => state.projectListMy);
  const {
    projects,
    loading: loadingOrders,
    error: errorOrders,
  } = projectListMy;

  const projecListMyCollab = useSelector((state) => state.projecListMyCollab);
  const {
    projects: projectsCollab,
    loading: projectCollabLoading,
    error: errorCollabLoading,
  } = projecListMyCollab;

  const projectListMyOrg = useSelector((state) => state.projectListMyOrg);
  const {
    projects: projectsOrg,
    loading: projectOrgLoading,
    error: errorOrgLoading,
  } = projectListMyOrg;

  const entriesListMy = useSelector((state) => state.entriesListMy);
  const {
    entries,
    loading: loadingEntries,
    error: errorEntries,
  } = entriesListMy;

  let newArr =
    projects && projectsCollab && projectsOrg
      ? _.unionBy(projects, projectsCollab, projectsOrg, "_id")
      : _.unionBy(projects, projectsCollab, "_id");

  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    dispatch(listMyProjects());
    dispatch(listMyCollabProjects());
    dispatch(listMyCollabOrgs());
  }, [dispatch]);

  useEffect(() => {
    console.log(selectedProject);
    dispatch(listMyEntries(selectedProject));
  }, [dispatch, selectedProject]);

  const getProjectStats = async () => {
    var data = JSON.stringify({
      projectId: newArr.map(({ _id, name }) => ({ _id, name })),
    });

    var config = {
      method: "post",
      url: `${URL}api/projects/stats`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setProjectStats(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (newArr) {
      if (!projectStats) {
        getProjectStats();
      }
    }
  }, [newArr, projectStats]);

  return (
    <>
      {loadingEntries ? (
        <>Loading</>
      ) : (
        <>
          <div className="">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select an Project
            </label>
            <select
              id="countries"
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              {newArr &&
                newArr.length > 0 &&
                newArr.map((p) => <option value={p._id}>{p.name}</option>)}
            </select>
          </div>
          {entries && c.value.split("-")[1] === "line" && selectedProject ? (
            <div className="py-10">
              <CustomLine
                dataInside={{
                  name: "Entries",
                  data: [
                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "01")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "02")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "03")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "04")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "05")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "06")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "07")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "08")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "09")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "10")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "11")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "12")
                        .length,
                  ],
                }}
              />
            </div>
          ) : (
            <div className="w-[100%] h-64 flex justify-center items-center">
              <div
                className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
                role="alert"
              >
                <span className="font-medium">No Project Selected</span> Please
                select a project.
              </div>
            </div>
          )}
          {entries && c.value.split("-")[1] === "area" && selectedProject ? (
            <div className="py-10">
              <CustomAreaChart
                dataInside={{
                  name: "Entries",
                  data: [
                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "01")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "02")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "03")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "04")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "05")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "06")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "07")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "08")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "09")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "10")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "11")
                        .length,

                    entries &&
                      entries.filter((e) => e.createdAt.split("-")[1] == "12")
                        .length,
                  ],
                }}
              />
            </div>
          ) : (
            <div className="w-[100%] h-64 flex justify-center items-center">
              <div
                className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
                role="alert"
              >
                <span className="font-medium">No Project Selected</span> Please
                select a project.
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ShowChartEntries;
