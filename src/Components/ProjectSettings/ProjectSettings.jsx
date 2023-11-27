import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Chip, Drawer, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCollabProject } from "../../redux/actions/projectActions";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { PROJECT_CREATE_COLLAB_RESET } from "../../redux/constants/projectConstants";
import URL from "../../Data/data.json";
import Select from "react-select";
import EditIcon from "@mui/icons-material/Edit";
import SettingsModal from "../Settings/SettingsModal";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import ProjectLog from "./ProjectLog";
import DrawerEditProject from "./DrawerEditProject";
import { Disclosure, Menu, RadioGroup, Transition } from "@headlessui/react";
import { HomeIcon, PlusIcon, SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsideLoader from "../Loader/InsideLoader";
import { userRoleExtract } from "../Functions/userRoleFunction";
import { addProjectLogs } from "../Functions/addProjectLogs";
import LoaderInside from "../../css/utils/LoaderInside";
import { addNotification } from "../Functions/addNotification";
import ProjectSettingsNew from "./ProjectSettingsNew";

function ProjectSettings({
  setProjectSettings,
  project,
  setNewCollab,
  setProjectUpdatedProfilers,
  setUpdatedUserCollabRole,
  userType,
}) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState();
  const [settingsModal, setSettingsModal] = useState(false);
  const [updateUserId, setUpdateUserId] = useState();
  const [updatedUserEmail, setUpdatedUserEmail] = useState();
  const [updatedUser, setUpdatedUser] = useState(false);
  const [viewLogs, setViewLogs] = useState(false);
  const [data, setData] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState();
  const [ownerUserData, setOwnerUserData] = useState();
  const [loader, setLoader] = useState(false);

  const projectCollabCreate = useSelector((state) => state.projectCollabCreate);
  let { loading, error, project: newProject, sucess } = projectCollabCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fetchFirestoreData = async () => {
    // const unsub = onSnapshot(doc(db, "logs", project._id), (doc) => {
    //   if (doc.data()) {
    //     const dataValue = doc.data().data;
    //     setData(dataValue);
    //     console.log(dataValue);
    //   } else {
    //     setData(null);
    //   }
    // });
  };

  const ownerUser = async () => {
    var config = {
      method: "get",
      url: `${URL}api/users/${project.user}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(async function(response) {
        if (response) {
          setOwnerUserData(response.data);
        } else {
          toast.error("No user found for that email.");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getUserData = async (id) => {
    var config = {
      method: "get",
      url: `${URL}api/users/${id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(async function(response) {
        if (response) {
          return response.data;
        } else {
          toast.error("No user found for that email.");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!ownerUserData) {
      ownerUser();
    }
  }, [ownerUserData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (email.slice(0, 3) === "ORG") {
      var data = JSON.stringify({
        projectId: project._id,
        organizationId: email.split("-")[1],
      });

      var config = {
        method: "post",
        url: `${URL}api/projects/org`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(async function(response) {
          if (response) {
            const logObject = {
              entryId: project._id,
              user: userInfo._id,
              userName: userInfo.name,
              userEmail: userInfo.email,
              message: `Added the Organization With  ${email}`,
            };
            await addProjectLogs(logObject);
            setNewCollab(true);
            setProjectSettings(false);
            setLoader(false);
          } else {
            setLoader(false);
            toast.error("No user found for that email.");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("I am here");
      var data = JSON.stringify({
        email: `${email}`,
      });

      var config = {
        method: "post",
        url: `${URL}api/users/email`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(async function(response) {
          if (response.data.length > 0) {
            console.log(response.data);
            const logObject = {
              entryId: project._id,
              user: userInfo._id,
              userName: userInfo.name,
              userEmail: userInfo.email,
              message: `Added the user With  ${email}`,
            };
            await addProjectLogs(logObject);
            await addNotification({
              id: response.data[0]._id,
              type: "Not read",
              value: JSON.stringify({
                subject:
                  "You have been added to a new project with name" +
                  project.name +
                  " by " +
                  userInfo.name,
                date: new Date(),
              }),
              token: userInfo.token,
            });
            await dispatch(
              createCollabProject({
                projectId: project._id,
                collabDetails: {
                  user: response.data[0]._id,
                  userName: response.data[0].name ? response.data[0].name : "",
                },
                userEmail: response.data[0].email,
              })
            );
            await dispatch({
              type: PROJECT_CREATE_COLLAB_RESET,
            });
            setLoader(false);
          } else {
            setLoader(false);
            toast.error("No user found for that email.");
          }
        })
        .catch(function(error) {
          toast.error(error.message);
          setLoader(false);
        });
    }
  };

  const deleteHandlerCollab = async (id, email) => {
    setLoader(true);
    var data = JSON.stringify({
      projectId: project._id,
      collabDetails: {
        user: id,
      },
    });

    var config = {
      method: "delete",
      url: `${URL}api/projects/collab`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(async function(response) {
        if (response) {
          const logObject = {
            entryId: project._id,
            user: userInfo._id,
            userName: userInfo.name,
            userEmail: userInfo.email,
            message: `Removed the user With  ${email}  and id ${id}`,
          };
          await addNotification({
            id: id,
            type: "Not read",
            value: JSON.stringify({
              subject:
                "You have been removed from the project with name " +
                project.name +
                " by " +
                userInfo.name,
              date: new Date(),
            }),
            token: userInfo.token,
          });
          await addProjectLogs(logObject);
          setNewCollab(true);
          setProjectSettings(false);
          setLoader(false);
          toast.success("User Sucessfully deleted.");
        } else {
          setLoader(false);
          toast.error("No user found for that email.");
        }
      })
      .catch(function(error) {
        setLoader(false);
        toast.error(error.message);
      });
  };
  const getUserRole = async (userRole) => {
    console.log(userRole);
    const newRole = await userRoleExtract(userRole);
    setUserRole(newRole);
  };
  useEffect(() => {
    if (sucess) {
      setNewCollab(true);
      setProjectSettings(false);
    }
    if (error) {
      toast.error("There was some error");
      console.log(error);
    }
  }, [sucess, error]);

  useEffect(() => {
    if (!data) {
      fetchFirestoreData();
    }
  }, [data]);

  useEffect(() => {
    if (userType) {
      if (!userRole) {
        getUserRole(userType);
      }
    }
  }, [userRole, userType]);

  return (
    <div className="modal">
      {settingsModal && (
        <SettingsModal
          setProjectSettings={setProjectSettings}
          setSettingsModal={setSettingsModal}
          project={project}
          id={updateUserId}
          email={updatedUserEmail}
          setUpdatedUserCollabRole={setUpdatedUserCollabRole}
        />
      )}
      {loader ? (
        <div className="project-settings">
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
        </div>
      ) : (
        <div className="project-settings">
          <Toaster position="top-center" reverseOrder={true} />
          <div className="top-modal">
            <button
              onClick={(e) => {
                setProjectSettings(false);
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
          {userRole ? (
            <div className="project-main">
              {viewLogs ? (
                <div className="project-main-inside">
                  <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                  >
                    <Box width="500px" p={2} role="presentation">
                      <DrawerEditProject
                        project={project}
                        setIsDrawerOpen={setIsDrawerOpen}
                        setProjectUpdatedProfilers={setProjectUpdatedProfilers}
                      />
                    </Box>
                  </Drawer>
                  <div className="project-s-header">
                    <div className="project-s-right">
                      <h1>{project.name}</h1>
                      <p>app.getstellr.io/projects/{project._id}</p>
                    </div>
                    <div className="project-s-left">
                      <button
                        onClick={() => {
                          setViewLogs(false);
                        }}
                      >
                        Close Logs
                      </button>
                      <button
                        onClick={() => {
                          setIsDrawerOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="project-main-body-s">
                    {" "}
                    <div className="view-logs-inside">
                      <div className="header-logs-inside main">
                        <h2>User</h2>
                        <h2 className="log-message-h2">Log Message</h2>
                        <h2>Time</h2>
                      </div>
                      {project.logs &&
                        project.logs.length > 0 &&
                        project.logs.map((d) => <ProjectLog d={d} />)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="project-main-inside">
                  <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                  >
                    <Box width="500px" p={2} role="presentation">
                      <DrawerEditProject
                        project={project}
                        setIsDrawerOpen={setIsDrawerOpen}
                        setProjectUpdatedProfilers={setProjectUpdatedProfilers}
                      />
                    </Box>
                  </Drawer>
                  <div className="project-s-header">
                    <div className="project-s-right">
                      <h1>{project.name}</h1>
                      <p>app.getstellr.io/projects/{project._id}</p>
                    </div>
                    <div className="project-s-left">
                      {userRole != "Read" && (
                        <button
                          onClick={() => {
                            setViewLogs(true);
                          }}
                        >
                          View Logs
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsDrawerOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="project-main-body-s">
                    <div className="project-main-body-s-inside">
                      <div className="invite-team-member-s">
                        <h1>Add new team members or organization</h1>

                        <input
                          type="text"
                          placeholder="Enter Email Address or invite code"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={submitHandler}>Add</button>
                      </div>

                      <div className="invite-team-member-s-all">
                        <h1>Members and Organizations </h1>
                        <div className="team-members-s-all">
                          {" "}
                          {edit ? (
                            <div className="invite-team"></div>
                          ) : (
                            <div className="invite-team-right">
                              {project.collaborators.length > 0 ||
                              project.organizations.length > 0 ? (
                                <div className="team-already-right">
                                  <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 ">
                                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                          <th scope="col" className="px-6 py-3">
                                            Name
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                            Access
                                          </th>

                                          {userRole === "owner" && (
                                            <th
                                              scope="col"
                                              className="px-6 py-3"
                                            >
                                              Edit
                                            </th>
                                          )}
                                          {userRole === "Admin" && (
                                            <th
                                              scope="col"
                                              className="px-6 py-3"
                                            >
                                              Edit
                                            </th>
                                          )}

                                          {userRole === "owner" && (
                                            <th
                                              scope="col"
                                              className="px-6 py-3"
                                            >
                                              Delete
                                            </th>
                                          )}
                                          {userRole === "Admin" && (
                                            <th
                                              scope="col"
                                              className="px-6 py-3"
                                            >
                                              Delete
                                            </th>
                                          )}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {ownerUserData && (
                                          <tr className="bg-white border-b">
                                            <th
                                              scope="row"
                                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                              {ownerUserData.name}
                                            </th>

                                            <td className="px-6 py-4">Owner</td>
                                            <td className="px-6 py-4"></td>

                                            <td className="px-6 py-4"></td>
                                          </tr>
                                        )}
                                        {project.collaborators.map((doc) => (
                                          <tr className="bg-white border-b">
                                            <th
                                              scope="row"
                                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                              {doc.userName}
                                            </th>

                                            <td className="px-6 py-4">
                                              {doc.userType}
                                            </td>
                                            {userRole === "owner" && (
                                              <td className="px-6 py-4">
                                                <a
                                                  href="#"
                                                  className="text-indigo-600"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    setUpdatedUserEmail(
                                                      doc.userName
                                                    );
                                                    setUpdateUserId(doc.user);
                                                    setSettingsModal(true);
                                                  }}
                                                >
                                                  Edit
                                                </a>
                                              </td>
                                            )}
                                            {userRole === "Admin" && (
                                              <td className="px-6 py-4">
                                                <a
                                                  href="#"
                                                  className="text-indigo-600"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    setUpdateUserId(doc.user);
                                                    setSettingsModal(true);
                                                  }}
                                                >
                                                  Edit
                                                </a>
                                              </td>
                                            )}
                                            {userRole === "owner" && (
                                              <td className="px-6 py-4">
                                                <a
                                                  href="#"
                                                  className="text-indigo-600"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteHandlerCollab(
                                                      doc.user,
                                                      doc.userName
                                                    );
                                                  }}
                                                >
                                                  Remove
                                                </a>
                                              </td>
                                            )}
                                            {userRole === "Admin" && (
                                              <td className="px-6 py-4">
                                                <a
                                                  href="#"
                                                  className="text-indigo-600"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteHandlerCollab(
                                                      doc.user
                                                    );
                                                  }}
                                                >
                                                  Remove
                                                </a>
                                              </td>
                                            )}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>

                                  <div className="relative overflow-x-auto pt-5">
                                    <table className="w-full text-sm text-left text-gray-500 ">
                                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                          <th scope="col" className="px-6 py-3">
                                            Organization ID
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                            Organization Name
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {project.organizations.map((doc) => (
                                          <tr className="bg-white border-b">
                                            <th
                                              scope="row"
                                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                              {`ORG-${doc.organization}`}
                                            </th>
                                            <td className="px-6 py-4">
                                              {doc.organizationName}
                                            </td>

                                            {/* <td className="px-6 py-4">
                                         <a
                                           href="#"
                                           className="text-indigo-600"
                                           onClick={(e) => {
                                             e.preventDefault();
                                             setUpdateUserId(doc.user);
                                             setSettingsModal(true);
                                           }}
                                         >
                                           Delete
                                         </a>
                                       </td> */}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                <div className="team-already-right">
                                  No Project Members
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // <ProjectSettingsNew />
            <InsideLoader />
          )}

          {/* <div className="project-main">
       {viewLogs ? (
         <div className="project-main-inside">
           <h1>{project.name}</h1>
           <p>
             Manage your team members and their account permissions here.
           </p>
           <a
             href=""
             onClick={(e) => {
               e.preventDefault();
               setViewLogs(false);
             }}
           >
             Close Logs
           </a>
           <div className="view-logs-inside">
             <div className="header-logs-inside main">
               <h2>User</h2>
               <h2 className="log-message-h2">Log Message</h2>
               <h2>Time</h2>
             </div>
             {data && data.slice(0, 10).map((d) => <ProjectLog d={d} />)}
           </div>
         </div>
       ) : (
         <div className="project-main-inside">
           <Drawer
             anchor="right"
             open={isDrawerOpen}
             onClose={() => setIsDrawerOpen(false)}
           >
             <Box width="500px" p={2} role="presentation">
               <DrawerEditProject
                 project={project}
                 setIsDrawerOpen={setIsDrawerOpen}
                 setProjectUpdatedProfilers={setProjectUpdatedProfilers}
               />
             </Box>
           </Drawer>
           <h1>{project.name}</h1>
           <p>
             Manage your team members and their account permissions here.
           </p>
           <a
             href=""
             onClick={(e) => {
               e.preventDefault();
               setViewLogs(true);
             }}
           >
             View Logs
           </a>
           <a
             href=""
             onClick={(e) => {
               e.preventDefault();
               setIsDrawerOpen(true);
             }}
           >
             Edit Project
           </a>
           <div className="invite-team">
             <div className="invite-team-left">
               <h2>Invite team members</h2>
               <p>
                 Get your projects up and running faster by inviting your
                 team to collaborate.
               </p>
             </div>
             <div className="invite-team-right invte">
               <form onSubmit={submitHandler}>
                 <input
                   type="email"
                   placeholder="you@example.com"
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />

                 <button type="submit">Add</button>
               </form>
               {error && <h2>There was some error</h2>}
             </div>
           </div>
           <div className="invite-team">
             <div className="invite-team-left">
               <h2>Team members</h2>
               <p>Manage your existing team and change roles/permissions.</p>
             </div>
             {edit ? (
               <div className="invite-team"></div>
             ) : (
               <div className="invite-team-right">
                 {project.collaborators.length > 0 ? (
                   <div className="team-already-right">
                     {project.collaborators.map((proj) => (
                       <div className="profile-header">
                         <div className="profile-header-left">
                           <img
                             src={`https://ui-avatars.com/api/?background=random&name=${proj.userName}`}
                             alt=""
                           />
                           <div className="phl-content">
                             <h1>{proj.userName}</h1>
                             <a href="">stellr.com/v/{proj.user}</a>
                           </div>
                         </div>

                         <div className="profile-header-right">
                           <Tooltip
                             title="This user have access to the information related to your project"
                             followCursor
                           >
                             <button
                               className="button-user-type"
                               sx={{ m: 0, p: 0 }}
                             >
                               {proj.userType}
                             </button>
                           </Tooltip>
                           <button
                             sx={{ m: 0, p: 0 }}
                             onClick={(e) => {
                               e.preventDefault();
                               setUpdateUserId(proj.user);
                               setSettingsModal(true);
                             }}
                           >
                             <EditIcon />
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="team-already-right">
                     No Project Members
                   </div>
                 )}
               </div>
             )}
           </div>
         </div>
       )}
     </div> */}
        </div>
      )}
    </div>
  );
}

export default ProjectSettings;
