import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listMyCollabProjects,
  listMyProjects,
} from "../../../../redux/actions/projectActions";
import { listMyCollabOrgs } from "../../../../redux/actions/organizationActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "./../../../../Data/data.json";
import _ from "lodash";
import CustomLine from "../../../CustomCharts/CustomLine";
import CustomFunnel from "../../../CustomCharts/CustomFunnel";
import CustomColumnChartDist from "../../../CustomCharts/CustomColumnChartDist";
import CustomAreaChart from "../../../CustomCharts/CustomAreaChart";
import CustomPieChart from "../../../CustomCharts/CustomPieChart";

function ShowChartProjects({ c }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const labels = ["My Projects", "Collaborated Projects"];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [projectStats, setProjectStats] = useState();
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

  useEffect(() => {
    dispatch(listMyProjects());
    dispatch(listMyCollabProjects());
    dispatch(listMyCollabOrgs());
  }, [dispatch]);

  let newArr =
    projects && projectsCollab && projectsOrg
      ? _.unionBy(projects, projectsCollab, projectsOrg, "_id")
      : _.unionBy(projects, projectsCollab, "_id");

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
      {c.value.split("-")[1] === "line" && (
        <div className="py-10">
          <CustomLine dataInside={dataInsideLine ? dataInsideLine : []} />
        </div>
      )}
      {c.value.split("-")[1] === "pie" && (
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
      )}
      {c.value.split("-")[1] === "area" && (
        <div className="py-10">
          <CustomAreaChart dataInside={dataInsideLine ? dataInsideLine : []} />
        </div>
      )}
      {c.value.split("-")[1] === "column" && (
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
      )}
      {c.value.split("-")[1] === "funnel" && (
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
      )}
    </>
  );
}

export default ShowChartProjects;
