import React, { useState, Fragment, useEffect } from "react";
import CustomFeildTeplate from "./CustomFeildTeplate";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import URL from "./../../../../Data/data.json";
import MainLoaderWithText from "../../../Loaders/MainLoaderWithText";
import { Code2 } from "lucide-react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  SearchIcon,
  SelectorIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CustomSampleTemplate({ setCustomSample, setSampleModal }) {
  const [customFeild, setCustomFeild] = useState(false);
  const [customSampleData, setCustomSampleData] = useState([
    {
      name: "Sample Name",
      slug: "sampleName",
      id: "34",
      type: "Text",
      placeholder: "Sample Name",
    },
  ]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [loader, setLoader] = useState(true);
  const [loaderText, setLoaderText] = useState(
    "Loading your custom Template Dashboard"
  );
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (customSampleData.length < 2) {
      toast.error("Please add atleast 2 fields to create a template");
      setLoader(false);
      return;
    }
    console.log(name, customSampleData);
    var data = JSON.stringify({
      name,
      description,
      data: JSON.stringify(customSampleData),
    });

    var config = {
      method: "post",
      url: `${URL[0]}api/sampleTemplates`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function(response) {
        setLoader(false);
        setCustomSample(false);
        setSampleModal(false);
        toast.success(`Custom Sample with ${name} was successfully created`);
      })
      .catch(function(error) {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    window.setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);
  return (
    <div className="modal">
      {customFeild && (
        <CustomFeildTeplate
          setCustomFeild={setCustomFeild}
          customSampleData={customSampleData}
          setCustomSampleData={setCustomSampleData}
        />
      )}
      <div className="relative w-full max-w-7xl max-h-full">
        {loader && (
          <MainLoaderWithText
            text={loaderText ? loaderText : " Creating your custom Template"}
          />
        )}
        {/* Modal content */}
        {/* border-2 border-slate-700 */}
        <div className="relative bg-white rounded-xl shadow max-h-[80vh] overflow-y-auto custom-scrollbar-task">
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 py-8 border-b rounded-t sticky top-0 bg-white z-50">
            <h3 className="text-xl font-medium text-gray-900">
              Custom Templates
            </h3>

            <button
              onClick={() => {
                setCustomSample(false);
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
          <div className="p-6 space-y-6 min-h-[50vh]">
            <div className="custom-sample-template">
              <div className="cst-left">
                <div className="mb-3">
                  <span className="bg-indigo-600 text-white text-md font-medium mr-2 px-2.5 py-1 rounded font-karla w-fit flex items-center justify-center">
                    <Code2 color="#ffffff" size={16} className="mr-2" />
                    Fields: {customSampleData.length}
                  </span>
                </div>
                <ul role="list" className="divide-y divide-gray-200">
                  {customSampleData && customSampleData.length > 0 ? (
                    customSampleData.map((d) => (
                      <li
                        key={d.id}
                        className="relative col-span-1 flex shadow-sm rounded-md"
                      >
                        <div
                          className={classNames(
                            "bg-indigo-600",
                            "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                          )}
                        >
                          {d.name.match(/\b(\w)/g).join("")}
                        </div>
                        <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                          <div className="flex-1 px-4 py-2 text-sm truncate">
                            <a
                              href="#"
                              className="text-gray-900 font-medium hover:text-gray-600 font-body"
                            >
                              {d.name}
                            </a>
                            <p className="text-gray-500 font-karla">{d.type}</p>
                          </div>
                          <Menu as="div" className="flex-shrink-0 pr-2">
                            <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none">
                              <span className="sr-only">Open options</span>
                              <DotsVerticalIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-sm"
                                        )}
                                      >
                                        View
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-sm"
                                        )}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setCustomSampleData((current) =>
                                            current.filter((f) => {
                                              return f.id != d.id;
                                            })
                                          );
                                        }}
                                      >
                                        Remove from Template
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-sm"
                                        )}
                                      >
                                        Share
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="w-[100%] h-full flex-col items-center justify-center">
                      <img
                        src="https://niceillustrations.com/wp-content/themes/illustrater/assets/images/no-result.png"
                        alt=""
                        className="w-48"
                      />
                      <span>
                        No fields added, you can add upto five fields.
                      </span>
                    </div>
                  )}
                </ul>
                {customSampleData.length != 20 && (
                  <div className="mt-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (customSampleData.length < 20) {
                          setCustomFeild(true);
                        } else {
                          toast.error("You have already added 5 fields");
                        }
                      }}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Add new feild{" "}
                      <button
                        data-popover-target="popover-description"
                        data-popover-placement="bottom-end"
                        type="button"
                      >
                        <svg
                          className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Show information</span>
                      </button>
                    </a>
                  </div>
                )}

                {/* <ul className="max-w-md divide-y divide-gray-200">
                  {customSampleData && customSampleData.length > 0 ? (
                    customSampleData.map((d) => (
                      <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/code-512.png"
                              alt="Neil image"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {d.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {d.type}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCustomSampleData((current) =>
                                  current.filter((f) => {
                                    return f.name != d.name;
                                  })
                                );
                              }}
                              className="font-medium text-red-600 hover:underline"
                            >
                              remove
                            </a>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <>Nothing</>
                  )}
                </ul> */}
              </div>
              <div className="cst-right">
                <form
                  className="cst-right-inside"
                  onSubmit={handleSaveTemplate}
                >
                  <h1 className="flex items-center text-2xl font-extrabold">
                    Custom Sample Template
                  </h1>
                  <div className="margin-maker"></div>
                  <div className="my-4">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter Name for New Template
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Template Name"
                      required="true"
                      onChange={(e) => {
                        setName(e.target.value);
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
                      required
                      defaultValue={""}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (customSampleData.length < 20) {
                        setCustomFeild(true);
                      } else {
                        toast.error("You have already added 5 fields");
                      }
                    }}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Add new feild{" "}
                    <button
                      data-popover-target="popover-description"
                      data-popover-placement="bottom-end"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Show information</span>
                    </button>
                  </a>
                  <br />
                  <button
                    type="submit"
                    // onClick={handleSaveTemplate}
                    className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Save Template
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSampleTemplate;
