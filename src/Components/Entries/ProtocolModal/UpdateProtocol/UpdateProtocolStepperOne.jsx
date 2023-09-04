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
import Loader from "../../../../css/utils/Loader";
import _ from "lodash";
import axios from "axios";
import URL from "./../../../../Data/data.json";
import { addProtocolLogs } from "../../../Functions/addProtocolLogs";
const steps = [
  {
    label: "Protocol Setup",
    number: 1,
  },
  {
    label: "Scope",
    number: 2,
  },
  {
    label: "Procedure Steps",
    number: 3,
  },
  {
    label: "Required Reagents and Materials",
    number: 4,
  },
  {
    label: "Safety Precautions",
    number: 5,
  },
  {
    label: "Expected Results",
    number: 6,
  },
];

function UpdateProtocolStepperOne({
  doc,
  setWhichTabisActive,
  setNewProtocol,
  setUpdateProtocolModal,
  setProtocolModal,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(doc && doc.title);
  const [data, setData] = useState(doc && JSON.parse(doc.data));
  const [activeStep, setActiveStep] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const protocolCreate = useSelector((state) => state.protocolCreate);
  const { loading, error, sucess, protocol } = protocolCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(doc);

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
    var Newdata = JSON.stringify({
      title: title,
      data: JSON.stringify(data),
    });

    var config = {
      method: "put",
      url: `${URL[0]}api/protocols/${doc._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: Newdata,
    };

    axios(config)
      .then(async function(response) {
        const logObject = {
          entryId: doc._id,
          user: userInfo._id,
          userName: userInfo.name,
          userEmail: userInfo.email,
          message: `Updated the protocol with the id ${doc._id}`,
        };
        await addProtocolLogs(logObject);

        setProtocolModal(false);
        setUpdateProtocolModal(false);
        setNewProtocol(true);
        setWhichTabisActive("listProtocols");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (sucess) {
      setWhichTabisActive("listProtocols");
      //   setNewProtocol(true);
      //   setCreateNewProtocol(false);
    }
  }, [sucess]);
  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     if (title != null) {
  //       console.log(
  //         title,
  //         valueObjective,
  //         valueScope,
  //         valueProcedure,
  //         valueMaterials,
  //         valueSafety
  //       );
  //     }
  //   };

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
                index === steps.length - 1 ? (
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
                    value={title}
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
                      value={data.procedureSteps}
                      onChange={(e) => {
                        handleChange("procedureSteps", e);
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
                      value={data.requiredReagentsAndMaterials}
                      onChange={(e) => {
                        handleChange("requiredReagentsAndMaterials", e);
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
                      value={data.safetyPrecautions}
                      onChange={(e) => {
                        handleChange("safetyPrecautions", e);
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
                      value={data.Results}
                      onChange={(e) => {
                        handleChange("Results", e);
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
            Update Protocol
          </Button>
          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default UpdateProtocolStepperOne;
