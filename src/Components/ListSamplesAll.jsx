import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatsAndGraphs from "./Modals/StatsAndGraphs";

function ListSamplesAll({
  setSampleContent,
  setSampleModal,
  newSample,
  setCreateNewSampleModal,
  setNewSample,
  sampleUpdate,
  setSampleUpdate,
  newSamples,
  samples,
  setViewAllSamples,
}) {
  const [data, setData] = useState(newSamples ? newSamples : []);
  const [showStats, setShowStats] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(
      samples.map(
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
  }, []);

  const renderDetailsButton = (params) => {
    return (
      <button
        type="button"
        onClick={() => {
          const docTwo =
            samples &&
            samples.find(
              (e) => JSON.parse(e.data).sampleName == params.row.name
            );

          setSampleContent(docTwo);
          setSampleModal(true);
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        View
      </button>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "recordType",
      headerName: "Record Type",
      width: 150,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      editable: false,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Last Modified At",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "view",
      headerName: "View",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <div className="project-component-inside">
      {showStats && (
        <StatsAndGraphs setShowStats={setShowStats} samples={samples} />
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
                    setViewAllSamples(false);
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

              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    All Samples
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <h1>Sample Registries</h1>
        </div>
        <div className="p-c-s-i-t-left">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowStats(true);
            }}
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-purple-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            View Stats & Graphs
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setCreateNewSampleModal(true);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New Sample
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
      <div className="p-c-s-charts">
        <Box sx={{ height: "90%", width: "100%" }}>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            rows={tableData}
            columns={columns}
            // initialState={{
            //   pagination: {
            //     paginationModel: {
            //       pageSize: 8,
            //     },
            //   },
            // }}
            // pageSizeOptions={[3]}
          />
        </Box>
      </div>
    </div>
  );
}

export default ListSamplesAll;
