import React, { useState } from "react";
import CustomFeildTeplate from "./CustomFeildTeplate";

function CustomSampleTemplate({ setCustomSample }) {
  const [customFeild, setCustomFeild] = useState(false);
  const [customSampleData, setCustomSampleData] = useState([]);
  const handleSaveTemplate = async () => {
    console.log(customSampleData);
  };
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
        {/* Modal content */}
        {/* border-2 border-slate-700 */}
        <div className="relative bg-white rounded-xl shadow max-h-[80vh] overflow-y-auto custom-scrollbar-task">
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 py-8 border-b rounded-t sticky top-0 bg-white z-50">
            <h3 className="text-xl font-medium text-gray-900">
              Create Custom Sample Template
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
                <ul className="max-w-md divide-y divide-gray-200">
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
                </ul>
              </div>
              <div className="cst-right">
                <div className="cst-right-inside">
                  <h1 className="flex items-center text-2xl font-extrabold">
                    Create your own custom template
                    <span className="bg-blue-100 text-blue-800 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">
                      Samples
                    </span>
                  </h1>

                  <div className="relative z-0 w-full mb-6 group mt-10">
                    <input
                      type="text"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required=""
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter name for template
                    </label>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCustomFeild(true);
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
                    onClick={handleSaveTemplate}
                    className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSampleTemplate;
