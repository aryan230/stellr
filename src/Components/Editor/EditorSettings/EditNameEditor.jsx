import React, { useState } from "react";
import BasicModalTailwind from "../../../UI/MainModals/BasicModalTailwind";
import DefaultButton from "../../../UI/Button/DefaultButton";
import InputWithLabel from "../../../UI/Input/InputWithLabel";
import { useDispatch, useSelector } from "react-redux";
import URL from "./../../../Data/data.json";
import { addEntryLogs } from "../../Functions/addEntryLogs";
import { removeFromCart } from "../../../redux/actions/cartActions";
import axios from "axios";
import MainLoaderWithText from "../../Loaders/MainLoaderWithText";
function EditNameEditor({
  open,
  setOpen,
  quill,
  tab,
  project,
  setEntryUpdate,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(tab.name);
  const [loader, setLoader] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    var data = JSON.stringify({
      name,
    });

    var config = {
      method: "put",
      url: `${URL[0]}api/entries/${tab._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(async function(response) {
        setLoader(false);
        const logObject = {
          entryId: tab._id,
          user: userInfo._id,
          userName: userInfo.name,
          userEmail: userInfo.email,
          message: `Edited the Entry With Name ${tab.name}  and id ${tab._id}`,
        };
        await addEntryLogs(logObject);
        await dispatch(removeFromCart(tab._id));
        setEntryUpdate(true);
        setWhichTabisActive("projectList");
      })
      .catch(function(error) {
        setLoader(false);
        console.log(error);
      });
  };

  return (
    <BasicModalTailwind open={open} setOpen={setOpen}>
      {loader && <MainLoaderWithText text="Saving" />}
      <form onSubmit={submitHandler} className="w-full pt-5">
        <InputWithLabel
          label="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DefaultButton label="Save" />
      </form>
    </BasicModalTailwind>
  );
}

export default EditNameEditor;
