import React from "react";

function DashHome() {
  return (
    <div className="dash-home">
      <img src="./assets/2.svg" alt="" />
      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
        role="alert"
      >
        <span className="font-medium">No dashboards currently available!</span>{" "}
        Click on an entity to see a list of dashboards.
      </div>
    </div>
  );
}

export default DashHome;
