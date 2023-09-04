import { Box, Chip, Drawer, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DrawerEditTask from "./DrawerEditTask";
import { PaperClipIcon, UserCircleIcon } from "@heroicons/react/solid";
import DrawerLogsTask from "./DrawerLogsTask";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import URL from "./../../../Data/data.json";
function TaskModal({
  setTaskModal,
  doc,
  setTaskUpdateController,
  setTaskUpdate,
}) {
  console.log(doc);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpenLogs, setIsDrawerOpenLogs] = useState(false);
  const [viewLogs, setViewLogs] = useState(false);
  const [edit, setEdit] = useState(false);
  const [assignedMembers, setAssignedMembers] = useState(false);
  const date1 = new Date(doc.due_date);
  const [ownerUserData, setOwnerUserData] = useState();

  // const date2 = new Date(doc.createdAt);
  console.log(doc.createdAt);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ownerUser = async () => {
    var config = {
      method: "get",
      url: `${URL}api/users/${doc.user}`,
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
  return (
    <div className="modal">
      <div className="task-modal-container-main">
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box width="500px" p={2} role="presentation">
            <DrawerEditTask
              task={doc}
              setIsDrawerOpen={setIsDrawerOpen}
              setTaskUpdateController={setTaskUpdateController}
              setTaskModal={setTaskModal}
            />
          </Box>
        </Drawer>
        <div className="top-modal">
          <button
            onClick={(e) => {
              setTaskModal(false);
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
        <div className="project-main">
          {viewLogs ? (
            <></>
          ) : (
            <div className="project-main-inside">
              {assignedMembers ? (
                <>
                  {" "}
                  <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                  >
                    <Box width="500px" p={2} role="presentation">
                      <DrawerEditTask
                        task={doc}
                        setIsDrawerOpen={setIsDrawerOpen}
                        setTaskUpdateController={setTaskUpdateController}
                        setTaskModal={setTaskModal}
                      />
                    </Box>
                  </Drawer>
                  <Drawer
                    anchor="right"
                    open={isDrawerOpenLogs}
                    onClose={() => setIsDrawerOpenLogs(false)}
                  >
                    <Box width="500px" p={2} role="presentation">
                      <DrawerLogsTask
                        task={doc}
                        setIsDrawerOpenLogs={setIsDrawerOpenLogs}
                      />
                    </Box>
                  </Drawer>
                  <div className="project-s-header">
                    <div className="project-s-right">
                      <h1>{doc.subject}</h1>
                    </div>
                    <div className="project-s-left">
                      <button
                        onClick={() => {
                          setAssignedMembers(false);
                        }}
                      >
                        View Task Details
                      </button>
                      <button
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setIsDrawerOpenLogs(true);
                        }}
                      >
                        View Logs
                      </button>
                      <button
                        onClick={() => {
                          setIsDrawerOpen(true);
                        }}
                      >
                        Edit Task
                      </button>
                    </div>
                  </div>
                  <div className="project-main-body-s">
                    <div
                      className="project-main-body-s-inside
              "
                    >
                      <div className="invite-team-member-s-all">
                        <h1>Assigned Members</h1>
                        <div className="team-members-s-all">
                          {" "}
                          {edit ? (
                            <div className="invite-team"></div>
                          ) : (
                            <div className="invite-team-right">
                              {doc.assigned.length > 0 ? (
                                <div className="team-already-right">
                                  {doc.assigned.map((proj) => (
                                    <div className="profile-header">
                                      <div className="profile-header-left">
                                        <img
                                          src={`https://ui-avatars.com/api/?background=random&name=${proj.userName}`}
                                          alt=""
                                        />
                                        <div className="phl-content">
                                          <h1>{proj.userName}</h1>
                                          <a href="">
                                            stellr.com/v/{proj.user}
                                          </a>
                                        </div>
                                      </div>

                                      <div className="profile-header-right">
                                        <Tooltip
                                          title="This user have access to the information related to your project"
                                          followCursor
                                        >
                                          <a
                                            className="button-user-type"
                                            sx={{ m: 0, p: 0 }}
                                          >
                                            {proj.userType}
                                          </a>
                                        </Tooltip>
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
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                  >
                    <Box width="500px" p={2} role="presentation">
                      <DrawerEditTask
                        task={doc}
                        setIsDrawerOpen={setIsDrawerOpen}
                        setTaskUpdateController={setTaskUpdateController}
                        setTaskModal={setTaskModal}
                      />
                    </Box>
                  </Drawer>
                  <Drawer
                    anchor="right"
                    open={isDrawerOpenLogs}
                    onClose={() => setIsDrawerOpenLogs(false)}
                  >
                    <Box width="500px" p={2} role="presentation">
                      <DrawerLogsTask
                        task={doc}
                        setIsDrawerOpenLogs={setIsDrawerOpenLogs}
                      />
                    </Box>
                  </Drawer>
                  <div className="project-s-header">
                    <div className="project-s-right">
                      <h1>{doc.subject}</h1>
                    </div>
                    <div className="project-s-left">
                      <button
                        onClick={() => {
                          setAssignedMembers(true);
                        }}
                      >
                        View Assigned Members
                      </button>

                      <button
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setIsDrawerOpenLogs(true);
                        }}
                      >
                        View Logs
                      </button>
                      <button
                        onClick={() => {
                          setIsDrawerOpen(true);
                        }}
                      >
                        Edit Task
                      </button>
                    </div>
                  </div>
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      {/* <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Task Details
                      </h3> */}
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Created on{" "}
                        {
                          new Date(doc.createdAt)
                            .toLocaleString("en-GB")
                            .split(",")[0]
                        }{" "}
                        at{" "}
                        {new Date(doc.createdAt).toLocaleString().split(",")[1]}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-15 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Task Unique ID
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doc._id}
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Priority
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-indigo-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                              {doc.priority}
                            </div>
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Status
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doc.status === "Completed" ? (
                              <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-emerald-600 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                                {doc.status}
                              </div>
                            ) : (
                              <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                                {doc.status}
                              </div>
                            )}
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Due Date
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doc.due_date}
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Created By
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ownerUserData && ownerUserData.email}
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Last Modified By
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doc.logs.slice(-1)[0].userEmail}
                          </dd>
                        </div>
                        {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Description
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Fugiat ipsum ipsum deserunt culpa aute sint do
                            nostrud anim incididunt cillum culpa consequat.
                            Excepteur qui ipsum aliquip consequat sint. Sit id
                            mollit nulla mollit nostrud in ea officia proident.
                            Irure nostrud pariatur mollit ad adipisicing
                            reprehenderit deserunt qui eu.
                          </dd>
                        </div> */}
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Assigned Members
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul
                              role="list"
                              className="border border-gray-200 rounded-md divide-y divide-gray-200"
                            >
                              {doc.assigned.map((proj) => (
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div className="w-0 flex-1 flex items-center">
                                    <UserCircleIcon
                                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="ml-2 flex-1 w-0 truncate">
                                      {proj.userName}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Download
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul
                              role="list"
                              className="border border-gray-200 rounded-md divide-y divide-gray-200"
                            >
                              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <PaperClipIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    Download Task
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Download
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div> */}
                      </dl>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
