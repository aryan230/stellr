import { Box, Chip, Drawer, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DrawerEditTask from "./DrawerEditTask";
import { PaperClipIcon, UserCircleIcon } from "@heroicons/react/solid";
import DrawerLogsTask from "./DrawerLogsTask";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import URL from "./../../../Data/data.json";
import ReactQuill from "react-quill";
import HeaderOne from "../../headers/HeaderOne";
import MainModalTailwind from "../../../UI/MainModals/MainModalTailwind";
import MainModalEntity from "../../../UI/MainModals/MainModalEntity";
import moment from "moment";
import DetailSlideOver from "../../../UI/SlideOvers/DetailSlideOver";
import LogsModal from "../../Logs/LogsModal";
import ConformationModal from "../../../UI/MainModals/ConformationModal";
import EmptySlideOvers from "../../../UI/SlideOvers/EmptySlideOvers";

function TaskModal({
  setTaskModal,
  doc,
  setTaskUpdateController,
  setTaskUpdate,
}) {
  console.log(doc);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpenLogs, setIsDrawerOpenLogs] = useState(false);
  const [viewLogs, setViewLogs] = useState(false);
  const [details, setDetails] = useState(false);
  const [edit, setEdit] = useState(false);
  const [assignedMembers, setAssignedMembers] = useState(false);
  const date1 = new Date(doc.due_date);
  const [ownerUserData, setOwnerUserData] = useState();

  // const date2 = new Date(doc.createdAt);
  console.log(doc.createdAt);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ownerUser = async () => {
    var config = {
      method: "get",
      url: `${URL}api/users/${doc.user}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(async function(response) {
        if (response) {
          setOwnerUserData(response.data);
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!ownerUserData) {
      ownerUser();
    }
  }, [ownerUserData]);
  const [deleteTask, setDelete] = useState(false);

  const handleDelete = async (id) => {
    var config = {
      method: "delete",
      url: `${URL[0]}api/tasks/p/${id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        toast.success("Task Deleted");
        setDelete(false);
        setTaskModal(false);
        setTaskUpdateController(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const [editTask, setEditTask] = useState(false);

  return (
    <MainModalEntity open={true} setOpen={setTaskModal}>
      <DrawerEditTask
        setEditTask={setEditTask}
        editTask={editTask}
        setTaskModal={setTaskModal}
        setTaskUpdateController={setTaskUpdateController}
        task={doc}
      />
      <LogsModal open={viewLogs} setOpen={setViewLogs} logs={doc.logs} />
      <ConformationModal
        open={deleteTask}
        setOpen={setDelete}
        heading="Are you sure?"
        details="You want to delete this entity."
        onClick={async () => {
          handleDelete(doc._id);
        }}
      />
      <DetailSlideOver
        open={details}
        setOpen={setDetails}
        data={{
          name: doc.subject,
          type: "Task",
          description: `This task was created ${doc.createdAt &&
            moment(doc.createdAt).fromNow()} by ${ownerUserData &&
            ownerUserData.name}`,
          createdby: ownerUserData && ownerUserData.name,
          created: moment(doc.createdAt)
            .locale("en-in")
            .format("ll"),
          modified: moment(doc.updatedAt)
            .locale("en-in")
            .format("ll"),
          size: "2KB",
          shared: doc.assigned,
        }}
      />
      <HeaderOne
        name={doc.subject}
        status={doc.status}
        description={`This task was created ${doc.createdAt &&
          moment(doc.createdAt).fromNow()} by ${ownerUserData &&
          ownerUserData.name}`}
        menu={[
          {
            name: "Edit Task",
            onClick: async () => {
              setEditTask(true);
            },
          },
          {
            name: "View Details",
            onClick: async () => {
              setDetails(true);
            },
          },
          {
            name: "View Logs",
            onClick: async () => {
              setViewLogs(true);
            },
          },
          // {
          //   name: "Share",
          //   onClick: async () => {},
          // },
          {
            name: "Delete",
            onClick: async () => {
              setDelete(true);
            },
          },
        ]}
      />
      <div className="border-t border-gray-200 pt-8 lg:flex lg:items-center lg:justify-between xl:mt-0">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Priority
          </h3>
          <span
            class={`${
              doc.priority === "High"
                ? "bg-emerald-100 text-emerald-700 border-emerald-500"
                : "bg-gray-100 text-gray-800 border-gray-500"
            } text-xs font-medium inline-flex items-center px-2.5 py-0.5 mt-2 rounded me-2 border`}
          >
            <svg
              class="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
            </svg>
            {doc.priority}
          </span>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-900">Description</h2>

        <div
          className="mt-2 prose prose-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: doc.description }}
        />
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-sm font-medium text-gray-900">Due Date</h2>

        <div className="mt-2 prose prose-sm text-gray-500">
          {moment(doc.due_date).fromNow()}{" "}
          <span className="text-sm">({doc.due_date})</span>
        </div>
      </div>
    </MainModalEntity>
  );
}

export default TaskModal;
