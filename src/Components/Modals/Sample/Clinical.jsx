import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createSample } from "../../../redux/actions/sampleActions";
import { SAMPLE_CREATE_RESET } from "../../../redux/constants/sampleConstants";
function Clinical({
  projects,
  setSampleModal,
  sampleType,
  setNewSample,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [project, setProject] = useState(projects.length && projects[0]._id);
  const [collabs, setCollabs] = useState();
  const [sample, setSomeSample] = useState();
  const [assigned, setAssigned] = useState();

  const [data, setDetails] = useState({
    sampleName: "",
    sampleTypeInside: "",
    volume: "",
    freezerNo: "",
    shelfNo: "",
    shelfPosition: "",
    volumeRemaining: "",
    dateOfCollection: "",
    boxNo: "",
    positionInBox: "",
    manufacturer: "",
    lotNo: "",
    composition: "",
  });

  const optionsValue = projects.map(({ _id: value, name: label }) => ({
    value,
    label,
  }));

  const sampleCreate = useSelector((state) => state.sampleCreate);
  const { loading, error, sucess, sample: sampleCreated } = sampleCreate;

  const sampleOptions = [
    { value: "Plasma", label: "Plasma" },
    { value: "Serum", label: "Serum" },
    { value: "Saliva", label: "Saliva" },
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
            options={sampleOptions}
            onChange={(e) => setSomeSample(e.value)}
            placeholder="Sample Type"
            required
          />
        </div>{" "}
        {/* <Select
          options={optionsValue}
          onChange={(e) => setProject(e.value)}
          placeholder="Select Project"
          required
        /> */}
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Volume (ng/L)"
            name="volume"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Freezer No"
            name="freezerNo"
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          {" "}
          <input
            type="text"
            placeholder="Shelf No"
            name="shelfNo"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Shelf position"
            name="shelfPosition"
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          placeholder="Volume remaining (ng/L)"
          name="volumeRemaining"
          onChange={handleChange}
        />
        <div className="label-input">
          <label htmlFor="">Set date of collection</label>
          <input
            type="date"
            placeholder="Date of collection"
            name="dateOfCollection"
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Box No"
            name="boxNo"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Position in box"
            name="positionInBox"
            onChange={handleChange}
          />
        </div>
        <div className="form-inside-divider">
          <input
            type="text"
            placeholder="Manufacturer"
            name="manufacturer"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Lot No"
            name="lotNo"
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          placeholder="Composition"
          name="composition"
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

export default Clinical;
