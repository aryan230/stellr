import React, { useState } from "react";
import { useSelector } from "react-redux";
import BasicArea from "../Charts/BasicArea";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Pie from "../Charts/Pie";

function ViewReport({ viewReportContent, setViewReport }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [mainData, setMainData] = useState(viewReportContent);
  const [chartsData, setChartsData] = useState(
    JSON.parse(viewReportContent.dataSet).charts
  );
  const [insideDataIn, setInsideData] = useState(
    JSON.parse(JSON.parse(viewReportContent.dataSet).insideData).map(
      ({
        sampleId: id,
        data: name,
        createdAt: createdAt,
        type: recordType,
        updatedAt: updatedAt,
      }) => ({
        id: `SAM-000${id}`,
        name: JSON.parse(name).sampleName,
        createdAt: new Date(createdAt).toLocaleString("en-GB").split(",")[0],
        recordType,
        updatedAt: new Date(updatedAt).toLocaleString("en-GB").split(",")[0],
        createdDate: createdAt,
        createdBy: userInfo.name,
        view: "View",
      })
    )
  );
  const columns = [
    { id: "id", label: "Sample Id", minWidth: 100 },
    { id: "name", label: "Sample Name", minWidth: 170 },
    { id: "recordType", label: "Sample Type", minWidth: 170 },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(chartsData);
  return (
    <div className="modal">
      <div className="view-report-modal">
        <div className="top-modal">
          <button
            onClick={(e) => {
              setViewReport(false);
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
        <div className="view-report-charts">
          {chartsData.map(
            (e) =>
              e === "area" && (
                <div className="py-10">
                  <BasicArea newSamples={insideDataIn ? insideDataIn : null} />
                </div>
              )
          )}
          {chartsData.map(
            (e) =>
              e === "pie" && (
                <div className="py-10">
                  <Pie
                    newSamples={
                      JSON.parse(
                        JSON.parse(viewReportContent.dataSet).insideData
                      )
                        ? JSON.parse(
                            JSON.parse(viewReportContent.dataSet).insideData
                          )
                        : []
                    }
                  />
                </div>
              )
          )}
        </div>
        <div className="view-report-data-grid">
          <TableContainer sx={{ maxHeight: 300 }}>
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
                {insideDataIn &&
                  insideDataIn.length > 0 &&
                  insideDataIn
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
            rowsPerPageOptions={[4, 25, 100]}
            component="div"
            count={insideDataIn && insideDataIn.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewReport;
