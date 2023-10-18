import { Folders } from "lucide-react";
import React from "react";
import IconComponent from "../Icon/IconComponent";
import LucideIcons from "../Icon/LucideIcons";

function MainModalTailwind({ modalName, children, setCloseModal, iconName }) {
  return (
    <div className="modal">
      <div className="relative bg-white rounded-xl shadow max-h-[80vh] overflow-y-auto custom-scrollbar-task w-full max-w-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between p-5 py-8 border-b rounded-t sticky top-0 bg-white z-50">
          {iconName && (
            <LucideIcons
              iconName={iconName}
              size={24}
              color="#5D00D2"
              className="mr-3"
            />
          )}

          <h3 className="text-xl font-medium text-gray-900 font-karla">
            {modalName}
          </h3>

          <button
            onClick={() => {
              setCloseModal(false);
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
        <div className="p-6 space-y-6 min-h-[50vh]">{children}</div>
      </div>
    </div>
  );
}

export default MainModalTailwind;
