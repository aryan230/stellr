import React, { useEffect, useState } from "react";
import URL from "./../../../../Data/data.json";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Select from "react-select";
import MainLoaderWithText from "../../../Loaders/MainLoaderWithText";
import HelperText from "../../../../UI/Input/HelperText";
import _ from "lodash";
function CustomFeildTeplate({
  setCustomFeild,
  customSampleData,
  setCustomSampleData,
}) {
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [newField, setNewField] = useState();
  const [fieldOptions, setFieldOptions] = useState();
  const [selectedField, setSelectedField] = useState();
  const [loader, setLoader] = useState(false);
  const [placeholder, setPlaceholder] = useState();
  const [slug, setSlug] = useState();
  const [loaderText, setLoaderText] = useState("Loading");
  const fields = [
    {
      name: "Text",
    },
    {
      name: "Textarea",
    },
    {
      name: "Integer",
    },
    {
      name: "Rich Text Editor",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Date",
    },
  ];
  const handleAddFeild = async () => {
    setLoaderText("Creating new field");
    setLoader(true);
    let textBlock = {
      type,
      isRequired: false,
      slug,
      placeholder,
    };
    var data = JSON.stringify({
      name,
      description,
      data: JSON.stringify(textBlock),
    });

    var config = {
      method: "post",
      url: `${URL[0]}api/fields`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(async function(response) {
        toast.success(`Custom field with ${name} was successfully created`);
        setLoaderText("Adding feild to your sample data");
        await setCustomSampleData((current) => [
          ...current,
          {
            id: response.data._id,
            name: response.data.name,
            type: JSON.parse(response.data.data).type,
            description: description,
            placeholder: JSON.parse(response.data.data).placeholder,
            slug: JSON.parse(response.data.data).placeholder,
          },
        ]);
        setLoader(false);
        setCustomFeild(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleAddFieldInSample = async () => {
    if (selectedField) {
      setLoaderText("Adding Field to your sample data");
      setLoader(true);
      window.setTimeout(async () => {
        await setCustomSampleData((current) => [
          ...current,
          {
            id: selectedField.value,
            name: selectedField.label,
            type: JSON.parse(selectedField.data).type,
            description: description,
            placeholder: JSON.parse(selectedField.data).placeholder,
            slug: JSON.parse(selectedField.data).slug,
          },
        ]);
        setLoader(false);
        setCustomFeild(false);
      }, 3000);
    }
  };

  const getMyFields = async () => {
    var config = {
      method: "get",
      url: `${URL}api/fields/myfields`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function(response) {
        console.log(response.data);
        if (response.data.length > 0) {
          console.log();
          setFieldOptions(
            response.data.map(({ name: label, _id: value, ...rest }) => ({
              value,
              label,
              ...rest,
            }))
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!fieldOptions) {
      getMyFields();
    }
  }, [fieldOptions]);

  return (
    <div className="modal">
      <div className="relative w-full max-w-xl max-h-full">
        {loader && <MainLoaderWithText text={loaderText} />}

        {/* Modal content */}
        {/* border-2 border-slate-700 */}
        <div className="relative bg-white rounded-xl shadow max-h-[80vh] overflow-y-auto custom-scrollbar-task">
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 py-8 border-b rounded-t sticky top-0 bg-white z-50">
            <h3 className="text-xl font-medium text-gray-900">
              Add Custom Feild
            </h3>

            <button
              onClick={() => {
                setCustomFeild(false);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="extralarge-modal"
            >
              <svg
                className="w-3 h-3"
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6 min-h-[50%] max-h-fit">
            <>
              <div className="flex items-center pl-4 border border-gray-200 rounded">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  defaultValue=""
                  name="bordered-radio"
                  onClick={(e) => {
                    setNewField("exist");
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
                >
                  Use an existing Field
                </label>
              </div>
              {newField && newField === "exist" && (
                <div className="w-[80%] py-10 mx-auto">
                  {" "}
                  <Select
                    options={fieldOptions ? fieldOptions : []}
                    onChange={(e) => setSelectedField(e)}
                    placeholder="Select Field"
                    required
                  />{" "}
                  <div className="margin-maker"></div>
                  <button
                    type="submit"
                    onClick={handleAddFieldInSample}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Add Feild
                  </button>
                </div>
              )}
              <div className="flex items-center pl-4 border border-gray-200 rounded">
                <input
                  defaultChecked=""
                  id="bordered-radio-2"
                  type="radio"
                  defaultValue=""
                  name="bordered-radio"
                  onClick={(e) => {
                    setNewField("new");
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
                >
                  Created New Field
                </label>
              </div>
            </>

            {newField && newField === "new" && (
              <div className="w-[80%] mx-auto">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter Name for New Field
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Field Name"
                    required=""
                    onChange={(e) => {
                      setName(e.target.value);
                      setSlug(_.camelCase(e.target.value));
                    }}
                  />
                </div>

                <div className="my-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description"
                    defaultValue={""}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

                <div className="my-4">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select a Field Type
                  </label>
                  <select
                    id="countries"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected="true" disabled>
                      Select a field
                    </option>
                    {fields.map((f) => (
                      <option value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter Value for Placeholer
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Placeholer"
                    required=""
                    onChange={(e) => {
                      setPlaceholder(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter Slug
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Slug"
                    required=""
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                    }}
                  />
                </div>
                <HelperText text="This field is used to hold your filed with a custom variable" />
                <div className="margin-maker"></div>
                {/* <div className="flex items-center my-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Is Required
                  </label>
                </div> */}

                <button
                  type="submit"
                  onClick={handleAddFeild}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Add Feild
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomFeildTeplate;
