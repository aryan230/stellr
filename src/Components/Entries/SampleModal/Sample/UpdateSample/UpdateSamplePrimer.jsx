import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import URL from "./../../../../../Data/data.json";
import { addSampleLogs } from "../../../../Functions/addSampleLogs";
function UpdateSamplePrimer({
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
  const [sample, setSomeSample] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const sampleOptions = [
    { value: "Plasma", label: "Plasma" },
    { value: "Serum", label: "Serum" },
    { value: "Saliva", label: "Saliva" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.sampleTypeInside = sample;
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
        <input
          type="text"
          placeholder="Sample Name"
          required
          value={data.sampleName}
          name="sampleName"
          onChange={handleChange}
        />
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Primer Sequence"
            name="primerSequence"
            value={data.primerSequence}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Melting Temperature"
            name="meltingTemperature"
            value={data.meltingTemperature}
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Manufacturer Name"
            name="manufacturer"
            value={data.manufacturer}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Concentration"
            name="concentration"
            value={data.concentration}
            onChange={handleChange}
          />
        </div>
        <div className="label-input">
          {" "}
          <label htmlFor="">Date of Synthesis</label>
          <input
            type="date"
            name="dateOfSynthesis"
            onChange={handleChange}
            value={data.dateOfSynthesis}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Storage Conditions"
            name="storageConditions"
            onChange={handleChange}
            value={data.storageConditions}
          />
          <input
            type="text"
            placeholder="Associated Genes/Targets"
            name="associatedGenes"
            onChange={handleChange}
            value={data.associatedGenes}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Experiments Used In"
            name="experimentsUsedIn"
            onChange={handleChange}
            value={data.experimentsUsedIn}
          />
          <input
            type="text"
            placeholder="Purification Methods"
            name="purificationMethod"
            onChange={handleChange}
            value={data.purificationMethod}
          />
        </div>
        <input
          type="text"
          placeholder="Dilution Information"
          name="dilutionInformation"
          onChange={handleChange}
          value={data.dilutionInformation}
        />
        <input
          type="text"
          placeholder="Comments"
          name="comments"
          onChange={handleChange}
          value={data.comments}
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

export default UpdateSamplePrimer;
