import React, { useState } from "react";
import TaskModal from "./TaskModal/TaskModal";
import { addTasksLogs } from "../Functions/addTaskLogs";
import { useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/solid";
import { CheckCheck } from "lucide-react";
function SmallTasks({ doc, setTaskModal, setTaskContent, index, taskFrom }) {
  console.log(doc);
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;

  return (
    <li>
      <a
        href="#"
        onClick={async (e) => {
          e.preventDefault();
          const logObject = {
            entryId: doc._id,
            user: userInfo._id,
            userName: userInfo.name,
            userEmail: userInfo.email,
            message: `Opened the task with subject ${doc.subject} and id ${doc._id}`,
          };
          await addTasksLogs(logObject);
          setTaskContent(doc);
          setTaskModal(true);
        }}
        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4">
          <CheckCheck size={16} color="#4d00aa" />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">
          {doc.subject}
        </span>
      </a>
    </li>
  );
}

export default SmallTasks;
