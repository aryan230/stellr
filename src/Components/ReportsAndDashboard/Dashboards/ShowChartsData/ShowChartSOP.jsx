import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyProtocols } from "../../../../redux/actions/protocolActions";
import CustomLine from "../../../CustomCharts/CustomLine";
import CustomPieChart from "../../../CustomCharts/CustomPieChart";
import CustomAreaChart from "../../../CustomCharts/CustomAreaChart";
import { listMySops } from "../../../../redux/actions/sopActions";

function ShowChartSOP({ c }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [viewProtocolsAll, setProtocolsViewAll] = useState(false);

  const sopListMy = useSelector((state) => state.sopListMy);
  const { sops, loading: loadingSamples, error: errorSamples } = sopListMy;

  const [newSamples, setNewProtocols] = useState(sops && sops);
  useEffect(() => {
    dispatch(listMySops(userInfo._id));
  }, [dispatch]);

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
      {" "}
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

export default ShowChartSOP;
