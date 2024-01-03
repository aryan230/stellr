import React from "react";
import { useDispatch } from "react-redux";

function DataExportHeader({ data }) {
  const dispatch = useDispatch();
  const exportMethod = [
    { id: "single", title: "Single Export" },
    { id: "bulk", title: "Bulk Export" },
  ];
  return (
    <>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 mb-10">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Export Protocols
        </h3>
      </div>
      <div>
        <label className="text-base font-medium text-gray-900">
          Export your protocols
        </label>
        <p className="text-sm leading-5 text-gray-500">
          How do you prefer to export your protocols?
        </p>
        <fieldset className="mt-4">
          <legend className="sr-only">Notification method</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.id} className="flex items-center">
                <input
                  id={notificationMethod.id}
                  name="notification-method"
                  type="radio"
                  defaultChecked={notificationMethod.id === "email"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor={notificationMethod.id}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default DataExportHeader;
