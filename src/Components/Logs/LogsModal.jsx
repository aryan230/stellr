import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import LogEntryMain from "./LogEntryMain";

function LogsModal({ open, setOpen, logs, name }) {
  console.log(logs);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-[999999]"
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
                        Logs
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
                    <div className="mt-1">
                      {/* <p className="text-sm text-indigo-300">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit
                        aliquam ad hic recusandae soluta.
                      </p> */}
                    </div>
                  </div>
                  <div className="relative flex-1 py-6 px-4 sm:px-6 h-full">
                    {/* Replace with your content */}
                    <div className="relative overflow-x-auto h-full">
                      <table className="w-full h-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              User
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Log Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody className="h-full overflow-y-scroll pb-10">
                          {logs &&
                            logs.length > 0 &&
                            logs
                              .sort(function(a, b) {
                                return new Date(b.date) - new Date(a.date);
                              })
                              .map((d) => <LogEntryMain d={d} />)}
                        </tbody>
                      </table>
                    </div>

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

export default LogsModal;
