import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createSample } from "../../../redux/actions/sampleActions";
import { SAMPLE_CREATE_RESET } from "../../../redux/constants/sampleConstants";
import ButtonGroupSample from "../../../UI/Button/ButtonGroupSample";
import InputWithLabel from "../../../UI/Input/InputWithLabel";
import DatePickerCustom from "../../../UI/Input/DatePickerCustom";
import DefaultButton from "../../../UI/Button/DefaultButton";
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

  const handleChangeInside = async (name, value) => {
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
        <InputWithLabel
          label="Sample Name"
          placeholder="Sample Name"
          required
          name="sampleName"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <Select
          options={sampleOptions}
          onChange={(e) => setSomeSample(e.value)}
          placeholder="Sample Type"
          required
        />
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Volume"
          name="volume"
          onChange={handleChange}
          value={data.volume}
        />
        <div className="margin-maker"></div>
        <ButtonGroupSample
          name="volume"
          currentValue={data}
          changeFunction={handleChangeInside}
          buttonData={{
            name: "Volume",
            buttons: ["ng/L", "mL", "L"],
          }}
        />
        <div className="margin-maker"></div>
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Freezer No"
          name="freezerNo"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Shelf No"
          name="shelfNo"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Shelf position"
          name="shelfPosition"
          onChange={handleChange}
        />
        {/* <div className="form-inside-divider">
          {" "}
          <input type="text" />
          <input
            type="text"
            placeholder="Freezer No"
            name="freezerNo"
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="form-inside-divider">
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
        </div> */}
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Volume remaining"
          name="volumeRemaining"
          onChange={handleChange}
          value={data.volumeRemaining}
        />
        <div className="margin-maker"></div>
        <ButtonGroupSample
          name="volumeRemaining"
          currentValue={data}
          changeFunction={handleChangeInside}
          buttonData={{
            name: "Volume",
            buttons: ["ng/L", "mL", "L"],
          }}
        />
        {/* <input
          type="text"
          placeholder="Volume remaining (ng/L)"
          name="volumeRemaining"
          onChange={handleChange}
        /> */}
        <div className="margin-maker"></div>
        <DatePickerCustom
          placeholder="Date of collection"
          name="dateOfCollection"
          onChange={handleChange}
        />
        {/* <div className="margin-maker"></div>
        <DatePickerCustom
          placeholder="Date of collection"
          name="dateOfCollection"
          onChange={handleChange}
        /> */}
        {/* <div className="label-input">
          <label htmlFor="">Set date of collection</label>
          <input
            type="date"
            placeholder="Date of collection"
            name="dateOfCollection"
            onChange={handleChange}
          />
        </div> */}
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Box No"
          name="boxNo"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Position in box"
          name="positionInBox"
          onChange={handleChange}
        />

        {/* <div className="form-inside-divider">
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
        </div> */}
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Manufacturer"
          name="manufacturer"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Lot No"
          name="lotNo"
          onChange={handleChange}
        />
        <div className="margin-maker"></div>
        <InputWithLabel
          placeholder="Composition"
          name="composition"
          onChange={handleChange}
        />
        {/* <div className="form-inside-divider">
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
        /> */}
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
        <DefaultButton label="Create New Sample" />
      </form>
    </div>
  );
}

export default Clinical;
