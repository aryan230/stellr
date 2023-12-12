import React, { useState } from "react";
import BasicModalTailwind from "../../UI/MainModals/BasicModalTailwind";
import MainLoaderWithText from "../Loaders/MainLoaderWithText";
import SpinnerLoader from "../Loaders/SpinnerLoader";

function SubmitForApproval({ open, setOpen }) {
  const [loader, setLoader] = useState(true);

  return (
    <BasicModalTailwind open={open} setOpen={setOpen}>
      {loader && <SpinnerLoader text="Updating" />}
      <h1>Submitting For Approval</h1>
    </BasicModalTailwind>
  );
}

export default SubmitForApproval;
