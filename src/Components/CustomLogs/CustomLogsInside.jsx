import moment from "moment";
import React from "react";

function CustomLogsInside({ d }) {
  const final = moment(d.date).format("DD/MM/YYYY");
  const time = moment(d.date).format("LT");
  return (
    <div className="flex w-[90%] mx-auto bg-white text-xs py-2">
      <h2 className="w-[30%] overflow-x-hidden">{d.userEmail}</h2>
      <h2 className="w-[50%] mx-3 text-xs">{d.message}</h2>
      <h2 className="">{final + " " + time}</h2>
    </div>
  );
}

export default CustomLogsInside;
