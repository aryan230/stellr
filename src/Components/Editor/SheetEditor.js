import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import React, { useRef } from "react";

function SheetEditor({
  tab,
  active,
  project,
  userType,
  setProjectSettings,
  setNewCollab,
  setProjectUpdatedProfilers,
  setUpdatedUserCollabRole,
  setEntryUpdate,
  setWhichTabisActive,
  setSampleContent,
  setSampleModal,
}) {
  const spreadsheetRef = useRef(null);
  return (
    <div className={`editor-holder-reactjs ${active && "active"}`} id={tab._id}>
      <SpreadsheetComponent
        ref={spreadsheetRef}
        sheets={[]}
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
      ></SpreadsheetComponent>
    </div>
  );
}

export default SheetEditor;
