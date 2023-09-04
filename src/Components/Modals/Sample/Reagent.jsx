import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createSample } from "../../../redux/actions/sampleActions";
import { SAMPLE_CREATE_RESET } from "../../../redux/constants/sampleConstants";
function Reagent({
  projects,
  setSampleModal,
  sampleType,
  setNewSample,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [sample, setSampleInside] = useState();
  const [project, setProject] = useState(projects.length && projects[0]._id);
  const [assigned, setAssigned] = useState();
  const [collabs, setCollabs] = useState();
  const [data, setDetails] = useState({
    sampleName: "",
    manufacturer: "",
    batchNo: "",
    dateOfReceipt: "",
    dateOfExpiry: "",
    storageConditions: "",
    quantityReceived: "",
    currentQuantity: "",
    usedInExperiments: "",
    riskAndSafetyInformation: "",
    preparationInstructions: "",
    comments: "",
  });

  const sampleCreate = useSelector((state) => state.sampleCreate);
  const { loading, error, sucess, sample: sampleCreated } = sampleCreate;

  const optionsValue = projects.map(({ _id: value, name: label }) => ({
    value,
    label,
  }));
  const sampleOptions = [
    { value: "Plasmid", label: "Plasmid" },
    { value: "Oligonucleotides", label: "Oligonucleotides" },
    { value: "shRNA", label: "shRNA" },
    { value: "cell Culture media", label: "cell Culture media" },
  ];

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (project) {
      const find = projects.find((e) => e._id == project);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.sampleTypeInside = sample;
    const newData = JSON.stringify(data);
    const taskObject = {
      type: sampleType.value,
      data: newData,
      assigned: {},
    };
    await dispatch(createSample(taskObject));
    await dispatch({ type: SAMPLE_CREATE_RESET });
  };
  useEffect(() => {
    if (sucess) {
      setNewSample(true);
      setWhichTabisActive("sampleList");
      setSampleModal(false);
    }
  }, [sucess]);

  return (
    <div className="forms-inside-div">
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          placeholder="Sample Name"
          required
          name="sampleName"
          onChange={handleChange}
        />
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Manufacturer Name"
            name="manufacturer"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Batch No"
            name="batchNo"
            onChange={handleChange}
          />
        </div>
        <div className="label-input">
          {" "}
          <label htmlFor="">Date of Receipt</label>
          <input type="date" name="dateOfReceipt" onChange={handleChange} />
        </div>
        <div className="label-input">
          <label htmlFor="">Date of Expiry</label>
          <input type="date" name="dateOfExpiry" onChange={handleChange} />
        </div>
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Storage Conditions"
            name="storageConditions"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Quantity Received"
            name="quantityReceived"
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Current Quantity"
            name="currentQuantity"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Used In Experiments"
            name="usedInExperiments"
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Risk and Safety Information"
            name="riskAndSafetyInformation"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Preperation Instructions"
            name="preparationInstructions"
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          placeholder="Comments"
          name="comments"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        {/* <Select
          isMulti
          options={collabs}
          onChange={(e) => setAssigned(e)}
          placeholder="Record entered by"
          className="basic-multi-select"
          classNamePrefix="select"
          required
        /> */}
        <div className="margin-maker"></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Reagent;
