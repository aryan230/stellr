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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import Loader from "../../../../css/utils/Loader";
import { storage } from "../../../../firebase";
import URL from "./../../../../Data/data.json";
import axios from "axios";
import { addProtocolLogs } from "../../../Functions/addProtocolLogs";

const steps = [
  {
    label: "Protocol Setup",
    number: 1,
  },
  {
    label: "Brief Introduction:",
    number: 2,
  },
  {
    label: "Materials and Methods",
    number: 3,
  },

  {
    label: "Step By Step Procedure",
    number: 4,
  },
  {
    label: "Figures/Charts",
    number: 5,
  },
  {
    label: "Expected Outcome",
    number: 6,
  },
  {
    label: "Possible Troubleshooting",
    number: 7,
  },
  {
    label: "Safety Notes",
    number: 8,
  },
  {
    label: "Related Protocols/Documents",
    number: 9,
  },
  {
    label: "Comments/Notes",
    number: 10,
  },
];

function UpdateProtocolStepperTwo({
  doc,
  setWhichTabisActive,
  images,
  files,
  setProtocolModal,
  setUpdateProtocolModal,
  setNewProtocol,
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState(doc && JSON.parse(doc.data));
  const [title, setTitle] = useState(doc && doc.title);
  const [activeStep, setActiveStep] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const protocolCreate = useSelector((state) => state.protocolCreate);
  const { loading, error, sucess, protocol } = protocolCreate;
  const [imageUpload, setImageUpload] = useState(images);
  const [fileUpload, setFileUpload] = useState(files);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    e.preventDefault();
    setLoader(true);
    var Newdata = JSON.stringify({
      title: title,
      data: JSON.stringify(data),
      image: JSON.stringify([
        {
          name: "figuresAndImages",
          images: imageUpload,
        },
      ]),
      file: JSON.stringify([
        {
          name: "Related Protocols/Documents",
          images: fileUpload,
        },
      ]),
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
    setLoader(false);
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

  const fileImageHandler = async (e) => {
    let fileData = e.target.files;
    fileData.forEach((e) => {
      const imageRef = ref(storage, `files/${e.name + uuid()}`);
      uploadBytes(imageRef, e).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          imageUpload.push({
            url: url,
            name: e.name,
          });
        });
      });
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
                index === 9 ? (
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
                    value={title}
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
                      value={data.briefIntroduction}
                      onChange={(e) => {
                        handleChange("briefIntroduction", e);
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
                      value={data.materialsAndMethods}
                      onChange={(e) => {
                        handleChange("materialsAndMethods", e);
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
                      value={data.stepByStepProcedure}
                      onChange={(e) => {
                        handleChange("stepByStepProcedure", e);
                      }}
                    />
                  </div>
                </div>
              )}

              {step.number === 5 && (
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
                      onChange={fileImageHandler}
                    />
                  </>
                </div>
              )}
              {step.number === 6 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.expectedOutcome}
                      onChange={(e) => {
                        handleChange("expectedOutcome", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 7 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.possibleTroubleshooting}
                      onChange={(e) => {
                        handleChange("possibleTroubleshooting", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 8 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.safetyNotes}
                      onChange={(e) => {
                        handleChange("safetyNotes", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 9 && (
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
              {step.number === 10 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.Comments}
                      onChange={(e) => {
                        handleChange("Comments", e);
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

export default UpdateProtocolStepperTwo;
