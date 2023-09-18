import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import ViewReport from "./ViewReport";
import URL from "./../../Data/data.json";

function ReportsList({ newReport, setNewReport }) {
  const [data, setData] = useState([]);
  const [viewReport, setViewReport] = useState(false);
  const [viewReportContent, setViewReportContent] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderDetailsButton = (params) => {
    return (
      <button
        type="button"
        onClick={() => {
          console.log(params.row.name);
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Download
      </button>
    );
  };
  const columns = [
    { id: "_id", label: "Report ID", minWidth: 100 },
    { id: "name", label: "Report Name", minWidth: 170 },
    { id: "createdAt", label: "Created On", minWidth: 100 },
    {
      id: "view",
      label: "View",
      minWidth: 100,
    },
    // {
    //   id: "download",
    //   label: "Download",
    //   minWidth: 100,
    // },
  ];

  useEffect(() => {
    var config = {
      method: "get",
      url: `${URL}api/reports/myreports`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (newReport) {
      var config = {
        method: "get",
        url: `${URL}api/reports/myreports`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios(config)
        .then(function(response) {
          setData(response.data);
          setNewReport(false);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }, [newReport]);
  return (
    <div className="project-component-inside-samples">
      {viewReport && (
        <ViewReport
          viewReportContent={viewReportContent}
          setViewReport={setViewReport}
        />
      )}
      <div className="p-c-s-i-t">
        <div className="ps-c-it-inside">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
            </ol>
          </nav>

          <h1>Reports </h1>
        </div>

        <div className="p-c-s-i-t-left">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          >
            Download Reports
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Report
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
      <div className="main-content-inside-reports-main">
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                              <TableCell key={column.id} align={column.align}>
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
                              <TableCell key={column.id} align={column.align}>
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
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
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
      </div>
    </div>
  );
}

export default ReportsList;
