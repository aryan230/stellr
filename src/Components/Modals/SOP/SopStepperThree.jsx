import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { createProtocol } from "../../../redux/actions/protocolActions";
import { PROTOCOL_CREATE_RESET } from "../../../redux/constants/protocolConstants";
import { createSops } from "../../../redux/actions/sopActions";
import { SOP_CREATE_RESET } from "../../../redux/constants/sopConstants";
import Loader from "../../../css/utils/Loader";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
const steps = [
  {
    label: "SOP Setup",
    number: 1,
  },
  {
    label: "Application Area",
    number: 2,
  },
  {
    label: "Procedure Modules",
    number: 3,
  },
  {
    label: "Risk Assessment",
    number: 4,
  },
  {
    label: "Compliance Guidelines",
    number: 5,
  },
  {
    label: "Attachments",
    number: 6,
  },
];

function SopStepperThree({ setNewSop, setCreateNewSop, setWhichTabisActive }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const [fileUpload, setFileUpload] = useState([]);
  const sopCreate = useSelector((state) => state.sopCreate);
  const { loading, error, sucess, sop } = sopCreate;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const taskObject = {
      title,
      file: JSON.stringify([
        {
          name: "Attachments",
          images: fileUpload,
        },
      ]),
      data: JSON.stringify(data),
    };
    await dispatch(createSops(taskObject));
    await dispatch({ type: SOP_CREATE_RESET });
    setLoader(false);
    toast.success("SOP created successfully");
  };

  useEffect(() => {
    if (sucess) {
      setWhichTabisActive("listSops");
      setNewSop(true);
      setCreateNewSop(false);
    }
  }, [sucess]);

  const handleChange = (name, value) => {
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const fileHandler = async (e) => {
    let fileData = e.target.files;
    fileData.forEach((e) => {
      const imageRef = ref(storage, `files/${e.name + uuid()}`);
      uploadBytes(imageRef, e).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          fileUpload.push({
            url: url,
            name: e.name,
          });
        });
      });
    });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      {loader && <Loader />}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 6 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.number === 1 && (
                <div className="stepper-content">
                  <input
                    type="text"
                    placeholder="Enter Title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <div className="label-input">
                    <label htmlFor="">Enter Objective/Purpose</label>{" "}
                    <ReactQuill
                      theme="snow"
                      value={data.Objective}
                      onChange={(e) => {
                        handleChange("Objective", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 2 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.applicationArea}
                      onChange={(e) => {
                        handleChange("applicationArea", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 3 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.procedureModules}
                      onChange={(e) => {
                        handleChange("procedureModules", e);
                      }}
                    />
                  </div>
                </div>
              )}

              {step.number === 4 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.riskAssessment}
                      onChange={(e) => {
                        handleChange("riskAssessment", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 5 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.complianceGuidelines}
                      onChange={(e) => {
                        handleChange("complianceGuidelines", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 6 && (
                <div className="stepper-content">
                  <>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900"
                      htmlFor="multiple_files"
                    >
                      Upload multiple files
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      id="multiple_files"
                      type="file"
                      multiple="true"
                      onChange={fileHandler}
                    />
                  </>
                </div>
              )}

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            variant="contained"
            onClick={submitHandler}
            sx={{ mt: 1, mr: 1 }}
          >
            SAVE
          </Button>
          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default SopStepperThree;
