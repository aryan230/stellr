import React, { useEffect, useState } from "react";
import BasicModalTailwind from "../../UI/MainModals/BasicModalTailwind";
import MainModalEntity from "../../UI/MainModals/MainModalEntity";
import { FileText } from "lucide-react";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import UpdateStatus from "./UpdateStatus";

function ViewDetails({ open, setOpen, data, role }) {
  const [loader, setLoader] = useState(true);
  const [status, setUpdateStatus] = useState(false);
  useEffect(() => {
    setLoader(true);
    window.setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  return (
    <MainModalEntity open={open} setOpen={setOpen}>
      {loader ? (
        <SpinnerLoader />
      ) : (
        <>
          {status && (
            <UpdateStatus
              open={status}
              setOpen={setUpdateStatus}
              data={data}
              type={data.type}
            />
          )}
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 font-sans">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2 flex items-center justify-center">
                <FileText className="text-blue-500 mr-2" /> {data.name}
              </div>
              {role === "Admin" && (
                <div className="ml-4 mt-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setUpdateStatus(true);
                    }}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Status
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {data.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {data.description}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {" "}
                    Entity Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.name}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Entity Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.type}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Current Status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-600 text-white">
                      {data.status}{" "}
                    </span>
                  </dd>
                </div>
                {data.status != "Draft" && (
                  <>
                    {" "}
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Status Message
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.statusMessage}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Status By
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.statusBy}
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </div>
        </>
      )}
    </MainModalEntity>
  );
}

export default ViewDetails;
