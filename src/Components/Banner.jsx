import React from "react";
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

function Banner({ setShowBanner }) {
  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
      <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-indigo-800">
                <SpeakerphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">
                  Help Stellr be the star of your lab!
                </span>
                <span className="hidden md:inline">
                  Help Stellr be the star of your lab!
                </span>
                <span className="block sm:ml-2 sm:inline-block">
                  <a
                    target="_blank"
                    href="https://forms.gle/J23VFQMEgfpxqGGaA"
                    className="text-white font-bold underline"
                  >
                    {" "}
                    We value your feedback!{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </span>
              </p>
            </div>
            {/* <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                target="_blank"
                href="https://forms.gle/J23VFQMEgfpxqGGaA"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                We value your feedback!
              </a>
            </div> */}
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                onClick={() => {
                  localStorage.setItem("showBanner", "true");
                  setShowBanner(false);
                }}
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
