import React, { useState } from "react";
import TaskModal from "./TaskModal/TaskModal";
import { addTasksLogs } from "../Functions/addTaskLogs";
import { useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/solid";
import { Check, CheckCheck, CheckCircle, Circle } from "lucide-react";

function TaskEntries({ doc, setTaskModal, setTaskContent, index, taskFrom }) {
  console.log(doc);
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;
  return taskFrom ? (
    <button
      className="sl-element"
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
    >
      <div className="mnc-element-inside">
        <div className="mnc-element-left">
          {" "}
          {doc.status == "Open" ? (
            <Circle size={16} color="#4d00aa" />
          ) : (
            <CheckCircle size={16} color="#4d00aa" />
          )}
          <div className="entity-name-right">
            <p>{doc.subject}</p>
          </div>
        </div>
      </div>{" "}
    </button>
  ) : (
    <button
      className="sl-element"
      onClick={(e) => {
        e.preventDefault();
        setTaskContent(doc);
        setTaskModal(true);
      }}
    >
      <div className="mnc-element-inside">
        <div className="mnc-element-left">
          {doc.status == "Open" ? (
            <CheckCheck size={16} color="#4d00aa" />
          ) : (
            <CheckCheck size={16} color="#4d00aa" />
          )}

          <p>{doc.subject}</p>
        </div>
        <span>TASK-{String(index + 1).padStart(4, "0")}</span>
        <span>
          {new Date(doc.createdAt).toLocaleString("en-GB").split(",")[0]},{" "}
          {new Date(doc.updatedAt).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span> {doc.due_date}</span>
      </div>
    </button>
  );
}

export default TaskEntries;
