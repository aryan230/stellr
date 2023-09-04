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

const steps = [
  {
    label: "SOP Setup",
    number: 1,
  },
  {
    label: "Scope",
    number: 2,
  },
  {
    label: "Responsibilities",
    number: 3,
  },
  {
    label: "Procedure Steps",
    number: 4,
  },
  {
    label: "Revision History",
    number: 5,
  },
  {
    label: "Safety Precautions",
    number: 6,
  },
];

function SopStepper({ setNewSop, setCreateNewSop, setWhichTabisActive }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [loader, setLoader] = useState(false);
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
      data: JSON.stringify(data),
    };
    await dispatch(createSops(taskObject));
    await dispatch({ type: SOP_CREATE_RESET });
    setLoader(false);
    toast.success("Sop created successfully");
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
                      value={data.Scope}
                      onChange={(e) => {
                        handleChange("Scope", e);
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
                      value={data.Responsibilities}
                      onChange={(e) => {
                        handleChange("Responsibilities", e);
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
                      value={data.Procedure}
                      onChange={(e) => {
                        handleChange("Procedure", e);
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
                      value={data.revisionHistory}
                      onChange={(e) => {
                        handleChange("revisionHistory", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 6 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.safetyPrecautions}
                      onChange={(e) => {
                        handleChange("safetyPrecautions", e);
                      }}
                    />
                  </div>
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
            Create New SOP
          </Button>
          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default SopStepper;
