import _ from "lodash";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UpdateProtocolStepperOne from "./UpdateProtocol/UpdateProtocolStepperOne";
import UpdateProtocolModal from "./UpdateProtocolModal";
import { Box, Drawer } from "@mui/material";
import DrawerProtocolLogs from "./DrawerProtocolLogs";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import ShieldIcon from "@mui/icons-material/Shield";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/solid";
import {
  Eye,
  MoreHorizontal,
  MoreHorizontalIcon,
  MoreVertical,
} from "lucide-react";
import ShareModal from "./ShareModal";
import LogsModal from "../../Logs/LogsModal";
import ConformationModal from "../../../UI/MainModals/ConformationModal";
import URL from "./../../../Data/data.json";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProtocolModal({
  setProtocolModal,
  doc,
  setWhichTabisActive,
  setNewProtocol,
}) {
  const [insideData, setInsideData] = useState(
    doc.data ? Object.entries(JSON.parse(doc.data)) : []
  );
  const [images, setImages] = useState(doc.image && JSON.parse(doc.image));
  const [files, setFiles] = useState(doc.file && JSON.parse(doc.file));
  const [updateProtocolModal, setUpdateProtocolModal] = useState(false);
  const [isDrawerOpenLogs, setIsDrawerOpenLogs] = useState(false);
  const [logs, setLogs] = useState(false);
  const [share, setShare] = useState(false);
  const [deleteEle, setDelete] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;
  const actions = [
    {
      icon: <ShieldIcon />,
      name: "Logs",
      operation: "showlogs",
    },
    {
      icon: <EditIcon />,
      name: "Edit",
      operation: "showedit",
    },
  ];
  function handleClick(e, operation) {
    e.preventDefault();
    if (operation == "showlogs") {
      // do something
      setIsDrawerOpenLogs(true);
    } else {
      setUpdateProtocolModal(true);
      //do something else
    }
  }

  const handleDelete = async (id) => {
    var config = {
      method: "delete",
      url: `${URL[0]}api/protocols/p/${id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        toast.success("Template Deleted sucessfully");
        setDelete(false);
        setProtocolModal(false);
        setNewProtocol(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="modal">
      {share && (
        <ShareModal
          open={share}
          setOpen={setShare}
          setModal={setProtocolModal}
          doc={doc}
          setNew={setNewProtocol}
        />
      )}
      {deleteEle && (
        <ConformationModal
          open={deleteEle}
          setOpen={setDelete}
          heading="Are you sure?"
          details="You want to delete this entity."
          onClick={(e) => {
            e.preventDefault();
            handleDelete(doc._id);
          }}
        />
      )}
      <LogsModal setOpen={setLogs} open={logs} logs={doc ? doc.logs : []} />
      {updateProtocolModal && (
        <UpdateProtocolModal
          doc={doc}
          setProtocolModal={setProtocolModal}
          setUpdateProtocolModal={setUpdateProtocolModal}
          setWhichTabisActive={setWhichTabisActive}
          setNewProtocol={setNewProtocol}
          files={files && files}
          images={images && images}
        />
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpenLogs}
        onClose={() => setIsDrawerOpenLogs(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerProtocolLogs
            task={doc}
            setIsDrawerOpen={setIsDrawerOpenLogs}
          />
        </Box>
      </Drawer>
      <div className="relative w-full max-w-7xl max-h-full font-body">
        {doc.access && doc.access === "view" ? (
          <div className="absolute bottom-10 right-10 z-[9999999]">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center justify-center w-full rounded-full p-3 border border-gray-300 shadow-sm bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  <Eye size={16} className="mr-2" />
                  View Only
                </Menu.Button>
              </div>
            </Menu>
          </div>
        ) : (
          <div className="absolute bottom-10 right-10 z-[9999999]">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-full p-3 border border-gray-300 shadow-sm bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  <MoreHorizontalIcon size={20} />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-bottom-right absolute right-[100%] bottom-0 mt-2 mr-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setLogs(true);
                          }}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          View Logs
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setUpdateProtocolModal(true);
                          }}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          License
                        </a>
                      )}
                    </Menu.Item> */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setShare(true);
                      }}
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full text-left px-4 py-2 text-sm"
                            )}
                          >
                            Share
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setDelete(true);
                          }}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Delete
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}

        {/* <Box
          sx={{
            position: "absolute",
            height: 320,
            bottom: 10,
            right: 10,
            flexGrow: 1,
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
            icon={<SpeedDialIcon />}
            FabProps={{
              sx: {
                bgcolor: "#6200d2",
                "&:hover": {
                  bgcolor: "#6200d2",
                },
              },
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(e) => {
                  handleClick(e, action.operation);
                }}
              />
            ))}
          </SpeedDial>
        </Box> */}
        {/* Modal content */}
        {/* border-2 border-slate-700 */}
        <div className="relative bg-white rounded-xl shadow max-h-[80vh] overflow-y-auto custom-scrollbar-task font-body">
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 border-b rounded-t sticky top-0 bg-white z-50 py-8">
            <h3 className="text-xl font-medium text-gray-900">{doc.title}</h3>
            <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-2">
              Draft
            </span>
            <button
              onClick={() => {
                setProtocolModal(false);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="extralarge-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6 min-h-[50%]">
            {/* <a
              href="#"
              className="block max-full p-6 bg-white border border-gray-200 rounded-lg"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Details
              </h5>
              <div className="border-t border-gray-200 px-4 py-15 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      #{doc._id}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Created on
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Approval Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {doc.status === "Draft" && (
                        <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Draft
                        </span>
                      )}
                      {doc.status === "In Progress" && (
                        <span className="bg-indigo-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          In Progress
                        </span>
                      )}
                      {doc.status === "Approved" && (
                        <span className="bg-emerald-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Approved
                        </span>
                      )}
                      {doc.status === "Rejected" && (
                        <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Rejected
                        </span>
                      )}
                    </dd>
                  </div>
                  {doc.statusBy && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Approval By
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {doc.statusBy}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </a> */}
            <div
              href="#"
              className="block max-full p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
              {insideData &&
                insideData.map((d) => (
                  <div className="border-b border-gray-500 p-5 border-dashed">
                    {" "}
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {_.startCase(d[0])}
                    </h5>
                    <p className="font-normal text-gray-700 quill-read-only-editor">
                      <ReactQuill theme="snow" readOnly value={d[1]} />
                    </p>
                  </div>
                ))}
            </div>
            {images &&
              images.length > 0 &&
              images.map((i) => (
                <a
                  href="#"
                  className="block max-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {i.name}
                  </h5>
                  <p className="font-normal text-gray-700 flex-col">
                    {i.images.map((img) => (
                      <a
                        href={img.url}
                        target="_blank"
                        className="font-medium text-blue-600  hover:underline p-2"
                      >
                        {img.name}
                      </a>
                    ))}
                  </p>
                </a>
              ))}
          </div>
          {/* Modal footer */}
          {/* <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button
              data-modal-hide="extralarge-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              I accept
            </button>
            <button
              data-modal-hide="extralarge-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Decline
            </button>
          </div> */}
        </div>
      </div>
      {/* <div className="modal-inside-protocol">
        <div className="top-modal">
          <button
          className="sticky"
            onClick={() => {
              setProtocolModal(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <path
                d="M28.2838 15.7712L22.6269 21.4281L16.9701 15.7712C16.72 15.5212 16.3809 15.3807 16.0273 15.3807C15.6737 15.3807 15.3345 15.5212 15.0845 15.7712C14.8344 16.0213 14.6939 16.3604 14.6939 16.714C14.6939 17.0676 14.8344 17.4068 15.0845 17.6568L20.7413 23.3137L15.0845 28.9705C14.8344 29.2206 14.6939 29.5597 14.6939 29.9134C14.6939 30.267 14.8344 30.6061 15.0845 30.8562C15.3345 31.1062 15.6737 31.2467 16.0273 31.2467C16.3809 31.2467 16.72 31.1062 16.9701 30.8562L22.6269 25.1993L28.2838 30.8562C28.5338 31.1062 28.873 31.2467 29.2266 31.2467C29.5802 31.2467 29.9194 31.1062 30.1694 30.8562C30.4195 30.6061 30.5599 30.267 30.5599 29.9134C30.5599 29.5597 30.4195 29.2206 30.1694 28.9705L24.5126 23.3137L30.1694 17.6568C30.4195 17.4068 30.5599 17.0676 30.5599 16.714C30.5599 16.3604 30.4195 16.0213 30.1694 15.7712C29.9194 15.5212 29.5802 15.3807 29.2266 15.3807C28.873 15.3807 28.5338 15.5212 28.2838 15.7712Z"
                fill="#8F8585"
              />
            </svg>
          </button>
        </div>
        <>
          {" "}
          <div className="top-modal-in-in">
            <div className="top-modal-protocol-in">
              <h1>{doc.title}</h1>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsDrawerOpenLogs(true);
                }}
                className="text-indigo-500 mt-5 hover:cursor-pointer"
              >
                View Logs
              </a>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setUpdateProtocolModal(true);
              }}
            >
              Edit Protocol
            </button>
          </div>
          <div className="protocol-stepper">
            <div className="protocol-shower">
              {insideData &&
                insideData.map((d) => (
                  <div className="protocol-shower-inside">
                    <div className="protocol-shower-left">
                      <h2>{_.startCase(d[0])}</h2>
                    </div>
                    <div className="protocol-shower-right">
                      <ReactQuill theme="snow" readOnly value={d[1]} />
                    </div>
                  </div>
                ))}
              {images &&
                images.length > 0 &&
                images.map((i) => (
                  <div className="protocol-shower-inside">
                    <div className="protocol-shower-left">
                      <h2>{i.name}</h2>
                    </div>
                    <div className="protocol-shower-right">
                      {i.images.map((img) => (
                        <img src={img.url} width="50px"></img>
                      ))}
                    </div>
                  </div>
                ))}
              {files &&
                files.length > 0 &&
                files.map((i) => (
                  <div className="protocol-shower-inside">
                    <div className="protocol-shower-left">
                      <h2>{i.name}</h2>
                    </div>
                    <div className="protocol-shower-right">
                      {i.images.map((img) => (
                        <a href={img.url} target="_blank" width="50px">
                          {img.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      </div> */}
    </div>
  );
}

export default ProtocolModal;
