import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyProtocols } from "../../../../redux/actions/protocolActions";
import CustomLine from "../../../CustomCharts/CustomLine";
import CustomPieChart from "../../../CustomCharts/CustomPieChart";
import CustomAreaChart from "../../../CustomCharts/CustomAreaChart";

function ShowChartProtocols({ c }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [viewProtocolsAll, setProtocolsViewAll] = useState(false);
  const protocolListMy = useSelector((state) => state.protocolListMy);
  const {
    protocols,
    loading: loadingSamples,
    error: errorSamples,
  } = protocolListMy;

  const [newSamples, setNewProtocols] = useState(protocols && protocols);
  useEffect(() => {
    dispatch(listMyProtocols(userInfo._id));
  }, [dispatch]);

  let basic =
    newSamples &&
    newSamples.filter(
      (e) => e.data && Object.entries(JSON.parse(e.data)).length === 6
    ).length;

  let inter =
    newSamples &&
    newSamples.filter((e) => e.data && e.hasOwnProperty("file")).length;

  let comp = newSamples && newSamples.length - basic - inter;

  const series = [basic, inter ? inter : 0, comp ? comp : 0];

  const labels = [
    "Basic Protocols",
    "Comprehensive Protocols",
    "Interactive  Protocols",
  ];

  const dataInsideLine = {
    name: "Protocols",
    data: [
      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "01").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "02").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "03").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "04").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "05").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "06").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "07").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "08").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "09").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "10").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "11").length,

      newSamples &&
        newSamples.filter((e) => e.createdAt.split("-")[1] == "12").length,
    ],
  };

  return (
    <>
      {c.value.split("-")[1] === "line" && (
        <div className="py-10">
          <CustomLine dataInside={dataInsideLine ? dataInsideLine : []} />
        </div>
      )}
      {c.value.split("-")[1] === "pie" && (
        <div className="py-10">
          <CustomPieChart labels={labels} seriesData={series} />
        </div>
      )}
      {c.value.split("-")[1] === "area" && (
        <div className="py-10">
          <CustomAreaChart dataInside={dataInsideLine ? dataInsideLine : []} />
        </div>
      )}
    </>
  );
}

export default ShowChartProtocols;
