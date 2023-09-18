import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactQuill, { Quill } from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { createProtocol } from "../../../redux/actions/protocolActions";
import { PROTOCOL_CREATE_RESET } from "../../../redux/constants/protocolConstants";
import Loader from "../../../css/utils/Loader";
import { Chip, Stack } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import MagicUrl from "quill-magic-url";

Quill.register("modules/magicUrl", MagicUrl);

const steps = [
  {
    label: "Protocol Setup",
    number: 1,
  },
  {
    label: "Background Summary",
    number: 2,
  },
  {
    label: "Materials Checklist",
    number: 3,
  },
  {
    label: "Procedure with interactive steps",
    number: 4,
  },
  {
    label: "Figures & Images Upload",
    number: 5,
  },
  {
    label: "Results Input Feild",
    number: 6,
  },

  {
    label: "Safety Guidelines",
    number: 7,
  },
  {
    label: "Reference Links",
    number: 8,
  },

  {
    label: "Feedback & Improvement Section",
    number: 9,
  },
];

function StepperThree({
  setNewProtocol,
  setCreateNewProtocol,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [title, setTitle] = useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const protocolCreate = useSelector((state) => state.protocolCreate);
  const [dataUpload, setDataUpload] = useState([]);
  const { loading, error, sucess, protocol } = protocolCreate;

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
    const taskObject = {
      title,
      image: JSON.stringify([
        {
          name: "figuresAndImages",
          images: dataUpload,
        },
      ]),
      data: JSON.stringify(data),
    };
    await dispatch(createProtocol(taskObject));
    await dispatch({ type: PROTOCOL_CREATE_RESET });
    setLoader(false);
  };

  const fileImageHandler = async (e) => {
    let fileData = e.target.files;
    fileData.forEach((e) => {
      const imageRef = ref(storage, `files/${e.name + uuid()}`);
      uploadBytes(imageRef, e).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          dataUpload.push({
            url: url,
            name: e.name,
          });
        });
      });
    });
  };
  console.log(dataUpload);
  useEffect(() => {
    if (sucess) {
      setWhichTabisActive("listProtocols");
      setNewProtocol(true);
      setCreateNewProtocol(false);
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

  const modules = {
    magicUrl: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link"],
    ],
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
                      value={data.backgroundSummary}
                      onChange={(e) => {
                        handleChange("backgroundSummary", e);
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
                      value={data.materialsChecklist}
                      placeholder="Reagents & Equipments"
                      onChange={(e) => {
                        handleChange("materialsChecklist", e);
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
                      value={data.procedureWithInteractiveSteps}
                      onChange={(e) => {
                        handleChange("procedureWithInteractiveSteps", e);
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
                  <Stack direction="row" spacing={1}>
                    {/* {dataUpload &&
                      dataUpload.map((e) => (
                        <Chip label={e.name} color="primary" />
                      ))} */}
                  </Stack>
                </div>
              )}
              {step.number === 6 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.resultsInputField}
                      onChange={(e) => {
                        console.log(dataUpload);
                        handleChange("resultsInputField", e);
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
                      value={data.safetyGuidelines}
                      onChange={(e) => {
                        handleChange("safetyGuidelines", e);
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
                      modules={modules}
                      value={data.referenceLinks}
                      onChange={(e) => {
                        handleChange("referenceLinks", e);
                      }}
                    />
                  </div>
                </div>
              )}
              {step.number === 9 && (
                <div className="stepper-content">
                  <div className="label-input">
                    <ReactQuill
                      theme="snow"
                      value={data.feedbackAndImprovementsSection}
                      onChange={(e) => {
                        handleChange("feedbackAndImprovementsSection", e);
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
            Create New Protocol
          </Button>
          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default StepperThree;
