import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import URL from "./../../../../../Data/data.json";
import { addSampleLogs } from "../../../../Functions/addSampleLogs";
function UpdateSampleMolecular({
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
  const [sample, setSampleInside] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const sampleOptions = [
    { value: "Plasmid", label: "Plasmid" },
    { value: "Oligonucleotides", label: "Oligonucleotides" },
    { value: "shRNA", label: "shRNA" },
    { value: "cell Culture media", label: "cell Culture media" },
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
            options={sampleOptions}
            defaultValue={{
              label: data.sampleTypeInside,
              value: data.sampleTypeInside,
            }}
            onChange={(e) => setSampleInside(e.value)}
            placeholder="Sample Type"
            required
          />
        </div>{" "}
        <div className="label-input">
          {" "}
          <label htmlFor="">Date of Entry</label>
          <input
            type="date"
            name="dateOfEntry"
            onChange={handleChange}
            value={data.dateOfEntry}
          />
        </div>
        <div className="label-input">
          <label htmlFor="">Date of Expiry</label>
          <input
            type="date"
            name="dateOfExpiry"
            onChange={handleChange}
            value={data.dateOfExpiry}
          />
        </div>
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            value={data.batchNo}
            placeholder="Batch No"
            name="batchNo"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Volume (ng/L)"
            name="volume"
            value={data.volume}
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Volume remaining (ng/L)"
            name="volumeRemaining"
            value={data.volumeRemaining}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Freezer No"
            name="freezerNo"
            value={data.freezerNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Shelf No"
            name="shelfNo"
            value={data.shelfNo}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Shelf Position"
            name="shelfPosition"
            value={data.shelfPosition}
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Box No"
            name="boxNo"
            value={data.boxNo}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Position in box"
            name="positionInBox"
            value={data.positionInBox}
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Manufacturer"
            name="manufacturer"
            value={data.manufacturer}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Lot No"
            name="lotNo"
            value={data.lotNo}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          placeholder="Composition"
          name="composition"
          value={data.composition}
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

export default UpdateSampleMolecular;
