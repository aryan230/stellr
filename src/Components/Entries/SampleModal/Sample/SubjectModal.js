import { Box, Chip, Drawer, makeStyles } from "@mui/material";
import React, { useState } from "react";
import _ from "lodash";
import DrawerSample from "./DrawerSample";
import UpdateSampleModal from "./UpdateSampleModal";
import NewSampleHeader from "./NewSampleHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { PaperClipIcon, UserCircleIcon } from "@heroicons/react/solid";
import { CSVDownload, CSVLink } from "react-csv";

function SubjectModal({
  doc,
  setSampleModal,
  insideData,
  setSampleUpdate,
  setIsDrawerOpenLogs,
  setIsDrawerVersion,
}) {
  const [data, setData] = useState(
    Object.entries(insideData).map((e) => ({
      name: _.startCase(e[0]),
      value: e[1],
    }))
  );
  const [activeTab, setActiveTab] = useState("data");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const columns = [
    { id: "name", label: "Entity Name", minWidth: 170 },
    { id: "value", label: "Entity Value", minWidth: 100 },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableStyle = {
    fontFamily: "GothamBook", // Replace 'Your-Font-Family' with the desired font family
  };
  return (
    <div className="sample-modal-container-main">
      <div className="top-modal">
        <button
          onClick={(e) => {
            setSampleModal(false);
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
      <div className="sample-modal-container-inside">
        {isDrawerOpen && (
          <UpdateSampleModal
            doc={doc}
            setSampleModal={setSampleModal}
            insideData={insideData}
            setSampleUpdate={setSampleUpdate}
            setIsDrawerOpen={setIsDrawerOpen}
            type="subject"
          />
        )}

        <NewSampleHeader setActiveTab={setActiveTab} activeTab={activeTab} />
        {activeTab === "home" && (
          <div className="main-content-inside-modals">
            {" "}
            <div className="bg-white  sm:rounded-lg  h-[100%] overflow-y-auto custom-scrollbar-task">
              <div className="py-10">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Data inside {JSON.parse(doc.data).sampleName}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {data && data.length}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-gray-200 px-4 py-15 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Sample Unique ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {doc._id}
                    </dd>
                  </div>

                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Sample Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {JSON.parse(doc.data).sampleName}
                    </dd>
                  </div>

                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Last Modified By
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {doc.logs.length > 0
                        ? doc.logs.slice(-1)[0].userEmail
                        : "Not yet Updated"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
        {activeTab === "timeline" && (
          <div className="main-content-inside-modals">
            <Timeline position="alternate">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  Created on {new Date(doc.createdAt).toLocaleString()}
                </TimelineContent>
              </TimelineItem>
              {doc.logs &&
                doc.logs.length > 0 &&
                doc.logs.map((l) => (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      Updated on {new Date(l.date).toLocaleString()}
                    </TimelineContent>
                  </TimelineItem>
                ))}
            </Timeline>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="main-content-inside-modals">
            <div className="inside-modal-main-content-edit">
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-2">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Edit Content
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  Edit and customize your content easily. Make changes, updates,
                  and improvements to your data with just a few clicks.
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDrawerOpen(true);
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Edit Sample
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-2">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    View Logs
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  Click here to access detailed logs of activities and events.
                  Keep track of important information with our comprehensive
                  logging system.
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDrawerOpenLogs(true);
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  View Logs
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-2">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Export Sample
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  Click the link below to download the file in CSV format
                </p>

                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  <CSVLink data={data} filename={"my-file.csv"} target="_blank">
                    Download Sample
                  </CSVLink>

                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "data" && (
          <div className="main-content-inside-modals">
            <TableContainer sx={{ maxHeight: 400 }}>
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
                  {data &&
                    data.length > 0 &&
                    data
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
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 25, 100]}
              component="div"
              count={data && data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* <div class="relative overflow-x-auto h-[100%]">
            <table class="w-[90%] mx-auto text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Entity Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Entity Value
                  </th>
                </tr>
              </thead>
              <tbody className="h-[20%]">
                {data &&
                  data.length > 0 &&
                  data.map((d) => (
                    <tr class="bg-white border-b">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {_.startCase(d[0])}
                      </th>
                      <td class="px-6 py-4">{d[1]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div> */}
          </div>
        )}

        {/* new sample ends here */}
        {/* <div className="xl:col-span-5 col-span-12 lg:col-span-7">
          <div className="card h-full">
            <div className="card-header">
              <h4 className="card-title">About Sample</h4>
            </div>
            <div className="card-body p-6">
              <div>
                <div className="text-base font-medium text-slate-800">
                  {insideData.sampleName}
                </div>
                <p className="text-sm text-slate-600 ">
                  The Optimistic Website Company - Amet minim mollit non
                  deserunt ullamco est sit aliqua dolor do amet sint.
                </p>
                <br />
                <p className="text-sm text-slate-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.The Optimistic Website Company - Amet minim Amet
                  minim mollit non deserunt ullamco est sit aliqua dolor do amet
                  sint.The Optimistic Website Company - Amet minim mollit non
                  deserunt ullamco est sit aliqua dolor do amet sint. Velit
                  officia consequat duis enim velit mollit. Exercita -tion
                  veniam consequat sunt nostrud amet.
                </p>
                <div className="flex flex-wrap mt-8">
                  <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                    <div className="font-semibold text-slate-500 ">
                      View Your Sample At
                    </div>
                    <div className="flex items-center  text-md font-normal text-indigo-600  rtl:space-x-reverse">
                      <iconify-icon icon="heroicons:link" />
                      <a href="#">View Link</a>
                    </div>
                  </div>
                  <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                    <div className="font-semibold text-slate-500 ">
                      Download
                    </div>
                    <div className="flex items-center  text-md font-normal text-indigo-600  rtl:space-x-reverse">
                      <iconify-icon icon="heroicons:link" />
                      <a href="#">Download Sample</a>
                    </div>
                  </div>
                </div>
              

                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Entity Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Entity Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="h-64 overflow-y-auto">
                      {data &&
                        data.length > 0 &&
                        data.map((d) => (
                          <tr class="bg-white border-b">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {_.startCase(d[0])}
                            </th>
                            <td class="px-6 py-4">{d[1]}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SubjectModal;
