import React, { useState } from "react";
import Select from "react-select";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { downloadObjectAsJson } from "../../Functions/downloadJson";
import { Alert } from "@mui/material";
import mammoth from "mammoth/mammoth.browser";
import htmlDocx from "html-docx-fixed/dist/html-docx";
const zip = new JSZip();

function ExportModal({ setExportModal, quill }) {
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
    {
      value: "DOCX",
      label: "DOCX",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
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
</style>
</head>
<body>
${quill.root.innerHTML}
</body>
</html>
    `;
    if (selectedExport.value === "HTML") {
      let entry = zip.folder("entry");
      entry.file(`entry.html`, html);
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `export.zip`);
      });
    } else if (selectedExport.value === "JSON") {
      const deltas = quill.getContents();
      const quillToWordConfig = {
        exportAs: "blob",
      };
      if (!deltas) {
        return alert("Content not found");
      }
      downloadObjectAsJson(deltas.ops, "editor-text");
    } else if (selectedExport.value === "DOCX") {
      const quillContents = quill.root.innerHTML;

      var converted = htmlDocx.asBlob(quillContents);
      saveAs(converted, "test.docx");
    } else {
      html2pdf()
        .from(html)
        .save();
    }
  };
  return (
    <div className="settings-modal">
      <div className="settings-modal-inside">
        <div className="top-modal">
          <button
            onClick={() => {
              setExportModal(false);
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
        <div className="settings-top-modal-top">
          <div className="setting-top-modal-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M14.375 12.5L14.375 3.75L3.75 3.75L3.75 12.5L14.375 12.5Z"
                fill="white"
                stroke="black"
                stroke-opacity="0.65"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M26.25 26.25V17.5L15.625 17.5L15.625 26.25H26.25Z"
                fill="white"
                stroke="black"
                stroke-opacity="0.65"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M19.375 3.75V12.5H26.25V3.75H19.375Z"
                fill="white"
                stroke="black"
                stroke-opacity="0.65"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 17.5L3.75 26.25H10.625V17.5H3.75Z"
                fill="white"
                stroke="black"
                stroke-opacity="0.65"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
            <h1>Export entry</h1>
          </div>
          <div className="setting-main-div-modal">
            <div className="settings-main-div-modal-inside">
              <div className="s-m-d-i-right">
                <form onSubmit={handleSubmit}>
                  {" "}
                  <Select
                    options={roleOptions}
                    onChange={(e) => setSelectedExport(e)}
                    placeholder="Select Format"
                    required
                  />
                  {selectedExport &&
                    selectedExport.value &&
                    selectedExport.value === "PDF" && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        The PDF export is still under development.
                      </Alert>
                    )}
                  <div className="margin-maker"></div>
                  <button type="submit">Download</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
