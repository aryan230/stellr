import React, { useEffect, useState } from "react";
import Select from "react-select";
import Clinical from "./Sample/Clinical";
import MolecularBiology from "./Sample/MolecularBiology";
import { createSample } from "../../redux/actions/sampleActions";
import { useDispatch, useSelector } from "react-redux";
import { SAMPLE_CREATE_RESET } from "../../redux/constants/sampleConstants";
import Subject from "./Sample/Subject";
import Reagent from "./Sample/Reagent";
import Primer from "./Sample/Primer";
import AntiBody from "./Sample/AntiBody";
import CustomRecordSample from "./Sample/CustomRecordSample";
import AddIcon from "@mui/icons-material/Add";
import CustomSampleTemplate from "./Sample/CustomSamples/CustomSampleTemplate";
import MainLoader from "../Loaders/MainLoader";
function CreateSample({
  setSampleModal,
  projects,
  setNewSample,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [sampleType, setSampleType] = useState();
  const [project, setProject] = useState(projects.length && projects[0]._id);
  const [collabs, setCollabs] = useState();
  const [data, setData] = useState();
  const [customSample, setCustomSample] = useState(false);
  const sampleCreate = useSelector((state) => state.sampleCreate);
  const { loading, error, sucess, sample } = sampleCreate;
  const options = [
    {
      value: "Subject/Patient",
      label: "Subject/Patient",
    },
    {
      value: "Clinical",
      label: "Clinical",
    },
    {
      value: "Molecular Biology",
      label: "Molecular Biology",
    },
    {
      value: "Reagent",
      label: "Reagent",
    },
    {
      value: "Primer",
      label: "Primer",
    },
    {
      value: "Antibody",
      label: "Antibody",
    },
  ];
  const optionsValue = projects.map(({ _id: value, name: label }) => ({
    value,
    label,
  }));
  useEffect(() => {
    if (project) {
      const find = projects.find((e) => e._id == project.value);
      if (find && find.collaborators) {
        if (find.collaborators.length > 0) {
          const findArr = find.collaborators.map(
            ({ user: value, userName: label }) => ({
              value,
              label,
            })
          );
          setCollabs(findArr);
        }
      }
    }
  }, [project]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({});
    const taskObject = {
      type: sampleType,
      data,
      assigned: {},
    };
    await dispatch(createSample(taskObject));
    await dispatch({ type: SAMPLE_CREATE_RESET });
  };

  useEffect(() => {
    if (sucess) {
      setSampleModal(false);
    }
  }, [sucess]);
  return (
    <div className="modal">
      {customSample && (
        <CustomSampleTemplate setCustomSample={setCustomSample} />
      )}
      <div className="modal-inside">
        {/* <MainLoader /> */}
        <div className="top-modal top-0 sticky">
          <button
            onClick={() => {
              setSampleModal(false);
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
        <>
          {" "}
          <h1>Sample Management</h1>
          <div className="form-element">
            <Select
              options={options}
              onChange={(e) => setSampleType(e)}
              placeholder="Select Record Type"
              required
            />
            <div className="margin-maker"></div>
            {/* <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setCustomSample(true);
              }}
              className="text-indigo-600 font-karla flex items-center justify-center"
            >
              <AddIcon sx={{ width: 15, marginRight: 0.5 }} />
              or create custom sample
            </a> */}
            <div className="margin-maker"></div>
            {sampleType && sampleType.value === "Create custom Record" && (
              <CustomRecordSample
                projects={projects}
                setSampleModal={setSampleModal}
                sampleType={sampleType}
                setNewSample={setNewSample}
                setWhichTabisActive={setWhichTabisActive}
              />
            )}
            {sampleType && sampleType.value === "Subject/Patient" && (
              <Subject
                projects={projects}
                setSampleModal={setSampleModal}
                sampleType={sampleType}
                setNewSample={setNewSample}
                setWhichTabisActive={setWhichTabisActive}
              />
            )}
            {sampleType && sampleType.value === "Clinical" && (
              <Clinical
                projects={projects}
                setSampleModal={setSampleModal}
                sampleType={sampleType}
                setNewSample={setNewSample}
                setWhichTabisActive={setWhichTabisActive}
              />
            )}
            {sampleType && sampleType.value === "Molecular Biology" && (
              <MolecularBiology
                projects={projects}
                setSampleModal={setSampleModal}
                sampleType={sampleType}
                setNewSample={setNewSample}
                setWhichTabisActive={setWhichTabisActive}
              />
            )}
            {sampleType && sampleType.value === "Reagent" && (
              <Reagent
                projects={projects}
                setSampleModal={setSampleModal}
                sampleType={sampleType}
                setNewSample={setNewSample}
                setWhichTabisActive={setWhichTabisActive}
              />
            )}
            {sampleType && sampleType.value === "Primer" && (
              <Primer
                projects={projects}
                setSampleModal={setSampleModal}
                sampleType={sampleType}
                setNewSample={setNewSample}
                setWhichTabisActive={setWhichTabisActive}
              />
            )}
            {sampleType && sampleType.value === "Antibody" && (
              <AntiBody
                projects={projects}
                setSampleModal={setSampleModal}
                sampleType={sampleType}
                setNewSample={setNewSample}
                setWhichTabisActive={setWhichTabisActive}
              />
            )}
          </div>
        </>
      </div>
    </div>
  );
}

export default CreateSample;
