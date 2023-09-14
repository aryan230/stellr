import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  listMyCollabProjects,
  listMyOrgProjects,
  listMyProjects,
} from "../../redux/actions/projectActions";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../../redux/actions/organizationActions";
import { useNavigate } from "react-router-dom";
import { listMyEntries } from "../../redux/actions/entryActions";
import { downloadObjectAsJson } from "../Functions/downloadJson";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { quillGetHTML } from "../Functions/quillGetHTML";
import InsideLoader from "../Loader/InsideLoader";
import SecondInsideLoader from "../Loader/SecondInsideLoader";
import html2pdf from "html2pdf.js";
import { Alert } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const zip = new JSZip();
function DataExport({ setDataExport }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedExport, setSelectedExport] = useState();

  const roleOptions = [
    {
      label: "HTML",
      value: "HTML",
    },
    {
      value: "JSON",
      label: "JSON",
    },
    {
      value: "PDF",
      label: "PDF",
    },
  ];

  const [project, setProject] = useState();
  const [exportType, setExportType] = useState();
  const [loader, setLoader] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectListMy = useSelector((state) => state.projectListMy);
  const {
    projects,
    loading: loadingOrders,
    error: errorOrders,
  } = projectListMy;

  const projecListMyCollab = useSelector((state) => state.projecListMyCollab);
  const {
    projects: projectsCollab,
    loading: projectCollabLoading,
    error: errorCollabLoading,
  } = projecListMyCollab;

  const projectListMyOrg = useSelector((state) => state.projectListMyOrg);
  const {
    projects: projectsOrg,
    loading: projectOrgLoading,
    error: errorOrgLoading,
  } = projectListMyOrg;

  const entriesListMy = useSelector((state) => state.entriesListMy);
  const {
    entries,
    loading: loadingEntries,
    error: errorEntries,
  } = entriesListMy;

  let newArr =
    projects && projectsCollab && projectsOrg
      ? _.unionBy(projects, projectsCollab, projectsOrg, "_id")
      : _.unionBy(projects, projectsCollab, "_id");

  const allOptionsValue =
    newArr &&
    newArr.map(({ _id: value, name: label }) => ({
      value,
      label,
    }));

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listMyProjects());
      dispatch(listMyCollabProjects());
      dispatch(listMyOrgProjects());
      dispatch(listMyOrgs());
      dispatch(listMyCollabOrgs());
    }
  }, [dispatch, navigate, userInfo]);

  const exportAsJSON = async () => {
    let entryJSON = zip.folder("entryJSON");
    let auditLogs = zip.folder("Audit Logs");
    entries.forEach((element) => {
      entryJSON.file(
        `${element.name}.json`,
        JSON.stringify(element.data[0].block.ops)
      );
    });
    const d = new jsPDF();
    const templateOptions =
      newArr.find((e) => e._id === project.value).logs &&
      newArr
        .find((e) => e._id === project.value)
        .logs.map(({ user, userEmail, message, date }) => [
          user,
          userEmail,
          message,
          new Date(date).toLocaleString(),
        ]);
    console.log(templateOptions);
    autoTable(d, { html: "#my-table" });
    autoTable(d, {
      head: [["Name", "Email", "Message", "Date"]],
      body: templateOptions,
    });
    const blobPDF = new Blob([d.output("blob")], {
      type: "application/pdf",
    });
    auditLogs.file("Audit-logs.pdf", blobPDF);
    window.setTimeout(() => {
      setLoader(false);
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(
          content,
          `${newArr.find((e) => e._id == project.value).name}.zip`
        );
      });
    }, 3000);
  };

  const exportAsHTML = async () => {
    let entryHTML = zip.folder("entryHTML");
    let auditLogs = zip.folder("Audit Logs");
    entries.forEach(async (element) => {
      const value = await quillGetHTML(entries[0].data[0].block.ops);
      let html = `
      <html>
  <head>
  <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css">
  <style>
  .mention {
    height: 24px;
    width: 65px;
    border-radius: 6px;
    background-color: #4655ff;
    color: white;
    padding: 3px 0;
    margin-right: 2px;
    user-select: all;
  }
  
  .mention > span {
    margin: 0 3px;
  }
  
  a#file-opener {
    &::after {
      content: attr(title);
    }
  
    &:hover {
      cursor: pointer;
    }
  }
  
  button#spreadsheet-opener {
    &::after {
      content: attr(dataName);
    }
  
    &:hover {
      cursor: pointer;
    }
  }
  #spreadsheet-opener {
    background-color: transparent;
    border: 0px;
    width: 20%;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.625rem;
    background: #188038;
    color: #fff;
    font-family: Poppins;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    transition: 0.2s all;
 }
  #spreadsheet-opener p {
    color: #000;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
 }
  #spreadsheet-opener img {
    width: 3rem;
    margin-right: 0.25rem;
 }
  #spreadsheet-opener:hover {
    cursor: pointer;
    transform: scale(1.01);
 }
  
  </style>
  </head>
  <body>
  ${value}
  </body>
  </html>
      `;
      entryHTML.file(`${element.name}.html`, html);
    });
    const d = new jsPDF();
    const templateOptions =
      newArr.find((e) => e._id === project.value).logs &&
      newArr
        .find((e) => e._id === project.value)
        .logs.map(({ user, userEmail, message, date }) => [
          user,
          userEmail,
          message,
          new Date(date).toLocaleString(),
        ]);
    console.log(templateOptions);
    autoTable(d, { html: "#my-table" });
    autoTable(d, {
      head: [["Name", "Email", "Message", "Date"]],
      body: templateOptions,
    });
    const blobPDF = new Blob([d.output("blob")], {
      type: "application/pdf",
    });
    auditLogs.file("Audit-logs.pdf", blobPDF);
    window.setTimeout(() => {
      setLoader(false);
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(
          content,
          `${newArr.find((e) => e._id == project.value).name}.zip`
        );
      });
    }, 3000);
  };

  const exportAsPDF = async () => {
    let entry = zip.folder("entry");
    let auditLogs = zip.folder("Audit Logs");
    entries.forEach(async (element) => {
      const value = await quillGetHTML(entries[0].data[0].block.ops);
      let html = `
      <html>
  <head>
  <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css">
  <style>
  .mention {
    height: 24px;
    width: 65px;
    border-radius: 6px;
    background-color: #4655ff;
    color: white;
    padding: 3px 0;
    margin-right: 2px;
    user-select: all;
  }
  
  .mention > span {
    margin: 0 3px;
  }
  
  a#file-opener {
    &::after {
      content: attr(title);
    }
  
    &:hover {
      cursor: pointer;
    }
  }
  
  button#spreadsheet-opener {
    &::after {
      content: attr(dataName);
    }
  
    &:hover {
      cursor: pointer;
    }
  }
  #spreadsheet-opener {
    background-color: transparent;
    border: 0px;
    width: 20%;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.625rem;
    background: #188038;
    color: #fff;
    font-family: Poppins;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    transition: 0.2s all;
 }
  #spreadsheet-opener p {
    color: #000;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
 }
  #spreadsheet-opener img {
    width: 3rem;
    margin-right: 0.25rem;
 }
  #spreadsheet-opener:hover {
    cursor: pointer;
    transform: scale(1.01);
 }
  
  </style>
  </head>
  <body>
  ${value}
  </body>
  </html>
      `;
      const ele = await html2pdf()
        .from(html)
        .outputPdf();
      entry.file(`${element.name}.pdf`, ele);
    });
    const d = new jsPDF();
    const templateOptions =
      newArr.find((e) => e._id === project.value).logs &&
      newArr
        .find((e) => e._id === project.value)
        .logs.map(({ user, userEmail, message, date }) => [
          user,
          userEmail,
          message,
          new Date(date).toLocaleString(),
        ]);
    console.log(templateOptions);
    autoTable(d, { html: "#my-table" });
    autoTable(d, {
      head: [["Name", "Email", "Message", "Date"]],
      body: templateOptions,
    });
    const blobPDF = new Blob([d.output("blob")], {
      type: "application/pdf",
    });
    auditLogs.file("Audit-logs.pdf", blobPDF);
    window.setTimeout(() => {
      setLoader(false);
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(
          content,
          `${newArr.find((e) => e._id == project.value).name}.zip`
        );
      });
    }, 3000);
  };

  const handleSubmit = async () => {
    setLoader(true);
    await dispatch(listMyEntries(project.value));
    if (!loadingEntries) {
      switch (selectedExport.value) {
        case "JSON":
          exportAsJSON();
          break;
        case "HTML":
          exportAsHTML();
          break;
        case "PDF":
          exportAsPDF();
          break;
      }
      // if (selectedExport.value === "JSON") {
      // } else if (selectedExport.value === "HTML") {
      // } else {
      // }
    }
  };

  return (
    <div className="modal">
      <div className="data-e-modal">
        {" "}
        <div className="top-modal">
          <button
            onClick={() => {
              setDataExport(false);
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
        {loader ? (
          <div className="d-e-loader">
            <span class="loader-two"></span>
            <h2> Generating your export.</h2>
            <p> This may take few minutes.</p>
          </div>
        ) : (
          <>
            {" "}
            <h1>Export data</h1>
            <div className="form-element">
              <Select
                options={allOptionsValue}
                onChange={(e) => setProject(e)}
                placeholder="Select Project"
                required
              />
              <div className="margin-maker"></div>
              {project && (
                <Select
                  options={roleOptions}
                  onChange={(e) => setSelectedExport(e)}
                  placeholder="Select Format"
                  required
                />
                // <div className="container">
                //   <div className="grid-wrapper grid-col-auto">
                //     <label htmlFor="radio-card-1" className="radio-card">
                //       <input
                //         type="radio"
                //         name="radio-card"
                //         id="radio-card-1"
                //         defaultChecked=""
                //         onChange={(e) => {
                //           setExportType("json");
                //         }}
                //       />
                //       <div className="card-content-wrapper">
                //         <span className="check-icon" />
                //         <div className="card-content">
                //           <h4>JSON</h4>
                //           <h5>
                //             All the entries will be downloded in the format of
                //             JSON.
                //           </h5>
                //         </div>
                //       </div>
                //     </label>
                //     <label htmlFor="radio-card-2" className="radio-card">
                //       <input
                //         type="radio"
                //         name="radio-card"
                //         id="radio-card-2"
                //         onChange={(e) => {
                //           setExportType("html");
                //         }}
                //       />
                //       <div className="card-content-wrapper">
                //         <span className="check-icon" />
                //         <div className="card-content">
                //           <h4>HTML</h4>
                //           <h5>
                //             All the entries will be downloded in the format of
                //             HTML.
                //           </h5>
                //         </div>
                //       </div>
                //     </label>
                //     <label htmlFor="radio-card-3" className="radio-card">
                //       <input
                //         type="radio"
                //         name="radio-card"
                //         id="radio-card-3"
                //         onChange={(e) => {
                //           setExportType("html");
                //         }}
                //       />
                //       <div className="card-content-wrapper">
                //         <span className="check-icon" />
                //         <div className="card-content">
                //           <h4>HTML</h4>
                //           <h5>
                //             All the entries will be downloded in the format of
                //             HTML.
                //           </h5>
                //         </div>
                //       </div>
                //     </label>
                //   </div>
                // </div>
              )}
              {selectedExport &&
                selectedExport.value &&
                selectedExport.value === "PDF" && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    The PDF export is still under development.
                  </Alert>
                )}
              {selectedExport && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Export Data
                </button>
              )}
              {/*  */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DataExport;
