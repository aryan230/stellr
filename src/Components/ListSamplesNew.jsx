import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Donut from "./Charts/Donut";
import Card from "./ui/Card";
import Button from "./ui/Button";
import GroupChart4 from "./ui/group-chart-4";
import BasicArea from "./Charts/BasicArea";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMySamples } from "../redux/actions/sampleActions";
import InsideLoader from "./Loader/InsideLoader";
import ListSampleSubject from "./ListSampleComponent/ListSampleSubject";
import ListSampleOther from "./ListSampleComponent/ListSampleOther";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import Pie from "./Charts/Pie";

function ListSamplesNew({
  setSampleContent,
  setSampleModal,
  newSample,
  setCreateNewSampleModal,
  setNewSample,
  sampleUpdate,
  setSampleUpdate,
}) {
  let width = 15000;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;

  useEffect(() => {
    dispatch(listMySamples(userInfo._id));
  }, [dispatch]);
  useEffect(() => {
    if (newSample) {
      dispatch(listMySamples(userInfo._id));
      setNewSample(false);
    }
  }, [newSample]);

  let newSamples =
    samples &&
    samples.map(
      ({ sampleId: id, data: name, createdAt: createdAt, type: type }) => ({
        id: `SAM-000${id}`,
        name: JSON.parse(name).sampleName,
        createdAt: new Date(createdAt).toLocaleString("en-GB").split(",")[0],
        type,
        createdDate: createdAt,
        createdBy: userInfo.name,
      })
    );

  return (
    <div className="project-component">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Data Registries and Management | Bio-Pharma ELN Software</title>
        <meta
          name="description"
          content="Effectively manage and maintain data registries with our specialized Bio-Pharma ELN software. Simplify data organization and accessibility."
        />
      </Helmet>
      <div className="project-component-inside">
        <div className="p-c-s-i-t">
          <h1>Sample Management</h1>
          <div className="p-c-s-i-t-left">
            <button>View All Samples</button>
            <button>Add Sample</button>
          </div>
        </div>
        <div className="p-c-s-charts">
          <div className="area-chart">
            <BasicArea newSamples={newSamples} />
          </div>

          <div className="samples-below-chart-div">
            {/* <Pie newSamples={newSamples} /> */}
            {/* <div>
              <Donut />
            </div> */}
            <DataTable
              value={newSamples && newSamples}
              tableStyle={{ minWidth: "50rem", width: "100%" }}
              paginator
              rows={4}
            >
              <Column
                field="id"
                header="ID"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="name"
                header="Name"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="type"
                header="Type"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="createdAt"
                header="Created Date"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="createdBy"
                header="Created by"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="createdAt"
                header="Created Date"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column header="View" sortable style={{ width: "25%" }}>
                <a href="">View</a>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSamplesNew;
