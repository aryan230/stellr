import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMySamples } from "../../../../redux/actions/sampleActions";
import CustomPieChart from "../../../CustomCharts/CustomPieChart";
import CustomAreaChart from "../../../CustomCharts/CustomAreaChart";
import CustomLine from "../../../CustomCharts/CustomLine";

function ShowChartSamples({ c }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [viewAllSamples, setViewAllSamples] = useState(false);
  const [filterData, setFilterData] = useState();
  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;
  const [newSamples, setNewSamples] = useState(
    samples &&
      samples.map(
        ({
          sampleId: id,
          data: name,
          createdAt: createdAt,
          type: recordType,
          updatedAt: updatedAt,
        }) => ({
          id: `SAM-000${id}`,
          name: JSON.parse(name).sampleName,
          createdAt: new Date(createdAt).toLocaleString("en-GB").split(",")[0],
          recordType,
          updatedAt: new Date(updatedAt).toLocaleString("en-GB").split(",")[0],
          createdDate: createdAt,
          createdBy: userInfo.name,
          view: "View",
        })
      )
  );

  useEffect(() => {
    dispatch(listMySamples(userInfo._id));
  }, [dispatch]);

  const labels = [
    "Subject/Patient",
    "Clinical",
    "Molecular Biology",
    "Reagent",
    "Primer",
    "Antibody",
  ];

  const subjectPatient =
    newSamples &&
    newSamples.filter((e) => e.recordType === "Subject/Patient").length;

  const Clinical =
    newSamples && newSamples.filter((e) => e.recordType === "Clinical").length;
  const MolecularBiology =
    newSamples &&
    newSamples.filter((e) => e.recordType === "Molecular Biology").length;

  const Reagent =
    newSamples && newSamples.filter((e) => e.recordType === "Reagent").length;

  const Primer =
    newSamples && newSamples.filter((e) => e.recordType === "Primer").length;

  const Antibody =
    newSamples && newSamples.filter((e) => e.recordType === "Antibody").length;
  const series = [
    subjectPatient ? subjectPatient : 0,
    Clinical ? Clinical : 0,
    MolecularBiology ? MolecularBiology : 0,
    Reagent ? Reagent : 0,
    Primer ? Primer : 0,
    Antibody ? Antibody : 0,
  ];

  const dataInsideLine = {
    name: "Samples",
    data: [
      newSamples.filter((e) => e.createdAt.split("/")[1] == "01").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "02").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "03").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "04").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "05").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "06").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "07").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "08").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "09").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "10").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "11").length,

      newSamples.filter((e) => e.createdAt.split("/")[1] == "12").length,
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

export default ShowChartSamples;
