import React from "react";

function ProjectLog({ d }) {
  const date = new Date(d.date);
  console.log(date);
  return (
    <div className="content-logs-inside">
      <h2>{d.userEmail}</h2>
      <h2 className="log-message-h2">{d.message}</h2>
      <h2>{date.toLocaleString()}</h2>
    </div>
  );
}

export default ProjectLog;
