import React from "react";

function ContactAdmin({ setContactAdmin }) {
  return (
    <div className="modal">
      <div className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Help with Account Issues
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault();
                setContactAdmin(false);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="defaultModal"
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
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500">
              If you're facing any account-related issues that are causing
              inconvenience or hindering your experience on our website, please
              don't hesitate to contact our administrator. We are here to assist
              you in resolving any problems you may encounter.
            </p>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <a
              href="mailto:sahil@getstellr.io"
              data-modal-hide="defaultModal"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Contact Admin
            </a>
            <button
              data-modal-hide="defaultModal"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setContactAdmin(false);
              }}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactAdmin;
