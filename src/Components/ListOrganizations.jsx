import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../redux/actions/organizationActions";
import { getUserDetails } from "../redux/actions/userActions";
import OrgnizationSettings from "./OrganizationSettings/OrgnizationSettings";
import { Helmet } from "react-helmet";
import axios from "axios";
import URL from "./../Data/data.json";
import OrganizationStatusModal from "./OrganizationSettings/OrganizationStatusModal";
import { addProtocolLogs } from "./Functions/addProtocolLogs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { addSOPLogs } from "./Functions/addSOPLogs";
import { addNotification } from "./Functions/addNotification";
import { PaperClipIcon, PlusIcon } from "@heroicons/react/solid";

import { Disclosure, Menu, RadioGroup, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { Crown } from "lucide-react";
import { find } from "lodash";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const settings = [
  {
    name: "Public access",
    description: "This project would be available to anyone who has the link",
  },
  {
    name: "Private to Project Members",
    description: "Only members of this project would be able to access",
  },
  {
    name: "Private to you",
    description: "You are the only one able to access this project",
  },
];
const team = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Bessie Richards",
    email: "bessie.richards@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Black",
    email: "floyd.black@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
function ListOrganizations({
  newOrg,
  setUpdatedUserCollabRoleOrg,
  UpdatedUserCollabRoleOrg,
  setProtocolContent,
  setProtocolModal,
  setSopContent,
  setSopModal,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orgSettings, setOrgSettings] = useState(false);
  const [orgStatusContent, setOrgStatusContent] = useState();
  const [changeStatus, setOrgStatus] = useState(false);
  const [orgContent, setOrgContent] = useState();
  const [orgContentSettings, setOrgContentSettings] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [eType, setEType] = useState();
  const [newCollab, setNewCollab] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const [updateCollabRole, setUpdateCollabRole] = useState(false);
  const { userInfo } = userLogin;
  const [newAccountName, setNewAccountName] = useState();
  const userDetails = useSelector((state) => state.userDetails);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [ownerUserData, setOwnerUserData] = useState();

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "name", label: "Entity Name", minWidth: 100 },
    { id: "type", label: "Entity Type", minWidth: 100 },
    { id: "status", label: "Entity Status", minWidth: 100 },
    { id: "statusBy", label: "Approved/Declined by", minWidth: 170 },
    {
      id: "view",
      label: "View",
      minWidth: 100,
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 100,
    },
    // {
    //   id: "download",
    //   label: "Download",
    //   minWidth: 100,
    // },
  ];

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
      getProjectStats();
      setNewCollab(false);
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

  const findOrg =
    orgs && orgs.length > 0
      ? orgs[0]
      : orgsCollab && orgsCollab.length > 0
      ? orgsCollab[0]
      : null;

  const findOrgRole =
    orgs && orgs.length > 0
      ? orgs[0].user == userInfo._id && "Owner"
      : orgsCollab && orgsCollab.length > 0
      ? orgsCollab[0].collaborators.find((e) => e.user == userInfo._id) &&
        orgsCollab[0].collaborators.find((e) => e.user == userInfo._id)
          .permissions
      : null;

  console.log(findOrgRole);
  const getProjectStats = async () => {
    var data = JSON.stringify({
      orgId: findOrg._id,
    });

    var config = {
      method: "post",
      url: `${URL}api/organs/orgData`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data);
        setOrgContent(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!orgContent) {
      if (findOrg) {
        getProjectStats();
      }
    }
  }, [findOrg, orgContent]);

  useEffect(() => {
    if (localStorage.getItem("stellrStatusUpdate")) {
      const { sendData: data, logData, type, user, to } = JSON.parse(
        localStorage.getItem("stellrStatusUpdateData")
      );
      if (user) {
        if (user === userInfo._id) {
          if (type === "Protocol") {
            const finalLogData = JSON.parse(logData);
            var config = {
              method: "put",
              url: `${URL}api/protocols/status/${finalLogData.entryId}`,
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
              },
              data: data,
            };

            axios(config)
              .then(async function(response) {
                console.log(response.data);
                await addProtocolLogs(finalLogData);
                await addNotification({
                  id: to,
                  type: "Not read",
                  value: JSON.stringify({
                    subject: finalLogData.message,
                    date: new Date(),
                  }),
                  token: userInfo.token,
                });
                setNewCollab(true);
                setOrgStatus(false);
                localStorage.removeItem("stellrStatusUpdate");
                localStorage.removeItem("stellrStatusUpdateData");
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            const finalLogData = JSON.parse(logData);
            var config = {
              method: "put",
              url: `${URL}api/sops/status/${finalLogData.entryId}`,
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
              },
              data: data,
            };

            axios(config)
              .then(async function(response) {
                console.log(response.data);
                await addSOPLogs(finalLogData);
                setNewCollab(true);
                setOrgStatus(false);
                localStorage.removeItem("stellrStatusUpdate");
                localStorage.removeItem("stellrStatusUpdateData");
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      }
    }
  }, []);

  let finalCount =
    orgContent &&
    orgContent.orgData &&
    orgContent.orgData
      .map((u) => {
        return u.protocols.length;
      })
      .reduce((partialSum, a) => partialSum + a, 0);

  let finalCountSOP =
    orgContent &&
    orgContent.orgData &&
    orgContent.orgData
      .map((u) => {
        return u.sops.length;
      })
      .reduce((partialSum, a) => partialSum + a, 0);

  const ownerUser = async () => {
    var config = {
      method: "get",
      url: `${URL}api/users/${findOrg.user}`,
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
    if (findOrg) {
      if (!ownerUserData) {
        ownerUser();
      }
    }
  }, [ownerUserData, findOrg]);

  return (
    <div className="project-component">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Organization Management | Electronic Lab Notebook</title>
        <meta
          name="description"
          content="Efficiently manage and track bio-pharma research projects with ourElectronic Lab Notebook software. Simplify collaboration and enhance data organization."
        />
      </Helmet>
      <>
        {orgSettings && (
          <OrgnizationSettings
            orgContent={orgContentSettings}
            setOrgSettings={setOrgSettings}
            setNewCollab={setNewCollab}
            setUpdatedUserCollabRoleOrg={setUpdatedUserCollabRoleOrg}
            setUpdateCollabRole={setUpdateCollabRole}
          />
        )}
        {changeStatus && (
          <OrganizationStatusModal
            setNewCollab={setNewCollab}
            setOrgStatus={setOrgStatus}
            orgStatusContent={orgStatusContent}
            type={eType}
          />
        )}
        {orgs && (
          <div className="project-component-inside overflow-y-auto">
            <div className="w-[80%] mx-auto pt-10 font-sans">
              <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
                <form>
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-lg leading-6 font-medium text-gray-900">
                        Organization Settings
                      </h1>
                      {/* <p className="mt-1 text-sm text-gray-500">
                        Let’s get started by filling in the information below to
                        create your new project.
                      </p> */}
                    </div>
                    <hr />
                    <div>
                      <label
                        htmlFor="project-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Project Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="project-name"
                          id="project-name"
                          className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                          defaultValue={findOrg && findOrg.name}
                          disabled
                        />
                      </div>
                    </div>
                    {findOrg && (
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label
                            htmlFor="add-team-members"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Copy Invite Code
                          </label>
                          {/* <p id="add-team-members-helper" className="sr-only">
                          Search by email address
                        </p> */}
                          <div className="flex">
                            <div className="flex-grow">
                              <input
                                type="text"
                                name="add-team-members"
                                id="add-team-members"
                                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Email address"
                                aria-describedby="add-team-members-helper"
                                defaultValue={`ORG-${findOrg._id}`}
                                disabled
                              />
                            </div>
                            <span className="ml-3">
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `ORG-${findOrg._id}`
                                  );
                                  toast.success("Code Copied to clipboard");
                                }}
                                className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                              >
                                <PlusIcon
                                  className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Copy</span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label
                          htmlFor="add-team-members"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Team Members
                        </label>
                        <p id="add-team-members-helper" className="sr-only">
                          Search by email address
                        </p>
                        {/* <div className="flex">
                          <div className="flex-grow">
                            <input
                              type="text"
                              name="add-team-members"
                              id="add-team-members"
                              className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                              placeholder="Email address"
                              aria-describedby="add-team-members-helper"
                            />
                          </div>
                          <span className="ml-3">
                            <button
                              type="button"
                              className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                              <PlusIcon
                                className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Add</span>
                            </button>
                          </span>
                        </div> */}
                      </div>

                      <div className="border-b border-gray-200">
                        <ul role="list" className="divide-y divide-gray-200">
                          {ownerUserData && (
                            <li key={ownerUserData.name} className="py-4 flex">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${ownerUserData.name}`}
                                alt=""
                              />
                              <div className="ml-3 flex flex-col">
                                <span className="text-sm font-medium text-gray-900 flex">
                                  {ownerUserData.name
                                    ? ownerUserData.name
                                    : ownerUserData._id}
                                  <Crown
                                    size={12}
                                    className="text-indigo-600 ml-2"
                                  />
                                </span>
                                <span className="text-sm text-gray-500">
                                  {ownerUserData.email}
                                </span>
                              </div>
                            </li>
                          )}
                          {findOrg &&
                            findOrg.collaborators &&
                            findOrg.collaborators.length > 0 &&
                            findOrg.collaborators.map((person) => (
                              <li key={person.userEmail} className="py-4 flex">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${person.userName}`}
                                  alt=""
                                />
                                <div className="ml-3 flex flex-col">
                                  <span className="text-sm font-medium text-gray-900">
                                    {person.userName
                                      ? person.userName
                                      : person.user}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {person.userEmail}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tags
                      </label>
                      <input
                        type="text"
                        name="tags"
                        id="tags"
                        className="mt-1 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        onClick={(e) => {
                          if (findOrg) {
                            e.preventDefault();
                            setOrgContentSettings(findOrg);
                            setOrgSettings(true);
                          }
                        }}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        View Settings
                      </button>
                    </div>
                  </div>
                </form>
              </main>
            </div>
          </div>
          // <div className="project-component-inside">
          //   <div className="md:flex md:items-center md:justify-between md:space-x-5 py-10 mx-auto w-[80%] font-inter">
          //     <div className="flex items-start space-x-5">
          //       <div className="flex-shrink-0">
          //         <div className="relative">
          //           <img
          //             className="h-16 w-16 rounded-full"
          //             src={`https://ui-avatars.com/api/?background=random&name=${findOrg &&
          //               findOrg.name}`}
          //             alt=""
          //           />
          //           <span
          //             className="absolute inset-0 shadow-inner rounded-full"
          //             aria-hidden="true"
          //           />
          //         </div>
          //       </div>

          //       <div className="pt-1.5">
          //         <h1 className="text-2xl font-bold text-gray-900">
          //           {findOrg && findOrg.name}
          //         </h1>
          //         <p className="text-sm font-medium text-gray-500">
          //           This organization was created on{" "}
          //           <time dateTime="2020-08-25">
          //             {findOrg && new Date(findOrg.createdAt).toUTCString()}
          //           </time>
          //         </p>
          //       </div>
          //     </div>
          //     <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          //       <button
          //         type="button"
          //         onClick={(e) => {
          //           if (findOrg) {
          //             e.preventDefault();
          //             setOrgContentSettings(findOrg);
          //             setOrgSettings(true);
          //           }
          //         }}
          //         className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          //       >
          //         Settings
          //       </button>
          //     </div>
          //   </div>
          //   <div className="w-[80%] font-sans mx-auto border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          //     <div className="px-6 py-5 text-sm font-medium text-center">
          //       <span className="text-gray-900">
          //         {findOrg && findOrg.collaborators.length}
          //       </span>{" "}
          //       <span className="text-gray-600">Members</span>
          //     </div>
          //     <div className="px-6 py-5 text-sm font-medium text-center">
          //       <span className="text-gray-900">
          //         {finalCount && finalCount}
          //       </span>{" "}
          //       <span className="text-gray-600">Protocols</span>
          //     </div>
          //     <div className="px-6 py-5 text-sm font-medium text-center">
          //       <span className="text-gray-900">
          //         {finalCountSOP && finalCountSOP}
          //       </span>{" "}
          //       <span className="text-gray-600">SOPs</span>
          //     </div>
          //   </div>
          //   <div className="project-c-bottom">
          //     {findOrgRole === "Admin" ? (
          //       <div className="relative overflow-x-auto">
          //         <TableContainer sx={{ maxHeight: "100%" }}>
          //           <Table
          //             stickyHeader
          //             aria-label="sticky table"
          //             className="custom-font-mui"
          //           >
          //             <TableHead>
          //               <TableRow>
          //                 {columns.map((column) => (
          //                   <TableCell
          //                     key={column.id}
          //                     align={column.align}
          //                     style={{ minWidth: column.minWidth }}
          //                   >
          //                     {column.label}
          //                   </TableCell>
          //                 ))}
          //               </TableRow>
          //             </TableHead>
          //             <TableBody>
          //               {orgContent &&
          //                 orgContent.orgData.map((u) =>
          //                   u.protocols
          //                     .map(
          //                       ({
          //                         title: name,
          //                         createdAt: createdAt,
          //                         _id,
          //                         status,
          //                         statusBy,
          //                       }) => ({
          //                         _id,
          //                         name,
          //                         type: "Protocol",
          //                         status,
          //                         statusBy: statusBy ? statusBy : "-",
          //                         createdBy: u.name,
          //                         createdAt: new Date(
          //                           createdAt
          //                         ).toLocaleString(),
          //                       })
          //                     )
          //                     .slice(
          //                       page * rowsPerPage,
          //                       page * rowsPerPage + rowsPerPage
          //                     )
          //                     .map((row) => {
          //                       return (
          //                         <TableRow
          //                           hover
          //                           role="checkbox"
          //                           tabIndex={-1}
          //                           key={row.code}
          //                         >
          //                           {columns.map((column) => {
          //                             if (column.id === "edit") {
          //                               if (findOrgRole) {
          //                                 if (findOrgRole === "Owner") {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     >
          //                                       <button
          //                                         type="button"
          //                                         onClick={() => {
          //                                           let content = u.protocols.find(
          //                                             (e) => e._id === row._id
          //                                           );
          //                                           setEType("Protocol");
          //                                           setOrgStatusContent(
          //                                             content
          //                                           );
          //                                           setOrgStatus(true);
          //                                         }}
          //                                         className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          //                                       >
          //                                         Edit Status
          //                                       </button>
          //                                     </TableCell>
          //                                   );
          //                                 } else {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     ></TableCell>
          //                                   );
          //                                 }
          //                               }
          //                             } else if (column.id === "status") {
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {row.status === "Draft" && (
          //                                     <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Draft
          //                                     </span>
          //                                   )}
          //                                   {row.status === "In Progress" && (
          //                                     <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       In Progress
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Approved" && (
          //                                     <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Approved
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Rejected" && (
          //                                     <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Rejected
          //                                     </span>
          //                                   )}
          //                                 </TableCell>
          //                               );
          //                             } else if (column.id === "view") {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   <a
          //                                     href="#"
          //                                     className="font-medium text-blue-600 hover:underline"
          //                                     onClick={(e) => {
          //                                       e.preventDefault();
          //                                       let content = u.protocols.find(
          //                                         (e) => e._id === row._id
          //                                       );
          //                                       setProtocolContent(content);
          //                                       setProtocolModal(true);
          //                                     }}
          //                                   >
          //                                     View
          //                                   </a>
          //                                 </TableCell>
          //                               );
          //                             } else {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {column.format &&
          //                                   typeof value === "number"
          //                                     ? column.format(value)
          //                                     : value}
          //                                 </TableCell>
          //                               );
          //                             }
          //                           })}
          //                         </TableRow>
          //                       );
          //                     })
          //                 )}
          //               {orgContent &&
          //                 orgContent.orgData.map((u) =>
          //                   u.sops
          //                     .map(
          //                       ({
          //                         title: name,
          //                         createdAt: createdAt,
          //                         _id,
          //                         status,
          //                         statusBy,
          //                       }) => ({
          //                         _id,
          //                         name,
          //                         type: "SOP",
          //                         status,
          //                         statusBy: statusBy ? statusBy : "-",
          //                         createdBy: u.name,
          //                         createdAt: new Date(
          //                           createdAt
          //                         ).toLocaleString(),
          //                       })
          //                     )
          //                     .slice(
          //                       page * rowsPerPage,
          //                       page * rowsPerPage + rowsPerPage
          //                     )
          //                     .map((row) => {
          //                       return (
          //                         <TableRow
          //                           hover
          //                           role="checkbox"
          //                           tabIndex={-1}
          //                           key={row.code}
          //                         >
          //                           {columns.map((column) => {
          //                             if (column.id === "edit") {
          //                               if (findOrgRole) {
          //                                 if (findOrgRole === "Owner") {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     >
          //                                       <button
          //                                         type="button"
          //                                         onClick={() => {
          //                                           let content = u.sops.find(
          //                                             (e) => e._id === row._id
          //                                           );
          //                                           setEType("SOP");
          //                                           setOrgStatusContent(
          //                                             content
          //                                           );
          //                                           setOrgStatus(true);
          //                                         }}
          //                                         className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          //                                       >
          //                                         Edit Status
          //                                       </button>
          //                                     </TableCell>
          //                                   );
          //                                 } else {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     ></TableCell>
          //                                   );
          //                                 }
          //                               }
          //                             } else if (column.id === "status") {
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {row.status === "Draft" && (
          //                                     <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Draft
          //                                     </span>
          //                                   )}
          //                                   {row.status === "In Progress" && (
          //                                     <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       In Progress
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Approved" && (
          //                                     <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Approved
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Rejected" && (
          //                                     <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Rejected
          //                                     </span>
          //                                   )}
          //                                 </TableCell>
          //                               );
          //                             } else if (column.id === "view") {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   <a
          //                                     href="#"
          //                                     className="font-medium text-blue-600 hover:underline"
          //                                     onClick={(e) => {
          //                                       e.preventDefault();
          //                                       let content = u.sops.find(
          //                                         (e) => e._id === row._id
          //                                       );
          //                                       setSopContent(content);
          //                                       setSopModal(true);
          //                                     }}
          //                                   >
          //                                     View
          //                                   </a>
          //                                 </TableCell>
          //                               );
          //                             } else {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {column.format &&
          //                                   typeof value === "number"
          //                                     ? column.format(value)
          //                                     : value}
          //                                 </TableCell>
          //                               );
          //                             }
          //                           })}
          //                         </TableRow>
          //                       );
          //                     })
          //                 )}
          //             </TableBody>
          //           </Table>
          //         </TableContainer>
          //         <TablePagination
          //           rowsPerPageOptions={[8, 16, 100]}
          //           component="div"
          //           count={finalCount && finalCount}
          //           rowsPerPage={rowsPerPage}
          //           page={page}
          //           onPageChange={handleChangePage}
          //           onRowsPerPageChange={handleChangeRowsPerPage}
          //         />
          //       </div>
          //     ) : findOrgRole === "Write" ? (
          //       <div className="relative overflow-x-auto">
          //         <TableContainer sx={{ maxHeight: "100%" }}>
          //           <Table
          //             stickyHeader
          //             aria-label="sticky table"
          //             className="custom-font-mui"
          //           >
          //             <TableHead>
          //               <TableRow>
          //                 {columns.map((column) => (
          //                   <TableCell
          //                     key={column.id}
          //                     align={column.align}
          //                     style={{ minWidth: column.minWidth }}
          //                   >
          //                     {column.label}
          //                   </TableCell>
          //                 ))}
          //               </TableRow>
          //             </TableHead>
          //             <TableBody>
          //               {orgContent &&
          //                 orgContent.orgData.map((u) =>
          //                   u.protocols
          //                     .map(
          //                       ({
          //                         title: name,
          //                         createdAt: createdAt,
          //                         _id,
          //                         status,
          //                         statusBy,
          //                       }) => ({
          //                         _id,
          //                         name,
          //                         type: "Protocol",
          //                         status,
          //                         statusBy: statusBy ? statusBy : "-",
          //                         createdBy: u.name,
          //                         createdAt: new Date(
          //                           createdAt
          //                         ).toLocaleString(),
          //                       })
          //                     )
          //                     .slice(
          //                       page * rowsPerPage,
          //                       page * rowsPerPage + rowsPerPage
          //                     )
          //                     .map((row) => {
          //                       return (
          //                         <TableRow
          //                           hover
          //                           role="checkbox"
          //                           tabIndex={-1}
          //                           key={row.code}
          //                         >
          //                           {columns.map((column) => {
          //                             if (column.id === "edit") {
          //                               if (findOrgRole) {
          //                                 if (findOrgRole === "Owner") {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     >
          //                                       <button
          //                                         type="button"
          //                                         onClick={() => {
          //                                           let content = u.protocols.find(
          //                                             (e) => e._id === row._id
          //                                           );
          //                                           setEType("Protocol");
          //                                           setOrgStatusContent(
          //                                             content
          //                                           );
          //                                           setOrgStatus(true);
          //                                         }}
          //                                         className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          //                                       >
          //                                         Edit Status
          //                                       </button>
          //                                     </TableCell>
          //                                   );
          //                                 } else {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     ></TableCell>
          //                                   );
          //                                 }
          //                               }
          //                             } else if (column.id === "status") {
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {row.status === "Draft" && (
          //                                     <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Draft
          //                                     </span>
          //                                   )}
          //                                   {row.status === "In Progress" && (
          //                                     <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       In Progress
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Approved" && (
          //                                     <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Approved
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Rejected" && (
          //                                     <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Rejected
          //                                     </span>
          //                                   )}
          //                                 </TableCell>
          //                               );
          //                             } else if (column.id === "view") {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   <a
          //                                     href="#"
          //                                     className="font-medium text-blue-600 hover:underline"
          //                                     onClick={(e) => {
          //                                       e.preventDefault();
          //                                       let content = u.protocols.find(
          //                                         (e) => e._id === row._id
          //                                       );
          //                                       setProtocolContent(content);
          //                                       setProtocolModal(true);
          //                                     }}
          //                                   >
          //                                     View
          //                                   </a>
          //                                 </TableCell>
          //                               );
          //                             } else {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {column.format &&
          //                                   typeof value === "number"
          //                                     ? column.format(value)
          //                                     : value}
          //                                 </TableCell>
          //                               );
          //                             }
          //                           })}
          //                         </TableRow>
          //                       );
          //                     })
          //                 )}
          //               {orgContent &&
          //                 orgContent.orgData.map((u) =>
          //                   u.sops
          //                     .map(
          //                       ({
          //                         title: name,
          //                         createdAt: createdAt,
          //                         _id,
          //                         status,
          //                         statusBy,
          //                       }) => ({
          //                         _id,
          //                         name,
          //                         type: "SOP",
          //                         status,
          //                         statusBy: statusBy ? statusBy : "-",
          //                         createdBy: u.name,
          //                         createdAt: new Date(
          //                           createdAt
          //                         ).toLocaleString(),
          //                       })
          //                     )
          //                     .slice(
          //                       page * rowsPerPage,
          //                       page * rowsPerPage + rowsPerPage
          //                     )
          //                     .map((row) => {
          //                       return (
          //                         <TableRow
          //                           hover
          //                           role="checkbox"
          //                           tabIndex={-1}
          //                           key={row.code}
          //                         >
          //                           {columns.map((column) => {
          //                             if (column.id === "edit") {
          //                               if (findOrgRole) {
          //                                 if (findOrgRole === "Owner") {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     >
          //                                       <button
          //                                         type="button"
          //                                         onClick={() => {
          //                                           let content = u.sops.find(
          //                                             (e) => e._id === row._id
          //                                           );
          //                                           setEType("SOP");
          //                                           setOrgStatusContent(
          //                                             content
          //                                           );
          //                                           setOrgStatus(true);
          //                                         }}
          //                                         className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          //                                       >
          //                                         Edit Status
          //                                       </button>
          //                                     </TableCell>
          //                                   );
          //                                 } else {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     ></TableCell>
          //                                   );
          //                                 }
          //                               }
          //                             } else if (column.id === "status") {
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {row.status === "Draft" && (
          //                                     <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Draft
          //                                     </span>
          //                                   )}
          //                                   {row.status === "In Progress" && (
          //                                     <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       In Progress
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Approved" && (
          //                                     <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Approved
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Rejected" && (
          //                                     <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Rejected
          //                                     </span>
          //                                   )}
          //                                 </TableCell>
          //                               );
          //                             } else if (column.id === "view") {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   <a
          //                                     href="#"
          //                                     className="font-medium text-blue-600 hover:underline"
          //                                     onClick={(e) => {
          //                                       e.preventDefault();
          //                                       let content = u.sops.find(
          //                                         (e) => e._id === row._id
          //                                       );
          //                                       setSopContent(content);
          //                                       setSopModal(true);
          //                                     }}
          //                                   >
          //                                     View
          //                                   </a>
          //                                 </TableCell>
          //                               );
          //                             } else {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {column.format &&
          //                                   typeof value === "number"
          //                                     ? column.format(value)
          //                                     : value}
          //                                 </TableCell>
          //                               );
          //                             }
          //                           })}
          //                         </TableRow>
          //                       );
          //                     })
          //                 )}
          //             </TableBody>
          //           </Table>
          //         </TableContainer>
          //         <TablePagination
          //           rowsPerPageOptions={[8, 16, 100]}
          //           component="div"
          //           count={finalCount && finalCount}
          //           rowsPerPage={rowsPerPage}
          //           page={page}
          //           onPageChange={handleChangePage}
          //           onRowsPerPageChange={handleChangeRowsPerPage}
          //         />
          //       </div>
          //     ) : findOrgRole === "Owner" ? (
          //       <div className="relative overflow-x-auto">
          //         <TableContainer sx={{ maxHeight: "100%" }}>
          //           <Table
          //             stickyHeader
          //             aria-label="sticky table"
          //             className="custom-font-mui"
          //           >
          //             <TableHead>
          //               <TableRow>
          //                 {columns.map((column) => (
          //                   <TableCell
          //                     key={column.id}
          //                     align={column.align}
          //                     style={{ minWidth: column.minWidth }}
          //                   >
          //                     {column.label}
          //                   </TableCell>
          //                 ))}
          //               </TableRow>
          //             </TableHead>
          //             <TableBody>
          //               {orgContent &&
          //                 orgContent.orgData.map((u) =>
          //                   u.protocols
          //                     .map(
          //                       ({
          //                         title: name,
          //                         createdAt: createdAt,
          //                         _id,
          //                         status,
          //                         statusBy,
          //                       }) => ({
          //                         _id,
          //                         name,
          //                         type: "Protocol",
          //                         status,
          //                         statusBy: statusBy ? statusBy : "-",
          //                         createdBy: u.name,
          //                         createdAt: new Date(
          //                           createdAt
          //                         ).toLocaleString(),
          //                       })
          //                     )
          //                     .slice(
          //                       page * rowsPerPage,
          //                       page * rowsPerPage + rowsPerPage
          //                     )
          //                     .map((row) => {
          //                       return (
          //                         <TableRow
          //                           hover
          //                           role="checkbox"
          //                           tabIndex={-1}
          //                           key={row.code}
          //                         >
          //                           {columns.map((column) => {
          //                             if (column.id === "edit") {
          //                               if (findOrgRole) {
          //                                 if (findOrgRole === "Owner") {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     >
          //                                       <button
          //                                         type="button"
          //                                         onClick={() => {
          //                                           let content = u.protocols.find(
          //                                             (e) => e._id === row._id
          //                                           );
          //                                           setEType("Protocol");
          //                                           setOrgStatusContent(
          //                                             content
          //                                           );
          //                                           setOrgStatus(true);
          //                                         }}
          //                                         className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          //                                       >
          //                                         Edit Status
          //                                       </button>
          //                                     </TableCell>
          //                                   );
          //                                 } else {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     ></TableCell>
          //                                   );
          //                                 }
          //                               }
          //                             } else if (column.id === "status") {
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {row.status === "Draft" && (
          //                                     <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Draft
          //                                     </span>
          //                                   )}
          //                                   {row.status === "In Progress" && (
          //                                     <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       In Progress
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Approved" && (
          //                                     <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Approved
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Rejected" && (
          //                                     <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Rejected
          //                                     </span>
          //                                   )}
          //                                 </TableCell>
          //                               );
          //                             } else if (column.id === "view") {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   <a
          //                                     href="#"
          //                                     className="font-medium text-blue-600 hover:underline"
          //                                     onClick={(e) => {
          //                                       e.preventDefault();
          //                                       let content = u.protocols.find(
          //                                         (e) => e._id === row._id
          //                                       );
          //                                       setProtocolContent(content);
          //                                       setProtocolModal(true);
          //                                     }}
          //                                   >
          //                                     View
          //                                   </a>
          //                                 </TableCell>
          //                               );
          //                             } else {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {column.format &&
          //                                   typeof value === "number"
          //                                     ? column.format(value)
          //                                     : value}
          //                                 </TableCell>
          //                               );
          //                             }
          //                           })}
          //                         </TableRow>
          //                       );
          //                     })
          //                 )}
          //               {orgContent &&
          //                 orgContent.orgData.map((u) =>
          //                   u.sops
          //                     .map(
          //                       ({
          //                         title: name,
          //                         createdAt: createdAt,
          //                         _id,
          //                         status,
          //                         statusBy,
          //                       }) => ({
          //                         _id,
          //                         name,
          //                         type: "SOP",
          //                         status,
          //                         statusBy: statusBy ? statusBy : "-",
          //                         createdBy: u.name,
          //                         createdAt: new Date(
          //                           createdAt
          //                         ).toLocaleString(),
          //                       })
          //                     )
          //                     .slice(
          //                       page * rowsPerPage,
          //                       page * rowsPerPage + rowsPerPage
          //                     )
          //                     .map((row) => {
          //                       return (
          //                         <TableRow
          //                           hover
          //                           role="checkbox"
          //                           tabIndex={-1}
          //                           key={row.code}
          //                         >
          //                           {columns.map((column) => {
          //                             if (column.id === "edit") {
          //                               if (findOrgRole) {
          //                                 if (findOrgRole === "Owner") {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     >
          //                                       <button
          //                                         type="button"
          //                                         onClick={() => {
          //                                           let content = u.sops.find(
          //                                             (e) => e._id === row._id
          //                                           );
          //                                           setEType("SOP");
          //                                           setOrgStatusContent(
          //                                             content
          //                                           );
          //                                           setOrgStatus(true);
          //                                         }}
          //                                         className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          //                                       >
          //                                         Edit Status
          //                                       </button>
          //                                     </TableCell>
          //                                   );
          //                                 } else {
          //                                   return (
          //                                     <TableCell
          //                                       key={column.id}
          //                                       align={column.align}
          //                                     ></TableCell>
          //                                   );
          //                                 }
          //                               }
          //                             } else if (column.id === "status") {
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {row.status === "Draft" && (
          //                                     <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Draft
          //                                     </span>
          //                                   )}
          //                                   {row.status === "In Progress" && (
          //                                     <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       In Progress
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Approved" && (
          //                                     <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Approved
          //                                     </span>
          //                                   )}
          //                                   {row.status === "Rejected" && (
          //                                     <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          //                                       Rejected
          //                                     </span>
          //                                   )}
          //                                 </TableCell>
          //                               );
          //                             } else if (column.id === "view") {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   <a
          //                                     href="#"
          //                                     className="font-medium text-blue-600 hover:underline"
          //                                     onClick={(e) => {
          //                                       e.preventDefault();
          //                                       let content = u.sops.find(
          //                                         (e) => e._id === row._id
          //                                       );
          //                                       setSopContent(content);
          //                                       setSopModal(true);
          //                                     }}
          //                                   >
          //                                     View
          //                                   </a>
          //                                 </TableCell>
          //                               );
          //                             } else {
          //                               const value = row[column.id];
          //                               return (
          //                                 <TableCell
          //                                   key={column.id}
          //                                   align={column.align}
          //                                 >
          //                                   {column.format &&
          //                                   typeof value === "number"
          //                                     ? column.format(value)
          //                                     : value}
          //                                 </TableCell>
          //                               );
          //                             }
          //                           })}
          //                         </TableRow>
          //                       );
          //                     })
          //                 )}
          //             </TableBody>
          //           </Table>
          //         </TableContainer>
          //         <TablePagination
          //           rowsPerPageOptions={[8, 16, 100]}
          //           component="div"
          //           count={finalCount && finalCount}
          //           rowsPerPage={rowsPerPage}
          //           page={page}
          //           onPageChange={handleChangePage}
          //           onRowsPerPageChange={handleChangeRowsPerPage}
          //         />
          //       </div>
          //     ) : (
          //       <div className="w-[30%] mx-auto h-full flex items-center justify-center">
          //         <div
          //           type="button"
          //           className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          //         >
          //           <svg
          //             className="mx-auto h-12 w-12 text-gray-400"
          //             xmlns="http://www.w3.org/2000/svg"
          //             stroke="currentColor"
          //             fill="none"
          //             viewBox="0 0 48 48"
          //             aria-hidden="true"
          //           >
          //             <path
          //               strokeLinecap="round"
          //               strokeLinejoin="round"
          //               strokeWidth={2}
          //               d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          //             />
          //           </svg>
          //           <span className="mt-2 block text-sm font-medium text-gray-900">
          //             No Access
          //           </span>
          //         </div>
          //       </div>
          //     )}
          //   </div>
          // </div>
        )}
      </>
    </div>
  );
}

export default ListOrganizations;
