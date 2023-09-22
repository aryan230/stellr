import React, { useEffect, useState } from "react";
import URL from "./../../../Data/data.json";
import axios from "axios";
import { useSelector } from "react-redux";
import ActiveModal from "./ActiveModal";
function EditDashboard({
  setEditDashboard,
  editDashboardData,
  setViewAllDash,
  setNewDash,
  data,
}) {
  const [name, setName] = useState(editDashboardData && editDashboardData.name);
  const [activeStatusModal, setActiveStatusModal] = useState(false);
  const [description, setDescription] = useState(
    editDashboardData && editDashboardData.description
  );
  const [selectedData, setSelectedData] = useState([]);
  const [active, setActive] = useState(
    editDashboardData && editDashboardData.active === "true" ? true : false
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    var data = await JSON.stringify({
      name,
      description,
      active: active ? "true" : "false",
    });
    var config = {
      method: "put",
      url: `${URL[0]}api/dashboards/${editDashboardData._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data);
        setEditDashboard(false);
        setViewAllDash(false);
        setNewDash(true);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(data);
  };

  const handleChangeStatus = async (e) => {
    if (data) {
      let activeDash = data.find((item) => item.active === "true");
      if (activeDash && activeDash._id != editDashboardData._id) {
        setActiveStatusModal(true);
      } else {
        setActive(e);
      }
    }
  };

  return (
    <div>
      {activeStatusModal && (
        <ActiveModal
          data={data}
          editDashboardData={editDashboardData}
          setActiveStatusModal={setActiveStatusModal}
        />
      )}
      <div className="pb-10">
        <button
          onClick={(e) => {
            setEditDashboard(false);
          }}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Go Back
        </button>
      </div>
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Dashboard#ID
        </label>
        <input
          type="text"
          id="default-input"
          value={editDashboardData && editDashboardData._id}
          disabled
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Enter name for dashboard
        </label>
        <input
          type="text"
          id="default-input"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Dashboard Description
        </label>
        <textarea
          id="message"
          rows={4}
          value={description}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write here..."
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={""}
        />
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={active}
          className="sr-only peer"
          onChange={(e) => {
            handleChangeStatus(e.target.checked);
          }}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
        <span className="ml-3 text-sm font-medium text-gray-900">
          Toggle the status of the dashboard. (Active/Disabled)
        </span>
      </label>
      <div className="py-10">
        {" "}
        <button
          type="button"
          onClick={submitHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-[30%]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditDashboard;
