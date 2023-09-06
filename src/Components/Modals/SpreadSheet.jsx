import React, { useEffect, useRef, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import SpreadSheetContainerMain from "../SpreadSheetContainers/SpreadSheetContainerMain";
import { db } from "../../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { Button, Menu, MenuItem } from "@mui/material";
import { saveAs } from "file-saver";

// import Luckysheet from "../SpreadSheetContainers/Luckysheet";
// import luckysheet from "luckysheet";
// import "luckysheet/dist/plugins/js/plugin.js";

function SpreadSheet({ name, id, setIsSpreadSheetOpen }) {
  const luckysheet = window.luckysheet;
  const [data, setData] = useState();
  const [changeData, setChangeData] = useState();
  const container = useRef();
  const [loader, setLoader] = useState(true);
  const fetchFirestoreData = async () => {
    setLoader(true);
    const unsub = await onSnapshot(doc(db, "sheet", id), (doc) => {
      if (doc.data()) {
        setData(doc.data());
        setLoader(false);
      } else {
        setData(null);
        setLoader(false);
      }
    });
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);
  const [read, setRead] = useState(false);
  useEffect(() => {
    if (container.current) {
      var options = {
        container: "container", //luckysheet为容器id
        showinfobar: false,
        // plugins: ["chart"],
        showsheetbar: false,
        data: data && JSON.parse(data.data),
        // data: [sheetData],
        enableAddRow: true,
        showtoolbar: true,
        showtoolbarConfig: {
          chart: false, //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
          postil: false, //'comment'
          pivotTable: false, //'PivotTable'
          function: false, //'formula'
          frozenMode: false, //'freeze mode'
          protection: false, // 'Worksheet protection'
          print: false, // 'Print'
          link: false,
          currencyFormat: false,
          image: false,
          screenshot: false,
          splitColumn: false,
          dataVerification: false,
        },
        allowUpdate: false,
        enableAddBackTop: true,
      };
      luckysheet.create(options);
    }
  }, [data]);

  const exportToCSV = () => {
    // Retrieve LuckySheet data
    const data = luckysheet.getLuckysheetfile() || {};
    console.log(data);
    // Convert LuckySheet data to CSV format

    const csvData = data.map((row) => row.map((cell) => cell.text).join(","));

    // Create a CSV blob and save it
    const csvBlob = new Blob([csvData.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(csvBlob, "spreadsheet.csv");
  };

  const handleSaveData = async (e) => {
    e.preventDefault();
    const sheetData = luckysheet.getluckysheetfile();
    if (sheetData == null) return;
    await setDoc(doc(db, "sheet", id), {
      name: name,
      data: JSON.stringify(sheetData),
      date: Date.now(),
    });
    // Get the spreadsheet data
    // TODO: Save sheetData using your preferred method (e.g., API call, local storage)
  };

  console.log(data && data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="modal">
      <div className="spreadsheet-modal">
        <div className="top-modal">
          <div className="top-modal-content">
            <h1>{name}</h1>
            <button onClick={handleSaveData}>Save</button>
          </div>
          {/* <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Export Excel
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={exportToCSV}>CSV</MenuItem>
          </Menu> */}
          <button
            onClick={async (e) => {
              await handleSaveData(e);
              setIsSpreadSheetOpen(false);
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
        </div>{" "}
        {/* <Luckysheet /> */}
        {/* <SpreadSheetContainerMain
              height="100%"
              data={data ? JSON.parse(data.data) : {}}
              setChangeData={setChangeData}
              options={
                read && {
                  mode: "read",
                  showToolbar: false,
                  showGrid: false,
                  showContextmenu: false,
                }
              }
            /> */}
        <div
          className="main-modal-spreadsheet"
          id="container"
          ref={container}
        ></div>
      </div>
    </div>
  );
}

export default SpreadSheet;
