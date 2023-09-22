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
import { listMyTasks } from "../../../../redux/actions/taskActions";

function ShowChartTasks({ c }) {
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

  const taskListMy = useSelector((state) => state.taskListMy);
  const { tasks, loading: loadingTasks, error: errorTasks } = taskListMy;

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
    dispatch(listMyTasks(selectedProject));
  }, [dispatch, selectedProject]);

  const labels = ["My Projects", "Collaborated Projects"];

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
      {loadingTasks ? (
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
              <option></option>
              {newArr &&
                newArr.length > 0 &&
                newArr.map((p) => <option value={p._id}>{p.name}</option>)}
            </select>
          </div>{" "}
          {tasks && c.value.split("-")[1] === "line" && (
            <div className="py-10">
              <CustomLine
                dataInside={{
                  name: "Tasks",
                  data: [
                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "01")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "02")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "03")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "04")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "05")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "06")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "07")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "08")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "09")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "10")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "11")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "12")
                        .length,
                  ],
                }}
              />
            </div>
          )}
          {tasks && c.value.split("-")[1] === "area" && (
            <div className="py-10">
              <CustomAreaChart
                dataInside={{
                  name: "tasks",
                  data: [
                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "01")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "02")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "03")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "04")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "05")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "06")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "07")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "08")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "09")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "10")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "11")
                        .length,

                    tasks &&
                      tasks.filter((e) => e.createdAt.split("-")[1] == "12")
                        .length,
                  ],
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ShowChartTasks;
