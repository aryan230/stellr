import React, { useState } from "react";

function CustomFeildTeplate({
  setCustomFeild,
  customSampleData,
  setCustomSampleData,
}) {
  const [name, setName] = useState();
  const [type, setType] = useState();

  const handleAddFeild = async () => {
    await setCustomSampleData((current) => [
      ...current,
      {
        id: current.length + 1,
        name: name,
        type: type,
      },
    ]);
    setCustomFeild(false);
  };
  return (
    <div className="modal">
      <div className="relative w-full max-w-xl max-h-full">
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
          <div className="p-6 space-y-6 min-h-[50%]">
            <div className="relative z-0 w-full mb-6 group mt-2">
              <input
                type="text"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required="true"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter name for feild
              </label>
            </div>
            <>
              <label htmlFor="underline_select" className="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                required="true"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option selected="">Choose a Feild Type</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="rte">Rich Text Editor</option>
                <option value="textarea">Textarea</option>
              </select>
            </>

            <button
              type="submit"
              onClick={handleAddFeild}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Add Feild
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomFeildTeplate;
