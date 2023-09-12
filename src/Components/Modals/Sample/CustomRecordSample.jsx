import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function CustomRecordSample({
  projects,
  setSampleModal,
  sampleType,
  setNewSample,
  setWhichTabisActive,
}) {
  const maxNumber = 4;
  const [steps, setSteps] = useState([
    {
      label: "",
      number: 1,
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (e) => {
    let items = steps;
    let item = steps[activeStep];
    item.label = e;
    items[activeStep] = item;
    setSteps(items);
  };

  const submitHandler = async () => {
    console.log(steps);
  };

  const addNewStep = () => {
    setSteps(
      // Replace the state
      [
        // with a new array
        ...steps, // that contains all the old items
        { label: "", number: steps.length + 1 }, // and one new item at the end
      ]
    );
  };

  useEffect(() => {
    console.log(steps);
  }, [steps]);

  return (
    <div className="custom-sample-record">
      <div className="top-header-custom-sample">
        <div className="top-header-left-custom">
          {steps &&
            steps.map(
              (e) =>
                e.label && (
                  <span
                    id="badge-dismiss-default"
                    className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded"
                  >
                    {e.label}
                    <button
                      type="button"
                      className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900"
                      data-dismiss-target="#badge-dismiss-default"
                      aria-label="Remove"
                    >
                      <svg
                        className="w-2 h-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                )
            )}
        </div>
        <div className="top-header-right-custom">
          <a
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            onClick={addNewStep}
          >
            Add New
          </a>
        </div>
      </div>
      <div className="main-div-custom-template">
        {" "}
        <div className="py-5">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter Record Name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps &&
            steps.map((step, index) => (
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
                  {step && (
                    <div className="stepper-content">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Enter Field Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          defaultValue={step.label}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder={`${step.label}`}
                          onChange={(e) => {
                            handleChange(e.target.value);
                          }}
                        />
                      </div>

                      <label
                        for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Select Feild Type
                      </label>
                      <select
                        id="countries"
                        onChange={(e) => {
                          steps[index].type = e.target.value;
                        }}
                        defaultValue={step.type}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="rte">Rich Text Editor</option>
                      </select>
                      <div className="margin-maker"></div>
                    </div>
                  )}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      {/* {index != steps.length - 1 && (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Remove
                        </Button>
                      )} */}

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
              Create New Template
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </Paper>
        )}
      </div>
    </div>
  );
}

export default CustomRecordSample;
