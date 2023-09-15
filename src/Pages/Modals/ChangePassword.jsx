import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import URL from "./../../Data/data.json";
import toast, { Toaster } from "react-hot-toast";

function ChangePassword({ setChangePasswordModal }) {
  const [password, setPassword] = useState();
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [newPassswordConfirm, setNewPasswordConfirm] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const [loader, setLoader] = useState(false);
  const submitHandlerPasswordCheck = async (e) => {
    e.preventDefault();
    setLoader(true);
    var data = await JSON.stringify({
      password: password,
    });
    var config = {
      method: "post",
      url: `${URL[0]}api/users/password`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setLoader(false);
        if (response.data.password) {
          setPasswordStatus(true);
        } else {
          toast.error("Password did not match with our records");
          setPasswordStatus(false);
          setChangePasswordModal(false);
        }
      })
      .catch(function(error) {
        setLoader(false);
        console.log(error);
        setPasswordStatus(false);
        setChangePasswordModal(false);
      });
  };

  const submitHandlerPasswordNew = async (e) => {
    e.preventDefault();

    if (newPassword === newPassswordConfirm) {
      setLoader(true);
      var data = await JSON.stringify({
        password: newPassword,
      });
      var config = {
        method: "put",
        url: `${URL[0]}api/users/password`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function(response) {
          setLoader(false);
          toast.success("Passwords Changes Sucessfully");
          setChangePasswordModal(false);
        })
        .catch(function(error) {
          setLoader(false);
          console.log(error);
        });
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="modal">
      <div className="relative w-full max-w-md max-h-full">
        {/* Modal content */}
        <Toaster position="top-center" reverseOrder={true} />
        {loader ? (
          <div className="loader-div-main-stellr">
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setChangePasswordModal(false);
              }}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
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
            {passwordStatus ? (
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">
                  Enter new Password
                </h3>
                <form className="space-y-6" onSubmit={submitHandlerPasswordNew}>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required=""
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required=""
                      onChange={(e) => {
                        setNewPasswordConfirm(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            ) : (
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">
                  Enter your current password
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={submitHandlerPasswordCheck}
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password-2s"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required=""
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
