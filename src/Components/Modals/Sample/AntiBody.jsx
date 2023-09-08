import React, { useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
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
import ReactQuill from "react-quill";
import Loader from "../../../css/utils/Loader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createSample } from "../../../redux/actions/sampleActions";
import { SAMPLE_CREATE_RESET } from "../../../redux/constants/sampleConstants";

const steps = [
  {
    label: "General Information",
    number: 1,
  },
  {
    label: "Select",
    number: 2,
  },
  {
    label: "Other Informations",
    number: 3,
  },

  {
    label: "Validation & Quality Control",
    number: 4,
  },
  {
    label: "Supplier & Ordering",
    number: 5,
  },
  {
    label: "Attachments",
    number: 6,
  },
];

function AntiBody({
  projects,
  setSampleModal,
  sampleType,
  setNewSample,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [imageUpload, setImageUpload] = useState([]);
  const [fileUpload, setFileUpload] = useState([]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const sampleCreate = useSelector((state) => state.sampleCreate);
  const { loading, error, sucess, sample: sampleCreated } = sampleCreate;

  const submitHandler = async (e) => {
    e.preventDefault();
    data.images = JSON.stringify([
      {
        name: "Attachments",
        images: fileUpload,
      },
    ]);
    const newData = JSON.stringify(data);
    const taskObject = {
      type: sampleType.value,
      data: newData,
      assigned: {},
    };

    await dispatch(createSample(taskObject));
    await dispatch({ type: SAMPLE_CREATE_RESET });
  };

  useEffect(() => {
    if (sucess) {
      setNewSample(true);
      setWhichTabisActive("sampleList");
      setSampleModal(false);
    }
  }, [sucess]);

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 5 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.number === 1 && (
                <div className="stepper-content">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Antibody Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        value={data.sampleName}
                        onChange={(e) => {
                          handleChange("sampleName", e.target.value);
                        }}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Antibody Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={data.Description}
                        onChange={(e) => {
                          handleChange("Description", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="margin-maker"></div>
                </div>
              )}
              {step.number === 2 && (
                <div className="stepper-content">
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Isotype
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={data.Isotype}
                      onChange={(e) => {
                        handleChange("Isotype", e.target.value);
                      }}
                    >
                      <option value="IgG">IgG</option>
                      <option value="IgM"> IgM</option>
                      <option value="IgA">IgA</option>
                      <option value="IgD">IgD</option>
                      <option value="IgE">IgE</option>
                    </select>
                  </div>
                  <div className="margin-maker"></div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Species Reactivity
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={data.speciesReactivity}
                      onChange={(e) => {
                        handleChange("speciesReactivity", e.target.value);
                      }}
                    >
                      <option>Human</option>
                      <option>Mouse</option>
                      <option>Rat</option>
                      <option>Rabbit</option>
                      <option>Chicken</option>
                    </select>
                  </div>
                  <div className="margin-maker"></div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Host Species
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={data.hostSpecies}
                      onChange={(e) => {
                        handleChange("hostSpecies", e.target.value);
                      }}
                    >
                      <option>Rabbit</option>
                      <option>Mouse</option>
                      <option>Goat</option>
                      <option>Sheep</option>
                    </select>
                  </div>
                </div>
              )}
              {step.number === 3 && (
                <div className="stepper-content">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Clone Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Clone Number"
                        value={data.cloneNumber}
                        onChange={(e) => {
                          handleChange("cloneNumber", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Epitope
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Epitope"
                        value={data.Epitope}
                        onChange={(e) => {
                          handleChange("Epitope", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Recommended Applications
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={data.recommendedApplications}
                      onChange={(e) => {
                        handleChange("recommendedApplications", e.target.value);
                      }}
                    >
                      <option>Western Blot</option>
                      <option>Immunohistochemistry</option>
                      <option>ELISA</option>
                      <option>Flow Cytometry</option>
                    </select>
                  </div>
                  <div className="margin-maker"></div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dilution
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Dilution"
                        value={data.Dilution}
                        onChange={(e) => {
                          handleChange("Dilution", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Storage Buffer
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Storage Buffer"
                        value={data.storageBuffer}
                        onChange={(e) => {
                          handleChange("storageBuffer", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Storage Temperature
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={data.storageTemperature}
                      onChange={(e) => {
                        handleChange("storageTemperature", e.target.value);
                      }}
                    >
                      <option>-20°C</option>
                      <option>-80°C</option>
                      <option>4°C</option>
                      <option>Room Temperature</option>
                    </select>
                  </div>
                  <div className="margin-maker"></div>
                </div>
              )}

              {step.number === 4 && (
                <div className="stepper-content">
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Validation Methods
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={data.validationMethods}
                      onChange={(e) => {
                        handleChange("validationMethods", e.target.value);
                      }}
                    >
                      <option>Western Blot</option>
                      <option>Direct ELISA</option>
                      <option>Flow Cytometry</option>
                      <option>Immunofluorescence</option>
                    </select>
                  </div>
                  <div className="margin-maker"></div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Lot No.
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Lot No."
                        value={data.LotNo}
                        onChange={(e) => {
                          handleChange("LotNo", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="date"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Lot No."
                        value={data.expirationDate}
                        onChange={(e) => {
                          handleChange("expirationDate", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="label-input">
                    <label htmlFor="">QC Reports</label>{" "}
                    <ReactQuill
                      theme="snow"
                      value={data.qCReports}
                      onChange={(e) => {
                        handleChange("qCReports", e);
                      }}
                    />
                  </div>
                </div>
              )}

              {step.number === 5 && (
                <div className="stepper-content">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Supplier Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Supplier Name"
                        value={data.supplierName}
                        onChange={(e) => {
                          handleChange("supplierName", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Supplier Catalog Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Supplier Catalog Number"
                        value={data.supplierCatalogNumber}
                        onChange={(e) => {
                          handleChange("supplierCatalogNumber", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="number"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Price"
                        value={data.Price}
                        onChange={(e) => {
                          handleChange("Price", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Order Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="date"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Price"
                        value={data.OrderDate}
                        onChange={(e) => {
                          handleChange("OrderDate", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Arrival Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="date"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Price"
                        value={data.ArrivalDate}
                        onChange={(e) => {
                          handleChange("ArrivalDate", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Volume/Amount
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="number"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Volume/Amount (with unit e.g., µl, mg)"
                        value={data.Volume}
                        onChange={(e) => {
                          handleChange("Volume", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="label-input">
                    <label htmlFor="">Notes</label>{" "}
                    <ReactQuill
                      theme="snow"
                      value={data.Notes}
                      onChange={(e) => {
                        handleChange("Notes", e);
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
            Create New Sample
          </Button>
          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default AntiBody;
