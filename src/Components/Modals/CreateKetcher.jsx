import React, { useState } from "react";
import MainModalTailwind from "../../UI/MainModals/MainModalTailwind";
import MainLoaderWithText from "../Loaders/MainLoaderWithText";
import InputWithLabel from "../../UI/Input/InputWithLabel";
import DefaultButton from "../../UI/Button/DefaultButton";
import TextareaWithLabel from "../../UI/Input/TextareaWithLabel";

function CreateKetcher({ setCreateDrawingModal }) {
  const [name, setName] = useState();
  const [des, setDes] = useState();
  const [loader, setLoader] = useState(false);
  const submitHandler = async () => {};
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
