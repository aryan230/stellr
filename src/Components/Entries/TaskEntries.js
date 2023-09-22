import React, { useState } from "react";
import TaskModal from "./TaskModal/TaskModal";
import { addTasksLogs } from "../Functions/addTaskLogs";
import { useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/solid";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 1.33334H2.00004C1.82323 1.33334 1.65366 1.40357 1.52864 1.5286C1.40361 1.65362 1.33337 1.82319 1.33337 2V14C1.33337 14.1768 1.40361 14.3464 1.52864 14.4714C1.65366 14.5964 1.82323 14.6667 2.00004 14.6667H14C14.1769 14.6667 14.3464 14.5964 14.4714 14.4714C14.5965 14.3464 14.6667 14.1768 14.6667 14V2C14.6667 1.82319 14.5965 1.65362 14.4714 1.5286C14.3464 1.40357 14.1769 1.33334 14 1.33334V1.33334ZM13.3334 13.3333H2.66671V2.66667H13.3334V13.3333Z"
                fill="black"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.80634 9.83333C6.86832 9.89581 6.94205 9.94541 7.02329 9.97925C7.10453 10.0131 7.19167 10.0305 7.27967 10.0305C7.36768 10.0305 7.45482 10.0131 7.53606 9.97925C7.6173 9.94541 7.69103 9.89581 7.75301 9.83333L10.473 7.11333C10.5985 6.98779 10.6691 6.81753 10.6691 6.63999C10.6691 6.46246 10.5985 6.2922 10.473 6.16666C10.3475 6.04113 10.1772 5.9706 9.99967 5.9706C9.82214 5.9706 9.65188 6.04113 9.52634 6.16666L7.27967 8.41999L6.47301 7.60666C6.34747 7.48113 6.17721 7.4106 5.99967 7.4106C5.82214 7.4106 5.65188 7.48113 5.52634 7.60666C5.4008 7.7322 5.33028 7.90246 5.33028 8.07999C5.33028 8.25753 5.4008 8.42779 5.52634 8.55333L6.80634 9.83333ZM13.9997 1.33333H1.99967C1.82286 1.33333 1.65329 1.40357 1.52827 1.52859C1.40325 1.65361 1.33301 1.82318 1.33301 1.99999V14C1.33301 14.1768 1.40325 14.3464 1.52827 14.4714C1.65329 14.5964 1.82286 14.6667 1.99967 14.6667H13.9997C14.1765 14.6667 14.3461 14.5964 14.4711 14.4714C14.5961 14.3464 14.6663 14.1768 14.6663 14V1.99999C14.6663 1.82318 14.5961 1.65361 14.4711 1.52859C14.3461 1.40357 14.1765 1.33333 13.9997 1.33333ZM13.333 13.3333H2.66634V2.66666H13.333V13.3333Z"
                fill="black"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 1.33334H2.00004C1.82323 1.33334 1.65366 1.40357 1.52864 1.5286C1.40361 1.65362 1.33337 1.82319 1.33337 2V14C1.33337 14.1768 1.40361 14.3464 1.52864 14.4714C1.65366 14.5964 1.82323 14.6667 2.00004 14.6667H14C14.1769 14.6667 14.3464 14.5964 14.4714 14.4714C14.5965 14.3464 14.6667 14.1768 14.6667 14V2C14.6667 1.82319 14.5965 1.65362 14.4714 1.5286C14.3464 1.40357 14.1769 1.33334 14 1.33334V1.33334ZM13.3334 13.3333H2.66671V2.66667H13.3334V13.3333Z"
                fill="black"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.80634 9.83333C6.86832 9.89581 6.94205 9.94541 7.02329 9.97925C7.10453 10.0131 7.19167 10.0305 7.27967 10.0305C7.36768 10.0305 7.45482 10.0131 7.53606 9.97925C7.6173 9.94541 7.69103 9.89581 7.75301 9.83333L10.473 7.11333C10.5985 6.98779 10.6691 6.81753 10.6691 6.63999C10.6691 6.46246 10.5985 6.2922 10.473 6.16666C10.3475 6.04113 10.1772 5.9706 9.99967 5.9706C9.82214 5.9706 9.65188 6.04113 9.52634 6.16666L7.27967 8.41999L6.47301 7.60666C6.34747 7.48113 6.17721 7.4106 5.99967 7.4106C5.82214 7.4106 5.65188 7.48113 5.52634 7.60666C5.4008 7.7322 5.33028 7.90246 5.33028 8.07999C5.33028 8.25753 5.4008 8.42779 5.52634 8.55333L6.80634 9.83333ZM13.9997 1.33333H1.99967C1.82286 1.33333 1.65329 1.40357 1.52827 1.52859C1.40325 1.65361 1.33301 1.82318 1.33301 1.99999V14C1.33301 14.1768 1.40325 14.3464 1.52827 14.4714C1.65329 14.5964 1.82286 14.6667 1.99967 14.6667H13.9997C14.1765 14.6667 14.3461 14.5964 14.4711 14.4714C14.5961 14.3464 14.6663 14.1768 14.6663 14V1.99999C14.6663 1.82318 14.5961 1.65361 14.4711 1.52859C14.3461 1.40357 14.1765 1.33333 13.9997 1.33333ZM13.333 13.3333H2.66634V2.66666H13.333V13.3333Z"
                fill="black"
              />
            </svg>
          )}

          <p>{doc.subject}</p>
        </div>
        <span>TASK-000{index + 1}</span>
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
