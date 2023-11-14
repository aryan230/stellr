import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import URL from "../../Data/data.json";
import axios from "axios";
import { ArrowLeftSquare, PlusCircle } from "lucide-react";
import InputWithLabel from "../../UI/Input/InputWithLabel";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { addNotification } from "../Functions/addNotification";

function OrgSettingsModal({
  project,
  id,
  setOrgSettings,
  setSettingsModal,
  setUpdatedUserCollabRoleOrg,
  setUpdateCollabRole,
}) {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState();
  const [newRoleType, setNewRoleType] = useState();
  const [alreadyMadeRoles, setAlreadyMadeRoles] = useState();
  // const projectUpdateCollab = useSelector((state) => state.projectUpdateCollab);
  // const { project: newProject, loading, error, sucess } = projectUpdateCollab;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accessOptions = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Write",
      label: "Write",
    },
    {
      value: "Read",
      label: "Read",
    },
  ];
  const roleOptions = [
    {
      value: "Lab Member",
      label: "Lab Member",
      permissions: "Read",
    },
    {
      value: "Lab Manager",
      label: "Lab Manager",
      permissions: "Admin",
    },
    {
      value: "Data Analyst",
      label: "Data Analyst",
      permissions: "Admin",
    },
    {
      value: "Data Scientist",
      label: "Data Scientist",
      permissions: "Admin",
    },
    {
      value: "Compliance Officer",
      label: "Compliance Officer",
      permissions: "Admin",
    },
    { value: "Project Lead", label: "Project Lead", permissions: "Admin" },
    { value: "Researcher", label: "Researcher", permissions: "Admin" },
    { value: "Scientist", label: "Scientist", permissions: "Admin" },
    { value: "IT Specialist", label: "IT Specialist", permissions: "Admin" },
    { value: "Safety Officer", label: "Safety Officer", permissions: "Admin" },
    { value: "Chemist", label: "Chemist", permissions: "Write" },
    {
      value: "Field Researcher",
      label: "Field Researcher",
      permissions: "Write",
    },
    {
      value: "Quality Control Officer",
      label: "Quality Control Officer",
      permissions: "Admin",
    },
  ];

  const handleSubmitRoleMaker = async (e) => {
    e.preventDefault();
    const data = {
      orgId: project._id,
      name: newRoleName,
      permissions: newRoleType.label,
    };
    var config = {
      method: "post",
      url: `${URL}api/orgRole`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setUpdateCollabRole(true);
        setSettingsModal(false);
        setOrgSettings(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addNotification({
      id: id,
      type: "Not read",
      value: JSON.stringify({
        subject:
          "Your role has been updated to " +
          selectedRole.label +
          " by " +
          userInfo.name,
        date: new Date(),
      }),
      token: userInfo.token,
    });
    const data = {
      projectId: project._id,
      role: selectedRole.label,
      id: id,
      permissions: selectedRole.permissions,
    };
    var config = {
      method: "post",
      url: `${URL}api/organs/collab/update`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setUpdateCollabRole(true);
        setSettingsModal(false);
        setOrgSettings(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const fetchallRoles = async () => {
    var config = {
      method: "get",
      url: `${URL}api/orgRole/${project._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function(response) {
        setAlreadyMadeRoles(
          response.data.map(
            ({ name: label, name: value, permissions: permissions }) => ({
              label,
              value,
              permissions,
            })
          )
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!alreadyMadeRoles) {
      fetchallRoles();
    }
  }, [alreadyMadeRoles]);
  // useEffect(() => {
  //   if (sucess) {
  //     setUpdatedUserCollabRoleOrg(true);
  //     setProjectSettings(false);
  //     setSettingsModal(false);
  //   }
  // }, [sucess]);
  return (
    <div className="settings-modal">
      <div className="settings-modal-inside">
        <div className="top-modal">
          <button
            onClick={() => {
              setSettingsModal(false);
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
            <h1>Change your settings</h1>
          </div>
          <div className="setting-main-div-modal">
            <div className="settings-main-div-modal-inside">
              <div className="s-m-d-i-right">
                {customRole ? (
                  <form onSubmit={handleSubmitRoleMaker}>
                    {" "}
                    <InputWithLabel
                      label="Enter Name for Role"
                      onChange={(e) => setNewRoleName(e.target.value)}
                    />
                    <Select
                      options={accessOptions}
                      onChange={(e) => setNewRoleType(e)}
                      placeholder="Select Access Level"
                      required
                    />
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setCustomRole(false);
                      }}
                      className="text-indigo-600 font-karla flex items-center justify-left ml-2 mt-2"
                    >
                      <ArrowLeftSquare className="mr-2" size={16} />
                      or use default roles
                    </a>
                    <div className="margin-maker"></div>
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {" "}
                    <Select
                      options={
                        alreadyMadeRoles
                          ? roleOptions.concat(alreadyMadeRoles)
                          : roleOptions
                      }
                      onChange={(e) => setSelectedRole(e)}
                      placeholder="Select Role"
                      required
                    />
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setCustomRole(true);
                      }}
                      className="text-indigo-600 font-karla flex items-center justify-left ml-2 mt-2"
                    >
                      <PlusCircle className="mr-2" size={16} />
                      or create custom Role
                    </a>
                    {selectedRole && (
                      <>
                        <div className="margin-maker"></div>
                        <ul className="max-w-md space-y-1 text-gray-500 list-inside">
                          {selectedRole.permissions === "Admin" && (
                            <li className="flex items-center">
                              <svg
                                className="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                              </svg>
                              Admin
                            </li>
                          )}
                          {selectedRole.permissions == "Admin" && (
                            <li className="flex items-center">
                              <svg
                                className="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                              </svg>
                              Write
                            </li>
                          )}
                          {selectedRole.permissions == "Write" && (
                            <li className="flex items-center">
                              <svg
                                className="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                              </svg>
                              Write
                            </li>
                          )}

                          <li className="flex items-center">
                            <svg
                              className="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            Read
                          </li>
                        </ul>
                      </>
                    )}
                    <div className="margin-maker"></div>
                    <button type="submit">Save</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgSettingsModal;
