import React, { useState } from "react";
import Quill from "quill";
import { v4 as uuidv4 } from "uuid";

function SpreadSheetName({
  setSpreadsheeName,
  setSpreadsheetNameInside,
  quill,
}) {
  const [name, setName] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setSpreadsheeName(false);
    let range = quill.getSelection(true);
    quill.insertText(range.index, "\n", Quill.sources.USER);
    quill.insertEmbed(
      range.index + 1,
      "button",
      {
        dataName: name,
        dataId: uuidv4(),
        id: "spreadsheet-opener",
        class: "spreadsheet-opener",
      },
      Quill.sources.USER
    );
    quill.setSelection(range.index + 2, Quill.sources.SILENT);
  };
  return (
    <div className="settings-modal">
      <div className="settings-modal-inside">
        <div className="top-modal">
          <button
            onClick={() => {
              setSpreadsheeName(false);
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
                d="M26.25 2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V26.25C2.5 26.5815 2.6317 26.8995 2.86612 27.1339C3.10054 27.3683 3.41848 27.5 3.75 27.5H26.25C26.5815 27.5 26.8995 27.3683 27.1339 27.1339C27.3683 26.8995 27.5 26.5815 27.5 26.25V3.75C27.5 3.41848 27.3683 3.10054 27.1339 2.86612C26.8995 2.6317 26.5815 2.5 26.25 2.5V2.5ZM10 25H5V20H10V25ZM10 17.5H5V12.5H10V17.5ZM10 10H5V5H10V10ZM17.5 25H12.5V20H17.5V25ZM17.5 17.5H12.5V12.5H17.5V17.5ZM17.5 10H12.5V5H17.5V10ZM25 25H20V20H25V25ZM25 17.5H20V12.5H25V17.5ZM25 10H20V5H25V10Z"
                fill="url(#paint0_linear_251_257)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_251_257"
                  x1="15"
                  y1="2.5"
                  x2="15"
                  y2="27.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#5D00D2" />
                  <stop offset="1" stop-color="#BD88FF" />
                </linearGradient>
              </defs>
            </svg>
            <h1>Create new Spreadsheet</h1>
          </div>
          <div className="setting-main-div-modal">
            <div className="settings-main-div-modal-inside">
              <div className="s-m-d-i-right">
                <form onSubmit={handleSubmit}>
                  {" "}
                  <input
                    type="text"
                    placeholder="Enter the name of your sheet"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button type="submit">Save</button>
                  <div
                    className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
                    role="alert"
                  >
                    <span className="font-medium">
                      Once a spreadsheet is created you can import your existing
                      spreadsheet directly into the spreadsheet. (csv,xlsx)
                    </span>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpreadSheetName;
