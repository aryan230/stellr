import React, { useEffect, useRef, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import SpreadSheetContainerMain from "../SpreadSheetContainers/SpreadSheetContainerMain";
import { db } from "../../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  SheetDirective,
  SpreadsheetComponent,
  getSheetIndex,
} from "@syncfusion/ej2-react-spreadsheet";
import { registerLicense } from "@syncfusion/ej2-base";

// import Luckysheet from "../SpreadSheetContainers/Luckysheet";
// import luckysheet from "luckysheet";
// import "luckysheet/dist/plugins/js/plugin.js";

registerLicense(
  "ORg4AjUWIQA/Gnt2VlhhQlJCfV5CQmFMYVF2R2BJfl56dl1MZVVBNQtUQF1hSn5adEBiWXxccXdXT2Fe"
);

function NewSpreadSheet({ name, id, setIsSpreadSheetOpen }) {
  const spreadsheetRef = useRef(null);
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

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

  const handleCellSave = async (args) => {
    if (spreadsheetRef.current) {
      const sheetData = spreadsheetRef.current.sheets[0].rows; // Assuming there's only one sheet
      const newData = sheetData.map((row) =>
        row.cells.map((cell) => cell.value)
      );
      // const spreadsheetInstance = this.spreadsheetRef.current.getInstance();
      // const data = spreadsheetInstance.getActiveSheet().usedRange;
      console.log(JSON.stringify(newData));
      // await setDoc(doc(db, "sheet", id), {
      //   name: name,
      //   data: newData,
      //   date: Date.now(),
      // });
      // You can also send the data to a server if needed
    }
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  const onCellSave = (args) => {
    handleGetData();
  };

  const onDataChanged = (args) => {
    console.log(spreadsheetRef.getSheet());
  };

  const [spreadsheetData, setSpreadsheetData] = useState([]);

  // Event handler to capture data
  const handleGetData = async () => {
    if (spreadsheetRef.current) {
      let newObject = [
        {
          id: 1,
          name: "Sheet1",
          rowCount: 100,
          colCount: 100,
          rows: spreadsheetRef.current.sheets[0].rows,
          columns: spreadsheetRef.current.sheets[0].columns,
          showHeaders: true,
          showGridLines: true,
          state: "Visible",
          maxHgts: [],
          isProtected: false,
          frozenRows: 0,
          frozenColumns: 0,
        },
      ];
      await setDoc(doc(db, "sheet", id), {
        name: name,
        data: JSON.stringify(newObject),
        date: Date.now(),
      });
      console.log("Saved");
    }
  };

  useEffect(() => {
    if (spreadsheetRef) {
      if (document.querySelector(".e-toolbar-item")) {
        console.log(document.querySelector(".e-toolbar-item"));
      }
    }
  }, [document.querySelector(".e-toolbar-item"), spreadsheetRef]);

  return (
    <div className="modal">
      <div className="spreadsheet-modal">
        <div className="top-modal">
          <div className="top-modal-content">
            <h1>{name}</h1>
            {/* <button onClick={handleSaveData}>Save</button> */}
          </div>
          <button
            onClick={async (e) => {
              await onCellSave();
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
        <div className="main-modal-spreadsheet">
          <SpreadsheetComponent
            ref={spreadsheetRef}
            sheets={data && data.data ? JSON.parse(data.data) : []}
            openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
            saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
          ></SpreadsheetComponent>
        </div>
      </div>
    </div>
  );
}

export default NewSpreadSheet;
