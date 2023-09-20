import React from "react";

function TopDataReport({ data }) {
  return (
    <div className="view-report-details-tp">
      <p>Report#{data._id}</p>
      <h1>{data.name}</h1>
    </div>
  );
}

export default TopDataReport;
