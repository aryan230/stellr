import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createSample } from "../../../redux/actions/sampleActions";
import { SAMPLE_CREATE_RESET } from "../../../redux/constants/sampleConstants";
function Subject({
  projects,
  setSampleModal,
  sampleType,
  setNewSample,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [project, setProject] = useState(projects.length && projects[0]._id);
  const [data, setDetails] = useState({
    sampleName: "",
    gender: "",
    testRequest: "",
    dateOfBirth: "",
    contactInformation: "",
    testResult: "",
    medicalHistory: "",
    physicianInformation: "",
    comments: "",
  });

  const sampleCreate = useSelector((state) => state.sampleCreate);
  const { loading, error, sucess, sample } = sampleCreate;

  const optionsValue = projects.map(({ _id: value, name: label }) => ({
    value,
    label,
  }));

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = JSON.stringify(data);
    const taskObject = {
      type: sampleType.value,
      data: newData,
      assigned: {},
    };
    console.log(taskObject);
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
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Sample Name"
            required
            name="sampleName"
            onChange={handleChange}
          />
          <Select
            options={genderOptions}
            onChange={(e) =>
              setDetails((prev) => {
                return { ...prev, gender: e.value };
              })
            }
            placeholder="Select Gender"
            name="gender"
            required
          />
        </div>{" "}
        {/* <Select
          options={optionsValue}
          onChange={(e) => setProject(e.value)}
          placeholder="Select Project"
          required
          name="recordType"
        /> */}{" "}
        <input
          type="text"
          placeholder="Test Request"
          name="testRequest"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <div className="label-input">
          <label htmlFor="">Enter Date of Birth</label>
          <input
            type="date"
            placeholder="Sample Name"
            name="dateOfBirth"
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Contact information"
            name="contactInformation"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Test Result"
            name="testResult"
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          {" "}
          <textarea
            type="text"
            placeholder="Medical history"
            name="medicalHistory"
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="Physician information"
            name="physicianInformation"
            onChange={handleChange}
          />
        </div>
        <textarea
          type="text"
          placeholder="Interpretation and Comments"
          name="comments"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Subject;
