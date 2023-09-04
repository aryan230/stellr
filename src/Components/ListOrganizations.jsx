import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../redux/actions/organizationActions";
import { getUserDetails } from "../redux/actions/userActions";
import OrgnizationSettings from "./OrganizationSettings/OrgnizationSettings";

function ListOrganizations({
  newOrg,
  setUpdatedUserCollabRoleOrg,
  UpdatedUserCollabRoleOrg,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orgSettings, setOrgSettings] = useState(false);
  const [orgContent, setOrgContent] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [newCollab, setNewCollab] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const [updateCollabRole, setUpdateCollabRole] = useState(false);
  const { userInfo } = userLogin;
  const [newAccountName, setNewAccountName] = useState();
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorLoadingDetails,
    sucess: sucessLoadingDetails,
    user,
  } = userDetails;

  const orgListMy = useSelector((state) => state.orgListMy);
  const { loading: loading, error: error, sucess: sucess, orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;
  useEffect(() => {
    dispatch(listMyOrgs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);
  useEffect(() => {
    dispatch(listMyCollabOrgs());
  }, [dispatch]);
  useEffect(() => {
    if (newCollab) {
      dispatch(listMyOrgs());
      dispatch(listMyCollabOrgs());
    }
  }, [newCollab]);
  //newOrg
  useEffect(() => {
    if (newOrg) {
      dispatch(listMyOrgs());
      dispatch(listMyCollabOrgs());
    }
  }, [newOrg]);
  //updateCollabRole
  useEffect(() => {
    if (updateCollabRole) {
      dispatch(listMyOrgs());
      dispatch(listMyCollabOrgs());
      setUpdateCollabRole(false);
    }
  }, [updateCollabRole]);

  console.log(orgContent);
  return (
    <div className="project-component">
      <>
        {orgSettings && (
          <OrgnizationSettings
            orgContent={orgContent}
            setOrgSettings={setOrgSettings}
            setNewCollab={setNewCollab}
            setUpdatedUserCollabRoleOrg={setUpdatedUserCollabRoleOrg}
            setUpdateCollabRole={setUpdateCollabRole}
          />
        )}
        {orgs && (
          <div className="project-component-inside">
            <div className="project-c-header">
              <div className="project-c-header-left">
                <h1>Browse Organizations </h1>
                <input
                  type="text"
                  placeholder={`Search Organizations`}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="project-c-bottom">
              {orgs &&
                orgs.length > 0 &&
                orgs
                  .filter((entry) =>
                    entry.name.toLowerCase().includes(inputSearch.toLowerCase())
                  )
                  .map((project) => (
                    <button
                      className="sl-element"
                      onClick={async (e) => {
                        e.preventDefault();
                        setOrgContent(project);
                        setOrgSettings(true);
                      }}
                    >
                      <div className="mnc-element-inside">
                        <div className="mnc-element-left">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_400_547)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.5 14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H4V13.25C4 12.8358 4.33579 12.5 4.75 12.5H7.25C7.66421 12.5 8 12.8358 8 13.25V14.5H10.25C10.3881 14.5 10.5 14.3881 10.5 14.25V1.75C10.5 1.61193 10.3881 1.5 10.25 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25ZM1.75 16C0.783502 16 0 15.2165 0 14.25V1.75C0 0.783501 0.783502 0 1.75 0H10.25C11.2165 0 12 0.783501 12 1.75V14.25C12 14.3349 11.994 14.4184 11.9823 14.5001H14.25C14.3881 14.5001 14.5 14.3882 14.5 14.2501V8.28526C14.5 8.20168 14.4582 8.12362 14.3887 8.07725L13.334 7.37412C12.9893 7.14435 12.8962 6.6787 13.126 6.33405C13.3557 5.98941 13.8214 5.89628 14.166 6.12604L15.2207 6.82918C15.7076 7.15374 16 7.70015 16 8.28526V14.2501C16 15.2166 15.2165 16.0001 14.25 16.0001H10.75C10.6818 16.0001 10.6157 15.991 10.5528 15.9739C10.4545 15.9911 10.3533 16 10.25 16H7.25C6.83579 16 6.5 15.6642 6.5 15.25V14H5.5V15.25C5.5 15.6642 5.16421 16 4.75 16H1.75ZM3 3.75C3 3.33579 3.33579 3 3.75 3H4.25C4.66421 3 5 3.33579 5 3.75C5 4.16421 4.66421 4.5 4.25 4.5H3.75C3.33579 4.5 3 4.16421 3 3.75ZM3.75 6C3.33579 6 3 6.33579 3 6.75C3 7.16421 3.33579 7.5 3.75 7.5H4.25C4.66421 7.5 5 7.16421 5 6.75C5 6.33579 4.66421 6 4.25 6H3.75ZM3 9.75C3 9.33579 3.33579 9 3.75 9H4.25C4.66421 9 5 9.33579 5 9.75C5 10.1642 4.66421 10.5 4.25 10.5H3.75C3.33579 10.5 3 10.1642 3 9.75ZM7.75 9C7.33579 9 7 9.33579 7 9.75C7 10.1642 7.33579 10.5 7.75 10.5H8.25C8.66421 10.5 9 10.1642 9 9.75C9 9.33579 8.66421 9 8.25 9H7.75ZM7 6.75C7 6.33579 7.33579 6 7.75 6H8.25C8.66421 6 9 6.33579 9 6.75C9 7.16421 8.66421 7.5 8.25 7.5H7.75C7.33579 7.5 7 7.16421 7 6.75ZM7.75 3C7.33579 3 7 3.33579 7 3.75C7 4.16421 7.33579 4.5 7.75 4.5H8.25C8.66421 4.5 9 4.16421 9 3.75C9 3.33579 8.66421 3 8.25 3H7.75Z"
                                fill="url(#paint0_linear_400_547)"
                              />
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_400_547"
                                x1="8"
                                y1="0"
                                x2="8"
                                y2="16.0001"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#5D00D2" />
                                <stop offset="0.963542" stop-color="#C37CFD" />
                                <stop
                                  offset="1"
                                  stop-color="#C781FF"
                                  stop-opacity="0"
                                />
                              </linearGradient>
                              <clipPath id="clip0_400_547">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>{project.name}</p>
                          <span>Owned by you</span>
                        </div>
                        <span>Created on {project.createdAt.slice(0, 10)}</span>
                      </div>
                    </button>
                  ))}
              {orgsCollab &&
                orgsCollab.length > 0 &&
                orgsCollab
                  .filter((entry) =>
                    entry.name.toLowerCase().includes(inputSearch.toLowerCase())
                  )
                  .map((project) => (
                    <button
                      className="sl-element"
                      onClick={async (e) => {
                        e.preventDefault();
                        setOrgContent(project);
                        setOrgSettings(true);
                      }}
                    >
                      <div className="mnc-element-inside">
                        <div className="mnc-element-left">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_400_547)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.5 14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H4V13.25C4 12.8358 4.33579 12.5 4.75 12.5H7.25C7.66421 12.5 8 12.8358 8 13.25V14.5H10.25C10.3881 14.5 10.5 14.3881 10.5 14.25V1.75C10.5 1.61193 10.3881 1.5 10.25 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25ZM1.75 16C0.783502 16 0 15.2165 0 14.25V1.75C0 0.783501 0.783502 0 1.75 0H10.25C11.2165 0 12 0.783501 12 1.75V14.25C12 14.3349 11.994 14.4184 11.9823 14.5001H14.25C14.3881 14.5001 14.5 14.3882 14.5 14.2501V8.28526C14.5 8.20168 14.4582 8.12362 14.3887 8.07725L13.334 7.37412C12.9893 7.14435 12.8962 6.6787 13.126 6.33405C13.3557 5.98941 13.8214 5.89628 14.166 6.12604L15.2207 6.82918C15.7076 7.15374 16 7.70015 16 8.28526V14.2501C16 15.2166 15.2165 16.0001 14.25 16.0001H10.75C10.6818 16.0001 10.6157 15.991 10.5528 15.9739C10.4545 15.9911 10.3533 16 10.25 16H7.25C6.83579 16 6.5 15.6642 6.5 15.25V14H5.5V15.25C5.5 15.6642 5.16421 16 4.75 16H1.75ZM3 3.75C3 3.33579 3.33579 3 3.75 3H4.25C4.66421 3 5 3.33579 5 3.75C5 4.16421 4.66421 4.5 4.25 4.5H3.75C3.33579 4.5 3 4.16421 3 3.75ZM3.75 6C3.33579 6 3 6.33579 3 6.75C3 7.16421 3.33579 7.5 3.75 7.5H4.25C4.66421 7.5 5 7.16421 5 6.75C5 6.33579 4.66421 6 4.25 6H3.75ZM3 9.75C3 9.33579 3.33579 9 3.75 9H4.25C4.66421 9 5 9.33579 5 9.75C5 10.1642 4.66421 10.5 4.25 10.5H3.75C3.33579 10.5 3 10.1642 3 9.75ZM7.75 9C7.33579 9 7 9.33579 7 9.75C7 10.1642 7.33579 10.5 7.75 10.5H8.25C8.66421 10.5 9 10.1642 9 9.75C9 9.33579 8.66421 9 8.25 9H7.75ZM7 6.75C7 6.33579 7.33579 6 7.75 6H8.25C8.66421 6 9 6.33579 9 6.75C9 7.16421 8.66421 7.5 8.25 7.5H7.75C7.33579 7.5 7 7.16421 7 6.75ZM7.75 3C7.33579 3 7 3.33579 7 3.75C7 4.16421 7.33579 4.5 7.75 4.5H8.25C8.66421 4.5 9 4.16421 9 3.75C9 3.33579 8.66421 3 8.25 3H7.75Z"
                                fill="url(#paint0_linear_400_547)"
                              />
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_400_547"
                                x1="8"
                                y1="0"
                                x2="8"
                                y2="16.0001"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#5D00D2" />
                                <stop offset="0.963542" stop-color="#C37CFD" />
                                <stop
                                  offset="1"
                                  stop-color="#C781FF"
                                  stop-opacity="0"
                                />
                              </linearGradient>
                              <clipPath id="clip0_400_547">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>{project.name}</p>
                        </div>
                        <span>Created on {project.createdAt.slice(0, 10)}</span>
                      </div>
                    </button>
                  ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default ListOrganizations;
