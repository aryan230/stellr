import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import URL from "./../../../../../Data/data.json";
import { addSampleLogs } from "../../../../Functions/addSampleLogs";
function UpdateSampleSubject({
  doc,
  insideData,
  setSampleModal,
  setWhichTabisActive,
  setSampleUpdate,
  setIsDrawerOpen,
  type,
}) {
  const dispatch = useDispatch();
  const [data, setDetails] = useState(insideData);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    var Newdata = JSON.stringify({ data: JSON.stringify(data) });
    var config = {
      method: "put",
      url: `${URL[0]}api/samples/${doc._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: Newdata,
    };

    axios(config)
      .then(async function(response) {
        const logObject = {
          entryId: doc._id,
          user: userInfo._id,
          userName: userInfo.name,
          userEmail: userInfo.email,
          message: `Updated the sample with the id ${doc._id}`,
        };
        await addSampleLogs(logObject);
        setSampleUpdate(true);
        setSampleModal(false);
        setWhichTabisActive("sampleList");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

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
            value={data.sampleName}
            onChange={handleChange}
          />
          <Select
            options={genderOptions}
            onChange={(e) =>
              setDetails((prev) => {
                return { ...prev, gender: e.value };
              })
            }
            defaultValue={{
              label: data.gender,
              value: data.gender,
            }}
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
          value={data.testRequest}
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <div className="label-input">
          <label htmlFor="">Enter Date of Birth</label>
          <input
            type="date"
            placeholder="Sample Name"
            name="dateOfBirth"
            value={data.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Contact information"
            name="contactInformation"
            value={data.contactInformation}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Test Result"
            name="testResult"
            value={data.testResult}
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          {" "}
          <textarea
            type="text"
            placeholder="Medical history"
            name="medicalHistory"
            value={data.medicalHistory}
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="Physician information"
            name="physicianInformation"
            value={data.physicianInformation}
            onChange={handleChange}
          />
        </div>
        <textarea
          type="text"
          placeholder="Interpretation and Comments"
          name="comments"
          value={data.comments}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateSampleSubject;
