import React from "react";

function ButtonGroupSample({ name, buttonData, currentValue, changeFunction }) {
  const CUSTOM_BUTTON_GROUP_DATA = [
    {
      name: "Cell Cultures",
      buttons: ["mL", "L", "cells/mL", "%"],
    },
    {
      name: "Protien",
      buttons: ["µg", "mg", "°C"],
    },
  ];
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {buttonData &&
        buttonData.buttons &&
        buttonData.buttons.map((b) => (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              console.log(name, currentValue);
              changeFunction(name, currentValue[name] + e.target.innerText);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-blue-700 focus:text-blue-700"
          >
            {b}
          </button>
        ))}
    </div>
  );
}

export default ButtonGroupSample;
