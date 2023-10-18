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
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
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
    { id: "type", label: "Entity Type", minWidth: 170 },
    { id: "status", label: "Entity Status", minWidth: 170 },
    { id: "createdBy", label: "Created By", minWidth: 170 },
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
        orgsCollab[0].collaborators.find((e) => e.user == userInfo._id).userType
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
      const { sendData: data, logData, type, user } = JSON.parse(
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
          <div className="project-component-inside">
            {/* <div className="project-c-header">
              <div className="project-c-header-left">
                <h1>Browse Organizations </h1>
                <input
                  type="text"
                  placeholder={`Search Organizations`}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </div>
            </div> */}
            <nav className="bg-white border-gray-200 py-10">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?background=random&name=${findOrg &&
                      findOrg.name}`}
                    className="h-8 mr-3"
                    alt="Organization Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap">
                    {findOrg && findOrg.name}
                  </span>
                </a>
                <button
                  data-collapse-toggle="navbar-default"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
                <div
                  className="hidden w-full md:block md:w-auto"
                  id="navbar-default"
                >
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          if (findOrg) {
                            e.preventDefault();
                            setOrgContentSettings(findOrg);
                            setOrgSettings(true);
                          }
                        }}
                        className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                        aria-current="page"
                      >
                        View Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="project-c-bottom">
              <div className="relative overflow-x-auto">
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    className="custom-font-mui"
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orgContent &&
                        orgContent.orgData.map((u) =>
                          u.protocols
                            .map(
                              ({
                                title: name,
                                createdAt: createdAt,
                                _id,
                                status,
                                statusBy,
                              }) => ({
                                _id,
                                name,
                                type: "Protocol",
                                status,
                                statusBy,
                                createdBy: u.name,
                                createdAt: new Date(createdAt).toLocaleString(),
                              })
                            )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.code}
                                >
                                  {columns.map((column) => {
                                    if (column.id === "edit") {
                                      if (findOrgRole) {
                                        if (findOrgRole === "Owner") {
                                          return (
                                            <TableCell
                                              key={column.id}
                                              align={column.align}
                                            >
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  let content = u.protocols.find(
                                                    (e) => e._id === row._id
                                                  );
                                                  setEType("Protocol");
                                                  setOrgStatusContent(content);
                                                  setOrgStatus(true);
                                                }}
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                              >
                                                Edit Status
                                              </button>
                                            </TableCell>
                                          );
                                        } else {
                                          return (
                                            <TableCell
                                              key={column.id}
                                              align={column.align}
                                            ></TableCell>
                                          );
                                        }
                                      }
                                    } else if (column.id === "status") {
                                      return (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                        >
                                          {row.status === "Draft" && (
                                            <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              Draft
                                            </span>
                                          )}
                                          {row.status === "In Progress" && (
                                            <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              In Progress
                                            </span>
                                          )}
                                          {row.status === "Approved" && (
                                            <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              Approved
                                            </span>
                                          )}
                                          {row.status === "Rejected" && (
                                            <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              Rejected
                                            </span>
                                          )}
                                        </TableCell>
                                      );
                                    } else if (column.id === "view") {
                                      const value = row[column.id];
                                      return (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                        >
                                          <a
                                            href="#"
                                            className="font-medium text-blue-600 hover:underline"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              let content = u.protocols.find(
                                                (e) => e._id === row._id
                                              );
                                              setProtocolContent(content);
                                              setProtocolModal(true);
                                            }}
                                          >
                                            View
                                          </a>
                                        </TableCell>
                                      );
                                    } else {
                                      const value = row[column.id];
                                      return (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                        >
                                          {column.format &&
                                          typeof value === "number"
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                      );
                                    }
                                  })}
                                </TableRow>
                              );
                            })
                        )}
                      {orgContent &&
                        orgContent.orgData.map((u) =>
                          u.sops
                            .map(
                              ({
                                title: name,
                                createdAt: createdAt,
                                _id,
                                status,
                                statusBy,
                              }) => ({
                                _id,
                                name,
                                type: "SOP",
                                status,
                                statusBy,
                                createdBy: u.name,
                                createdAt: new Date(createdAt).toLocaleString(),
                              })
                            )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.code}
                                >
                                  {columns.map((column) => {
                                    if (column.id === "edit") {
                                      if (findOrgRole) {
                                        if (findOrgRole === "Owner") {
                                          return (
                                            <TableCell
                                              key={column.id}
                                              align={column.align}
                                            >
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  let content = u.sops.find(
                                                    (e) => e._id === row._id
                                                  );
                                                  setEType("SOP");
                                                  setOrgStatusContent(content);
                                                  setOrgStatus(true);
                                                }}
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                              >
                                                Edit Status
                                              </button>
                                            </TableCell>
                                          );
                                        } else {
                                          return (
                                            <TableCell
                                              key={column.id}
                                              align={column.align}
                                            ></TableCell>
                                          );
                                        }
                                      }
                                    } else if (column.id === "status") {
                                      return (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                        >
                                          {row.status === "Draft" && (
                                            <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              Draft
                                            </span>
                                          )}
                                          {row.status === "In Progress" && (
                                            <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              In Progress
                                            </span>
                                          )}
                                          {row.status === "Approved" && (
                                            <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              Approved
                                            </span>
                                          )}
                                          {row.status === "Rejected" && (
                                            <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                              Rejected
                                            </span>
                                          )}
                                        </TableCell>
                                      );
                                    } else if (column.id === "view") {
                                      const value = row[column.id];
                                      return (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                        >
                                          <a
                                            href="#"
                                            className="font-medium text-blue-600 hover:underline"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              let content = u.sops.find(
                                                (e) => e._id === row._id
                                              );
                                              setSopContent(content);
                                              setSopModal(true);
                                            }}
                                          >
                                            View
                                          </a>
                                        </TableCell>
                                      );
                                    } else {
                                      const value = row[column.id];
                                      return (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                        >
                                          {column.format &&
                                          typeof value === "number"
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                      );
                                    }
                                  })}
                                </TableRow>
                              );
                            })
                        )}
                      {/* {data &&
                        data.length > 0 &&
                        data
                          .map(
                            ({
                              name: name,
                              description,
                              createdAt: createdAt,
                              _id,
                            }) => ({
                              _id,
                              name,
                              description,
                              createdAt: new Date(createdAt).toLocaleString(),
                            })
                          )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column) => {
                                  if (column.id === "download") {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        <button
                                          type="button"
                                          onClick={() => {}}
                                          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                        >
                                          Download
                                        </button>
                                      </TableCell>
                                    );
                                  } else if (column.id === "view") {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        <a
                                          href="#"
                                          className="font-medium text-blue-600 hover:underline"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            let content = data.find(
                                              (e) => e._id === row._id
                                            );
                                            setViewReportContent(content);
                                            setViewReport(true);
                                          }}
                                        >
                                          View
                                        </a>
                                      </TableCell>
                                    );
                                  } else {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  }
                                })}
                              </TableRow>
                            );
                          })} */}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[8, 16, 100]}
                  component="div"
                  count={finalCount && finalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/* <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Entity Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Entity Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Entity Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Entity Created by
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Approved/Declined by
                      </th>
                      <th scope="col" className="px-6 py-3">
                        View
                      </th>
                      {findOrgRole === "Owner" && (
                        <th scope="col" className="px-6 py-3">
                          Edit
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {orgContent &&
                      orgContent.orgData.map((u) =>
                        u.protocols.map((p) => (
                          <tr className="bg-white border-b">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              {p.title}
                            </th>
                            <td className="px-6 py-4">Protocol</td>
                            <td className="px-6 py-4">
                              {p.status === "Draft" && (
                                <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  Draft
                                </span>
                              )}
                              {p.status === "In Progress" && (
                                <span className="bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  In Progress
                                </span>
                              )}
                              {p.status === "Approved" && (
                                <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  Approved
                                </span>
                              )}
                              {p.status === "Rejected" && (
                                <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  Rejected
                                </span>
                              )}
                            </td>

                            <td className="px-6 py-4">{u.name}</td>
                            <td className="px-6 py-4">
                              {p.statusBy ? p.statusBy : "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              {" "}
                              <a
                                href="#"
                                onClick={(e) => {
                                  setProtocolContent(p);
                                  setProtocolModal(true);
                                }}
                                className="font-medium text-blue-600 hover:underline"
                              >
                                View
                              </a>
                            </td>
                            {findOrgRole === "Owner" && (
                              <td className="px-6 py-4">
                                {" "}
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    setOrgStatusContent(p);
                                    setOrgStatus(true);
                                  }}
                                  className="font-medium text-blue-600 hover:underline"
                                >
                                  Edit Status
                                </a>
                              </td>
                            )}
                          </tr>
                        ))
                      )}
                  </tbody>
                </table> */}
              </div>

              {/* {orgs &&
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
                  ))} */}
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default ListOrganizations;
