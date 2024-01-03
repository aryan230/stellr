import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XIcon } from "@heroicons/react/outline";
import { PencilIcon, PlusSmIcon } from "@heroicons/react/solid";
import { CheckCheck, FileText, User } from "lucide-react";

function DetailSlideOver({ open, setOpen, data }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-[9999999999]"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-96">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full bg-white p-8 overflow-y-auto font-dmsans">
                  <div className="pb-16 space-y-6">
                    <div>
                      {/* <div className="block w-xs aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                        
                      </div> */}
                      <div className="mt-4 flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-medium text-gray-900">
                            <span className="sr-only">Details for </span>
                            {data.name}
                          </h2>
                          <p className="text-sm font-medium text-gray-500">
                            {data.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="ml-4 h-8 w-8 bg-white rounded-full flex items-center justify-center text-indigo-600"
                        >
                          {data.type === "Task" && <CheckCheck />}
                          {data.type === "Entry" && <FileText />}
                          <span className="sr-only">Favorite</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Information</h3>
                      <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Created by</dt>
                          <dd className="text-gray-900">{data.createdby}</dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Created</dt>
                          <dd className="text-gray-900">{data.created}</dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Last modified</dt>
                          <dd className="text-gray-900">{data.modified}</dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Last modified by</dt>
                          <dd className="text-gray-900">{data.createdby}</dd>
                        </div>
                        {/* <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Size</dt>
                          <dd className="text-gray-900">{data.size}</dd>
                        </div> */}
                      </dl>
                    </div>
                    {/* <div>
                      <h3 className="font-medium text-gray-900">Description</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-500 italic">
                          Add a description to this image.
                        </p>
                        <button
                          type="button"
                          className="-mr-2 h-8 w-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Add description</span>
                        </button>
                      </div>
                    </div> */}
                    <div>
                      <h3 className="font-medium text-gray-900">Shared with</h3>
                      <ul
                        role="list"
                        className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
                      >
                        {data.shared &&
                          data.shared.length > 0 &&
                          data.shared.map((s) => (
                            <li className="py-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <img
                                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${s.userName}`}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                  />
                                </div>
                                <p className="ml-4 text-sm font-medium text-gray-900">
                                  {s.userName}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Remove
                                <span className="sr-only"> Aimee Douglas</span>
                              </button>
                            </li>
                          ))}

                        {/* <li className="py-2 flex justify-between items-center">
                          <button
                            type="button"
                            className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                              Share
                            </span>
                          </button>
                        </li> */}
                      </ul>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Download
                      </button>
                      <button
                        type="button"
                        className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Delete
                      </button>
                    </div>
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

export default DetailSlideOver;
