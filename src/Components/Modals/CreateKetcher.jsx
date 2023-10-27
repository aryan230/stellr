import React, { useState } from "react";
import MainModalTailwind from "../../UI/MainModals/MainModalTailwind";
import MainLoaderWithText from "../Loaders/MainLoaderWithText";
import InputWithLabel from "../../UI/Input/InputWithLabel";
import DefaultButton from "../../UI/Button/DefaultButton";
import TextareaWithLabel from "../../UI/Input/TextareaWithLabel";
import { useSelector } from "react-redux";
import URL from "./../../Data/data.json";
import axios from "axios";
import { addToState } from "../../redux/actions/stateActions";
import { useDispatch } from "react-redux";
function CreateKetcher({
  setCreateDrawingModal,
  setWhichTabisActive,
  setCDUpdate,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [des, setDes] = useState();
  const [loader, setLoader] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    const cdObject = {
      name: name,
      description: des,
      data: [
        {
          user: userInfo._id,
          block: "",
          date: Date.now(),
        },
      ],
    };
    var data = JSON.stringify(cdObject);

    var config = {
      method: "post",
      url: `${URL}api/cd`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(async function(response) {
        setCreateDrawingModal(false);
        setCDUpdate(true);
        await dispatch(addToState("chemicalList"));
        setWhichTabisActive("chemicalList");
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log(cdObject);
  };

  return (
    <MainModalTailwind
      iconName="Biohazard"
      modalName="Create Chemical Drawing"
      setCloseModal={setCreateDrawingModal}
    >
      {loader && (
        <MainLoaderWithText text="Generating canvas for your drawing" />
      )}
      <form onSubmit={submitHandler}>
        {" "}
        <InputWithLabel
          label="Enter a name for your Drawing"
          placeholder="Drawing Name"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
        <TextareaWithLabel
          label="Enter Description for your drawing"
          placeholder="Description for your drawing"
          required={true}
          onChange={(e) => setDes(e.target.value)}
        />
        <DefaultButton label="Create New Drawing" />
      </form>
    </MainModalTailwind>
  );
}

export default CreateKetcher;
