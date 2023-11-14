import { Drawer } from "@mui/material";
import _ from "lodash";
import React, { Fragment, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DrawerSopLogs from "./DrawerSopLogs";
import EditIcon from "@mui/icons-material/Edit";
import ShieldIcon from "@mui/icons-material/Shield";
import { Box } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Menu, Transition } from "@headlessui/react";
import { Eye, MoreHorizontalIcon } from "lucide-react";
import ShareSopModal from "./ShareSopModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SopModal({ setSopModal, doc, setWhichTabisActive }) {
  const [isDrawerOpenLogs, setIsDrawerOpenLogs] = useState(false);

  const [insideData, setInsideData] = useState(
    doc.data ? Object.entries(JSON.parse(doc.data)) : []
  );
  const [images, setImages] = useState(doc.image && JSON.parse(doc.image));
  const [files, setFiles] = useState(doc.image && JSON.parse(doc.file));
  const [share, setShare] = useState(false);
  const actions = [
    {
      icon: <ShieldIcon />,
      name: "View Logs",
      operation: "showlogs",
    },
  ];
  function handleClick(e, operation) {
    e.preventDefault();
    if (operation == "showlogs") {
      // do something
      setIsDrawerOpenLogs(true);
    } else {
      //do something else
    }
  }

  return (
    <div className="modal">
      {share && (
        <ShareSopModal
          open={share}
          setOpen={setShare}
          setModal={setSopModal}
          doc={doc}
        />
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpenLogs}
        onClose={() => setIsDrawerOpenLogs(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerSopLogs task={doc} setIsDrawerOpen={setIsDrawerOpenLogs} />
        </Box>
      </Drawer>
      <div className="modal-inside-protocol">
        <div className="relative w-full max-w-7xl max-h-full">
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
                              setIsDrawerOpenLogs(true);
                              // setLogs(true);
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
                      {/* <Menu.Item>
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
                      </Menu.Item> */}
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setShare(true);
                            }}
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
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
          {/* Modal content */}
          {/* border-2 border-slate-700 */}
          <div className="relative bg-white rounded-xl shadow max-h-[80vh] overflow-y-auto custom-scrollbar-task">
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b rounded-t sticky top-0 bg-white z-50 py-8">
              <h3 className="text-xl font-medium text-gray-900">{doc.title}</h3>
              <span className="bg-gray-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-2">
                Draft
              </span>
              <button
                onClick={() => {
                  setSopModal(false);
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
              {insideData &&
                insideData.map((d) => (
                  <a
                    href="#"
                    className="block max-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {_.startCase(d[0])}
                    </h5>
                    <p className="font-normal text-gray-700 quill-read-only-editor">
                      <ReactQuill theme="snow" readOnly value={d[1]} />
                    </p>
                  </a>
                ))}
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
        {/* <div className="top-modal">
          <button
            onClick={() => {
              setSopModal(false);
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
        </div> */}
        {/* <>
          {" "}
          <h1>{doc.title}</h1>
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
        </> */}
      </div>
    </div>
  );
}

export default SopModal;
