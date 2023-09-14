import { Box, Chip, Drawer } from "@mui/material";
import React, { useState } from "react";
import _ from "lodash";
import DrawerSample from "./DrawerSample";
import UpdateSampleModal from "./UpdateSampleModal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import NewSampleHeader from "./NewSampleHeader";
function MolecularModal({
  doc,
  setSampleModal,
  insideData,
  setSampleUpdate,
  setIsDrawerOpenLogs,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState(
    Object.entries(insideData).map((e) => ({
      name: _.startCase(e[0]),
      value: _.startCase(e[1]),
    }))
  );
  const [activeTab, setActiveTab] = useState("data");
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
            type="molecular"
          />
        )}
        {/* new sample starts here */}
        <NewSampleHeader setActiveTab={setActiveTab} activeTab={activeTab} />
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
        {/* <div className="sample-modal-container-top-div">
          <div className="sample-modal-top-left">
            <div className="sample-modal-top-left-top">
              <h1>Sample Name - {insideData.sampleName}</h1>
            </div>
            <p>Created at {doc.createdAt}</p>
            <a
              className="text-indigo-500"
              onClick={(e) => {
                e.preventDefault();
                setIsDrawerOpenLogs(true);
              }}
            >
              View Logs
            </a>
            <a
              className="text-indigo-500 ml-5"
              onClick={(e) => {
                e.preventDefault();
                setIsDrawerOpen(true);
              }}
            >
              Edit Sample
            </a>
          </div>
          <div className="sample-modal-top-right"></div>
        </div>
        <div className="sample-modal-main-container">
          <div className="view-logs-inside">
            {data &&
              data.length > 0 &&
              data.map((d) =>
                d[0] == "volume" ? (
                  <div className="content-logs-inside">
                    <h2>{_.startCase(d[0])}</h2>
                    <h2 className="log-message-h2">{d[1]} (ng/L)</h2>
                  </div>
                ) : d[0] == "volumeRemaining" ? (
                  <div className="content-logs-inside">
                    <h2>{_.startCase(d[0])}</h2>
                    <h2 className="log-message-h2">{d[1]} (ng/L)</h2>
                  </div>
                ) : (
                  <div className="content-logs-inside">
                    <h2>{_.startCase(d[0])}</h2>
                    <h2 className="log-message-h2">{d[1]}</h2>
                  </div>
                )
              )}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default MolecularModal;
