import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { CheckCheck } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function HeaderOne({ name, description, status, menu }) {
  return (
    <div className="pb-5 border-b border-gray-200">
      <div className="sm:flex sm:justify-between sm:items-center">
        <CheckCheck className="mr-4 px-2 text-indigo-600 w-fit" />
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="message-heading"
            className="text-lg font-medium text-gray-900"
          >
            {name}
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">{description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          {status && (
            <span className="inline-flex items-center px-3 py-0.5 rounded-md text-sm font-medium bg-indigo-600 text-white">
              {status}
            </span>
          )}

          <Menu as="div" className="ml-3 relative inline-block text-left">
            <div>
              <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {menu &&
                    menu.length > 0 &&
                    menu.map((m) => (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={m.onClick}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex justify-between px-4 py-2 text-sm"
                            )}
                          >
                            <span>{m.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default HeaderOne;
