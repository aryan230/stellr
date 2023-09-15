import React from "react";
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

function BannerOrg({ setCreateOrg }) {
  return (
    <div className="relative bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">We announced a new product!</span>
            <span className="hidden md:inline">
              Join or Create an Organization
            </span>
            <span className="block sm:ml-2 sm:inline-block">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setCreateOrg(true);
                }}
                className="text-white font-bold underline"
              >
                {" "}
                Click here <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BannerOrg;
