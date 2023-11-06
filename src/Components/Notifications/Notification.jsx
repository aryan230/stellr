import { Bell } from "lucide-react";
import React from "react";

function Notification() {
  return (
    <div className="fixed top-5 right-8 z-[9999999999]">
      {" "}
      <div className="relative bg-white rounded-full p-3 flex items-center justify-center drop-shadow-md">
        <p className="absolute w-5 h-5 -top-1 -right-1 bg-indigo-700 rounded-full p-2 text-white text-md items-center flex justify-center">
          2
        </p>
        <Bell size={18} />
      </div>
    </div>
  );
}

export default Notification;
