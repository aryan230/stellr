import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listMyEntries } from "../../redux/actions/entryActions";
import CustomLogsInside from "./CustomLogsInside";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CustomLogs({ open, setOpen, logs, name, project, tab }) {
  const dispatch = useDispatch();
  const entriesListMy = useSelector((state) => state.entriesListMy);
  const {
    entries,
    loading: loadingEntries,
    error: errorEntries,
  } = entriesListMy;

  useEffect(() => {
    dispatch(listMyEntries(project._id));
  }, [dispatch]);

  const exportAuditLog = async (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    console.log(tab.logs);
    const templateOptions = entries
      .find((e) => e._id == tab._id)
      .logs.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map(({ userEmail, message, date }) => [
        userEmail,
        message,
        new Date(date).toLocaleString(),
      ]);

    autoTable(doc, { html: "#my-table" });
    autoTable(doc, {
      head: [["Email", "Message", "Date"]],
      body: templateOptions,
    });
    doc.save(`stellr-${tab.name}.pdf`);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-[9999999999]"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex font-sans">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-3xl">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-lg font-medium text-white">
                        {tab.name} - Logs
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                            Download Logs
                            <ChevronDownIcon
                              className="-mr-1 ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
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
                          <Menu.Items className="z-[9999] origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      exportAuditLog(e);
                                    }}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    PDF
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="relative flex-1 pb-6 px-4 sm:px-6 h-full overflow-y-auto">
                    {/* Replace with your content */}
                    <div className="flex w-[90%] mx-auto shadow-sm py-3 sticky top-0 bg-white z-2">
                      <h2 className="w-[30%] text-center">User</h2>
                      <h2 className="w-[50%] text-center">Message</h2>
                      <h2 className="w-[30%] text-center">Date & Time</h2>
                    </div>
                    {entries &&
                      entries.find((e) => e._id == tab._id) &&
                      entries.find((e) => e._id == tab._id).logs &&
                      entries
                        .find((e) => e._id == tab._id)
                        .logs.sort(function(a, b) {
                          return new Date(b.date) - new Date(a.date);
                        })
                        .map((d) => <CustomLogsInside d={d} />)}
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CustomLogs;
