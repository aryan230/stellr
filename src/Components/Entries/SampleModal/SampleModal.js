import { Box, Chip, Drawer } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Clinical from "../../Modals/Sample/Clinical";
import ClinicalModal from "./Sample/ClinicalModal";
import SubjectModal from "./Sample/SubjectModal";
import MolecularModal from "./Sample/MolecularModal";
import Reagent from "../../Modals/Sample/Reagent";
import ReagentModal from "./Sample/ReagentModal";
import DrawerLogsSample from "./Sample/DrawerLogsSample";
import DrawerVersionControl from "./DrawerVersionControl";
import AntiBody from "../../Modals/Sample/AntiBody";
import AntibodyModal from "./Sample/AntibodyModal";
import CustomSampleModal from "./Sample/CustomSampleModal";

function SampleModal({
  doc,
  setSampleModal,
  setWhichTabisActive,
  setSampleUpdate,
}) {
  const [insideData, setInsideData] = useState(JSON.parse(doc.data));
  const userLogin = useSelector((state) => state.userLogin);
  const [isDrawerOpenLogs, setIsDrawerOpenLogs] = useState(false);
  const [isDrawerVersion, setIsDrawerVersion] = useState(false);
  let { loading, error, userInfo } = userLogin;

  return (
    <div className="modal">
      <Drawer
        anchor="right"
        open={isDrawerOpenLogs}
        onClose={() => setIsDrawerOpenLogs(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerLogsSample task={doc} setIsDrawerOpen={setIsDrawerOpenLogs} />
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={isDrawerVersion}
        onClose={() => setIsDrawerVersion(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerVersionControl
            doc={doc}
            setIsDrawerVersion={setIsDrawerVersion}
          />
        </Box>
      </Drawer>
      {insideData.sampleTypeInsideCustom === "Custom" && (
        <CustomSampleModal
          doc={doc}
          insideData={insideData}
          setSampleModal={setSampleModal}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
          setIsDrawerOpenLogs={setIsDrawerOpenLogs}
          setIsDrawerVersion={setIsDrawerVersion}
        />
      )}
      {doc.type === "Subject/Patient" && (
        <SubjectModal
          doc={doc}
          insideData={insideData}
          setSampleModal={setSampleModal}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
          setIsDrawerOpenLogs={setIsDrawerOpenLogs}
          setIsDrawerVersion={setIsDrawerVersion}
        />
      )}
      {doc.type === "Clinical" && (
        <ClinicalModal
          doc={doc}
          insideData={insideData}
          setSampleModal={setSampleModal}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
          setIsDrawerOpenLogs={setIsDrawerOpenLogs}
          setIsDrawerVersion={setIsDrawerVersion}
        />
      )}
      {doc.type === "Molecular Biology" && (
        <MolecularModal
          doc={doc}
          insideData={insideData}
          setSampleModal={setSampleModal}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
          setIsDrawerOpenLogs={setIsDrawerOpenLogs}
          setIsDrawerVersion={setIsDrawerVersion}
        />
      )}
      {doc.type === "Reagent" && (
        <ReagentModal
          doc={doc}
          insideData={insideData}
          setSampleModal={setSampleModal}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
          setIsDrawerOpenLogs={setIsDrawerOpenLogs}
          setIsDrawerVersion={setIsDrawerVersion}
        />
      )}
      {doc.type === "Primer" && (
        <ReagentModal
          doc={doc}
          insideData={insideData}
          setSampleModal={setSampleModal}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
          setIsDrawerOpenLogs={setIsDrawerOpenLogs}
          setIsDrawerVersion={setIsDrawerVersion}
        />
      )}
      {doc.type === "Antibody" && (
        <AntibodyModal
          doc={doc}
          insideData={insideData}
          setSampleModal={setSampleModal}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
          setIsDrawerOpenLogs={setIsDrawerOpenLogs}
          setIsDrawerVersion={setIsDrawerVersion}
        />
      )}
    </div>
  );
}

export default SampleModal;
