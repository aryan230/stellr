import { Box, Drawer, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useSelector } from "react-redux";
import URL from "../../Data/data.json";
import OrgSettingsModal from "./OrgSettingsModal";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
function OrgnizationSettings({
  orgContent,
  setOrgSettings,
  setNewCollab,
  setUpdatedUserCollabRoleOrg,
  setUpdateCollabRole,
}) {
  const [edit, setEdit] = useState(false);
  const [viewLogs, setViewLogs] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [email, setEmail] = useState();
  const [settingsModal, setSettingsModal] = useState(false);
  const [updateUserId, setUpdateUserId] = useState();
  const [ownerUserData, setOwnerUserData] = useState();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
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

          const data = {
            orgId: orgContent._id,
            collabDetails: {
              user: response.data[0]._id,
              userName: response.data[0].name ? response.data[0].name : "",
              userEmail: response.data[0].email ? response.data[0].email : "",
            },
          };
          var config = {
            method: "post",
            url: `${URL}api/organs/collab`,
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios(config)
            .then(function(responseData) {
              setNewCollab(true);
              setOrgSettings(false);
              console.log(JSON.stringify(responseData.data));
            })
            .catch(function(error) {
              console.log(error);
              toast.error("There was an error adding member.");
            });
        } else {
          toast.error("No user found for that email.");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const ownerUser = async () => {
    var config = {
      method: "get",
      url: `${URL}api/users/${orgContent.user}`,
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

  useEffect(() => {
    if (!ownerUserData) {
      ownerUser();
    }
  }, [ownerUserData]);

  return (
    <div className="modal">
      <Toaster position="top-center" reverseOrder={true} />
      {settingsModal && (
        <OrgSettingsModal
          setOrgSettings={setOrgSettings}
          setSettingsModal={setSettingsModal}
          project={orgContent}
          id={updateUserId}
          setUpdatedUserCollabRoleOrg={setUpdatedUserCollabRoleOrg}
          setUpdateCollabRole={setUpdateCollabRole}
        />
      )}
      <div className="project-settings">
        <Toaster position="top-center" reverseOrder={true} />
        <div className="top-modal">
          <button
            onClick={(e) => {
              setOrgSettings(false);
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
          <div className="project-main-inside">
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box width="500px" p={2} role="presentation"></Box>
            </Drawer>
            <div className="project-s-header">
              <div className="project-s-right">
                <h1>{orgContent.name}</h1>
                <p>Invite code: ORG-{orgContent._id}</p>
              </div>
              <div className="project-s-left">
                <button
                  onClick={() => {
                    setActiveTab("home");
                  }}
                  className={activeTab === "home" && `active`}
                >
                  Home
                </button>
                <button
                  className={activeTab === "addNewMembers" && `active`}
                  onClick={() => {
                    setActiveTab("addNewMembers");
                  }}
                >
                  View Members
                </button>
                {orgContent.user === userInfo._id && (
                  <button
                    className={activeTab === "viewLogs" && `active`}
                    onClick={() => {
                      setActiveTab("viewLogs");
                    }}
                  >
                    View Logs
                  </button>
                )}
                {orgContent.user === userInfo._id && (
                  <button
                    onClick={() => {
                      //   setIsDrawerOpen(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div className="project-main-body-s">
              {activeTab === "home" && (
                <div className="org-invite-members">
                  <div className="org-invite-code-inside">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M15.8333 16.6667C19.055 16.6667 21.6667 14.055 21.6667 10.8333C21.6667 7.61168 19.055 5 15.8333 5C12.6117 5 10 7.61168 10 10.8333C10 14.055 12.6117 16.6667 15.8333 16.6667Z"
                        fill="#595959"
                        stroke="#595959"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.33398 33.9999V34.9999H28.334V33.9999C28.334 30.2663 28.334 28.3994 27.6074 26.9733C26.9682 25.7189 25.9483 24.699 24.6939 24.0598C23.2678 23.3333 21.401 23.3333 17.6673 23.3333H14.0007C10.267 23.3333 8.40015 23.3333 6.97405 24.0598C5.71963 24.699 4.69976 25.7189 4.06061 26.9733C3.33398 28.3994 3.33398 30.2663 3.33398 33.9999Z"
                        fill="#595959"
                        stroke="#595959"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M26.666 15.8333H36.666M31.666 10.8333V20.8333V10.8333Z"
                        stroke="#595959"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <h1>
                      Invite new members to organization using the code below:
                    </h1>
                    <input value={`ORG-${orgContent._id}`} disabled />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`ORG-${orgContent._id}`);
                        toast.success("Code Copied to clipboard");
                      }}
                    >
                      Copy Code
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "viewLogs" && (
                <>
                  <h1>Coming Soon</h1>
                </>
              )}
              {activeTab === "addNewMembers" && (
                <div className="project-main-body-s-inside">
                  <div className="invite-team-member-s">
                    <h1>Add new team members</h1>

                    <input
                      type="text"
                      placeholder="Enter Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={submitHandler}>Add</button>
                  </div>
                  <div className="invite-team-member-s-all">
                    <h1>Team Members</h1>
                    <div className="team-members-s-all">
                      {" "}
                      {edit ? (
                        <div className="invite-team"></div>
                      ) : (
                        <div className="invite-team-right">
                          {orgContent.collaborators.length > 0 ? (
                            <div className="team-already-right">
                              {ownerUserData && (
                                <div className="profile-header">
                                  <div className="profile-header-left">
                                    <img
                                      src={`https://ui-avatars.com/api/?background=random&name=${ownerUserData.email}`}
                                      alt=""
                                    />
                                    <div className="phl-content">
                                      <h1>{ownerUserData.email}</h1>
                                      <a href="">
                                        stellr.com/v/{ownerUserData._id}
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
                                        Owner
                                      </a>
                                    </Tooltip>
                                    {orgContent.user === userInfo._id && (
                                      <button
                                        sx={{ m: 0, p: 0 }}
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                      >
                                        <EditIcon />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                              {orgContent.collaborators.map((proj) => (
                                <div className="profile-header">
                                  <div className="profile-header-left">
                                    <img
                                      src={`https://ui-avatars.com/api/?background=random&name=${proj.userEmail}`}
                                      alt=""
                                    />
                                    <div className="phl-content">
                                      <h1>{proj.userEmail}</h1>
                                      <a href="">stellr.com/v/{proj.user}</a>
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
                                    {orgContent.user === userInfo._id && (
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
                                    )}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgnizationSettings;
