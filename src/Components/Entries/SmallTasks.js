import React, { useState } from "react";
import TaskModal from "./TaskModal/TaskModal";
import { addTasksLogs } from "../Functions/addTaskLogs";
import { useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/solid";
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
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">
          {doc.subject}
        </span>
      </a>
    </li>
  );
}

export default SmallTasks;
