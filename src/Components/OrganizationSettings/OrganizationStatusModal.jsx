import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import URL from "./../../Data/data.json";
import { addProtocolLogs } from "../Functions/addProtocolLogs";
import { logout } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
function OrganizationStatusModal({
  setOrgStatus,
  orgStatusContent,
  setNewCollab,
  type,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedExport, setSelectedExport] = useState({
    value: orgStatusContent.status,
    label: orgStatusContent.status,
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
    // localStorage.removeItem("stellrStatusUpdate");
    // localStorage.removeItem("stellrStatusUpdateData");
    var data = await JSON.stringify({
      status: selectedExport.value,
      userName: userInfo.name,
      statusMessage: statusMessage,
    });

    const logData = await JSON.stringify({
      entryId: orgStatusContent._id,
      user: userInfo._id,
      userName: userInfo.name,
      userEmail: userInfo.email,
      message: `The status of the entity was changed to ${selectedExport.value} with the message ${statusMessage}.`,
    });

    const finalData = await JSON.stringify({
      sendData: data,
      logData: logData,
      type: type,
      user: userInfo._id,
    });
    await localStorage.setItem("stellrStatusUpdate", true);
    await localStorage.setItem("stellrStatusUpdateData", finalData);

    dispatch(logout());
    navigate("/login");

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
    <div className="settings-modal">
      <div className="settings-modal-inside">
        <div className="top-modal">
          <button
            onClick={() => {
              setOrgStatus(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <path
                d="M28.2838 15.7712L22.6269 21.4281L16.9701 15.7712C16.72 15.5212 16.3809 15.3807 16.0273 15.3807C15.6737 15.3807 15.3345 15.5212 15.0845 15.7712C14.8344 16.0213 14.6939 16.3604 14.6939 16.714C14.6939 17.0676 14.8344 17.4068 15.0845 17.6568L20.7413 23.3137L15.0845 28.9705C14.8344 29.2206 14.6939 29.5597 14.6939 29.9134C14.6939 30.267 14.8344 30.6061 15.0845 30.8562C15.3345 31.1062 15.6737 31.2467 16.0273 31.2467C16.3809 31.2467 16.72 31.1062 16.9701 30.8562L22.6269 25.1993L28.2838 30.8562C28.5338 31.1062 28.873 31.2467 29.2266 31.2467C29.5802 31.2467 29.9194 31.1062 30.1694 30.8562C30.4195 30.6061 30.5599 30.267 30.5599 29.9134C30.5599 29.5597 30.4195 29.2206 30.1694 28.9705L24.5126 23.3137L30.1694 17.6568C30.4195 17.4068 30.5599 17.0676 30.5599 16.714C30.5599 16.3604 30.4195 16.0213 30.1694 15.7712C29.9194 15.5212 29.5802 15.3807 29.2266 15.3807C28.873 15.3807 28.5338 15.5212 28.2838 15.7712Z"
                fill="#8F8585"
              />
            </svg>
          </button>
        </div>
        <div className="settings-top-modal-top">
          <div className="setting-top-modal-header">
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
          </div>
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
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationStatusModal;
