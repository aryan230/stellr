import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import {
  BellIcon,
  BriefcaseIcon,
  ChatIcon,
  CogIcon,
  DocumentSearchIcon,
  HomeIcon,
  MenuAlt2Icon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { MinusIcon, PencilIcon, SearchIcon } from "@heroicons/react/solid";
import { PlusSmIcon } from "@heroicons/react/solid";
import { PenIcon, Settings } from "lucide-react";
import ConformationModal from "../../UI/MainModals/ConformationModal";
import axios from "axios";
const tabs = [
  { name: "General", href: "#", current: true },
  { name: "Password", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
  { name: "Plan", href: "#", current: false },
  { name: "Billing", href: "#", current: false },
  { name: "Team Members", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function ProjectSettingsNew({
  setEmail,
  submitAddnewCollab,
  submitDeleteCollab,
  data,
  setUpdateUserId,
  setSettingsModal,
  handleDelete,
  deleteTask,
  setDelete,
}) {
  const people = [
    {
      name: "Lindsay Walton",
      handle: "lindsaywalton",
      email: "lindsaywalton@example.com",
      role: "Front-end Developer",
      imageId: "1517841905240-472988babdf9",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Courtney Henry",
      handle: "courtneyhenry",
      email: "courtneyhenry@example.com",
      role: "Designer",
      imageId: "1438761681033-6461ffad8d80",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Tom Cook",
      handle: "tomcook",
      email: "tomcook@example.com",
      role: "Director, Product Development",
      imageId: "1472099645785-5658abf4ff4e",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const [activeTab, setActiveTab] = useState(data.tabs.find((t) => t.current));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(
    true
  );
  const [
    autoUpdateApplicantDataEnabled,
    setAutoUpdateApplicantDataEnabled,
  ] = useState(false);

  return (
    <div className="">
      <ConformationModal
        open={deleteTask}
        setOpen={setDelete}
        heading="Are you sure?"
        details="You want to archive this entity."
        onClick={async () => {
          handleDelete(data.id);
        }}
      />
      {/*
    This example requires updating your template:
    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  */}
      <div className="project-main">
        {/* Content area */}
        <div className="h-[100%]">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold text-gray-700 font-body flex items-center justify-left">
                      Settings - {data.name}
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0 font-body">
                    <div className="py-6">
                      {/* Tabs */}
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          defaultValue={tabs.find((tab) => tab.current).name}
                        >
                          {data.tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {data.tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveTab(tab);
                                }}
                                className={classNames(
                                  activeTab.name === tab.name
                                    ? "border-indigo-500 text-indigo-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            {data.tabs.find((t) => t.name === activeTab.name) &&
                              data.tabs
                                .find((t) => t.name === activeTab.name)
                                .insideData.map((d) =>
                                  d.type === "text" ? (
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500">
                                        {d.key}
                                      </dt>
                                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span className="flex-grow">
                                          {d.value}
                                        </span>
                                      </dd>
                                    </div>
                                  ) : d.type === "table" ? (
                                    <>
                                      {/* <button
                                        type="submit"
                                        className="mb-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                      >
                                        Download Logs
                                      </button> */}
                                      <table className="min-w-full divide-y divide-gray-200 font-dmsans text-sm">
                                        <thead className="bg-gray-50 sticky top-0">
                                          <tr>
                                            <th
                                              scope="col"
                                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                              User
                                            </th>
                                            <th
                                              scope="col"
                                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                              Message
                                            </th>
                                            <th
                                              scope="col"
                                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                              Time
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                          {d.tableData.map((person) => (
                                            <tr className="bg-white border-b">
                                              <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                              >
                                                {person.userEmail}
                                              </th>
                                              <td className="px-6 py-4">
                                                {person.message}
                                              </td>
                                              <td className="px-6 py-4">
                                                {person.date.toLocaleString()}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </>
                                  ) : d.type === "dangerZone" ? (
                                    <div className="w-sm">
                                      <div className="space-y-1">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                          Archive
                                        </h3>
                                        <p className="max-w-2xl text-sm text-gray-500 pb-3">
                                          All the data inside the project
                                          including Lab Sheets, Lab Entries,
                                          Tasks will be deleted.
                                        </p>
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setDelete(true);
                                          }}
                                          type="submit"
                                          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                          Archive this project
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="max-w-lg mx-auto">
                                      <div>
                                        <div className="text-center">
                                          <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                          </svg>
                                          <h2 className="mt-2 text-lg font-medium text-gray-900">
                                            Add team members
                                          </h2>
                                          <p className="mt-1 text-sm text-gray-500">
                                            You haven’t added any team members
                                            to your project yet. As the owner of
                                            this project, you can manage team
                                            member permissions.
                                          </p>
                                        </div>
                                        <form action="#" className="mt-6 flex">
                                          <label
                                            htmlFor="email"
                                            className="sr-only"
                                          >
                                            Email address
                                          </label>
                                          <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Enter an email"
                                            onChange={(e) =>
                                              setEmail(e.target.value)
                                            }
                                          />
                                          <button
                                            type="submit"
                                            onClick={(e) => {
                                              submitAddnewCollab(e);
                                            }}
                                            className="ml-4 flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                          >
                                            Send invite
                                          </button>
                                        </form>
                                      </div>
                                      <div className="mt-10">
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                          Team members previously added to
                                          projects
                                        </h3>
                                        <ul
                                          role="list"
                                          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
                                        >
                                          {d.collabData.map(
                                            (person, personIdx) => (
                                              <li
                                                key={personIdx}
                                                className="py-4 flex items-center justify-between space-x-3"
                                              >
                                                <div className="min-w-0 flex-1 flex items-center space-x-3">
                                                  <div className="flex-shrink-0">
                                                    <img
                                                      className="h-10 w-10 rounded-full"
                                                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${person.userName}`}
                                                      alt=""
                                                    />
                                                  </div>
                                                  <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                      {person.userName}
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-500 truncate">
                                                      {person.userType}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="flex-shrink-0">
                                                  <button
                                                    type="button"
                                                    onClick={(e) => {
                                                      setUpdateUserId(
                                                        person.user
                                                      );
                                                      setSettingsModal(true);
                                                    }}
                                                    className="inline-flex items-center py-2 px-3 border border-transparent rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                                                  >
                                                    <PencilIcon
                                                      className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
                                                      aria-hidden="true"
                                                    />
                                                    <span className="text-sm font-medium text-gray-900">
                                                      {" "}
                                                      Change Role{" "}
                                                      <span className="sr-only">
                                                        {person.name}
                                                      </span>{" "}
                                                    </span>
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      submitDeleteCollab(
                                                        person.user,
                                                        person.userEmail
                                                      );
                                                    }}
                                                    className="inline-flex items-center py-2 px-3 border border-transparent rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                  >
                                                    <MinusIcon
                                                      className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
                                                      aria-hidden="true"
                                                    />
                                                    <span className="text-sm font-medium text-gray-900">
                                                      {" "}
                                                      Remove{" "}
                                                      <span className="sr-only">
                                                        {person.name}
                                                      </span>{" "}
                                                    </span>
                                                  </button>
                                                </div>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  )
                                )}
                          </dl>
                        </div>
                      </div>

                      {/* <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Account
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            Manage how information is displayed on your account.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Language
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">English</span>
                                <span className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Date format
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">DD-MM-YYYY</span>
                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Update
                                  </button>
                                  <span
                                    className="text-gray-300"
                                    aria-hidden="true"
                                  >
                                    |
                                  </span>
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <Switch.Group
                              as="div"
                              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                            >
                              <Switch.Label
                                as="dt"
                                className="text-sm font-medium text-gray-500"
                                passive
                              >
                                Automatic timezone
                              </Switch.Label>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <Switch
                                  checked={automaticTimezoneEnabled}
                                  onChange={setAutomaticTimezoneEnabled}
                                  className={classNames(
                                    automaticTimezoneEnabled
                                      ? "bg-indigo-600"
                                      : "bg-gray-200",
                                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-auto"
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      automaticTimezoneEnabled
                                        ? "translate-x-5"
                                        : "translate-x-0",
                                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                            <Switch.Group
                              as="div"
                              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                            >
                              <Switch.Label
                                as="dt"
                                className="text-sm font-medium text-gray-500"
                                passive
                              >
                                Auto-update applicant data
                              </Switch.Label>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <Switch
                                  checked={autoUpdateApplicantDataEnabled}
                                  onChange={setAutoUpdateApplicantDataEnabled}
                                  className={classNames(
                                    autoUpdateApplicantDataEnabled
                                      ? "bg-indigo-600"
                                      : "bg-gray-200",
                                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-auto"
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      autoUpdateApplicantDataEnabled
                                        ? "translate-x-5"
                                        : "translate-x-0",
                                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                          </dl>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSettingsNew;
