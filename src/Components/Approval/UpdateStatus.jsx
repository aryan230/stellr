import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import URL from "./../../Data/data.json";
import { addProtocolLogs } from "../Functions/addProtocolLogs";
import { logout } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import BasicModalTailwind from "../../UI/MainModals/BasicModalTailwind";
import DefaultButton from "../../UI/Button/DefaultButton";

function UpdateStatus({ open, setOpen, data: dataValue, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedExport, setSelectedExport] = useState({
    value: dataValue.status,
    label: dataValue.status,
  });
  const [statusMessage, setStatusMessage] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  {
    /* /Draft, In Progress, Approved, Rejected */
  }

  const roleOptions = [
    {
      label: "Draft",
      value: "Draft",
    },
    {
      label: "In Progress",
      value: "In Progress",
    },
    {
      value: "Approved",
      label: "Approved",
    },
    {
      value: "Rejected",
      label: "Rejected",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataValue._id) {
      localStorage.removeItem("stellrStatusUpdate");
      localStorage.removeItem("stellrStatusUpdateData");
      var data = await JSON.stringify({
        status: selectedExport.value,
        userName: userInfo.name,
        statusMessage: statusMessage,
      });

      const logData = await JSON.stringify({
        user: userInfo._id,
        entryId: dataValue._id,
        userName: userInfo.name,
        userEmail: userInfo.email,
        message: `The status of the entity '${dataValue.name}' was changed to ${selectedExport.value} with the message ${statusMessage} by ${userInfo.name}.`,
      });

      const finalData = await JSON.stringify({
        sendData: data,
        logData: logData,
        type: type,
        user: userInfo._id,
        to: dataValue.user,
      });
      await localStorage.setItem("stellrStatusUpdate", true);
      await localStorage.setItem("stellrStatusUpdateData", finalData);

      dispatch(logout());
      navigate("/login");
    }

    // var config = {
    //   method: "put",
    //   url: `${URL}api/protocols/status/${orgStatusContent._id}`,
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios(config)
    //   .then(async function(response) {
    //     console.log(response.data);

    //     await addProtocolLogs(logData);
    //     setNewCollab(true);
    //     setOrgStatus(false);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };
  return (
    <BasicModalTailwind open={open} setOpen={setOpen}>
      {" "}
      <div className="settings-top-modal-top">
        {/* <div className="setting-top-modal-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M14.375 12.5L14.375 3.75L3.75 3.75L3.75 12.5L14.375 12.5Z"
              fill="white"
              stroke="black"
              stroke-opacity="0.65"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M26.25 26.25V17.5L15.625 17.5L15.625 26.25H26.25Z"
              fill="white"
              stroke="black"
              stroke-opacity="0.65"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M19.375 3.75V12.5H26.25V3.75H19.375Z"
              fill="white"
              stroke="black"
              stroke-opacity="0.65"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M3.75 17.5L3.75 26.25H10.625V17.5H3.75Z"
              fill="white"
              stroke="black"
              stroke-opacity="0.65"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
          <h1>Change Status</h1>
        </div> */}
        <div className="setting-main-div-modal">
          <div className="settings-main-div-modal-inside">
            <div className="s-m-d-i-right">
              <form onSubmit={handleSubmit}>
                {" "}
                <Select
                  value={selectedExport}
                  options={roleOptions}
                  onChange={(e) => setSelectedExport(e)}
                  placeholder="Select Status"
                  required
                />
                <div className="margin-maker"></div>
                <>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your message here..."
                    defaultValue={""}
                    onChange={(e) => {
                      setStatusMessage(e.target.value);
                    }}
                  />
                </>
                <div className="margin-maker"></div>
                <DefaultButton label="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </BasicModalTailwind>
  );
}

export default UpdateStatus;
