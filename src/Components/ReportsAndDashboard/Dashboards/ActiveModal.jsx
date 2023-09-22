import React, { useState } from "react";
import { useSelector } from "react-redux";
import URL from "./../../../Data/data.json";
import axios from "axios";

function ActiveModal({ setActiveStatusModal, editDashboardData, data }) {
  let [activeDash, setActiveDash] = useState(
    data && data.find((item) => item.active === "true")
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    var data = await JSON.stringify({
      active: "false",
    });
    var config = {
      method: "put",
      url: `${URL[0]}api/dashboards/${activeDash._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data);
        setActiveStatusModal(false);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(data);
  };

  return (
    <div className="modal">
      <div className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Active dashboard already exists
            </h3>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveStatusModal(false);
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="defaultModal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500">
              There is an already exisiting active dashboard with name{" "}
              {activeDash.name}.
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              Would you like to continue to use this dashboard as an active
              dashboard and remove {activeDash.name} from active dashboards?
            </p>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button
              onClick={submitHandler}
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Continue
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveStatusModal(false);
              }}
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveModal;
