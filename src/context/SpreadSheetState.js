import React, { useState } from "react";
import SpreadSheetContext from "./spreadSheetContext";

function SpreadSheetState(props) {
  const [user, setState] = useState({
    status: "smething",
  });
  const updateState = () => {
    setState(true);
  };
  return (
    <SpreadSheetContext.Provider value={user}>
      {props.children}
    </SpreadSheetContext.Provider>
  );
}

export default SpreadSheetState;
