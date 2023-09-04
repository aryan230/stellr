import React from "react";

function EntryLog({ d }) {
  console.log(d);
  const date = new Date(d.date);
  return (
    <div className="content-logs-inside">
      <h2 className="log-message-h2">{d.userEmail}</h2>
      <h2 className="log-message-h2">{d.message}</h2>
      <h2>{date.toLocaleString()}</h2>
    </div>
  );
}

export default EntryLog;
