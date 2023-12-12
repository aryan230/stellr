import { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "lucide-react";

const user = {
  name: "Chelsea Hagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Profile", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "Company Directory", href: "#", current: false },
  { name: "Openings", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];
const actions = [
  {
    icon: ClockIcon,
    name: "Request time off",
    href: "#",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    icon: BadgeCheckIcon,
    name: "Benefits",
    href: "#",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    name: "Schedule a one-on-one",
    href: "#",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    icon: CashIcon,
    name: "Payroll",
    href: "#",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    name: "Submit an expense",
    href: "#",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    icon: AcademicCapIcon,
    name: "Training",
    href: "#",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];
const recentHires = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
];
const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NewProjectComponent({ project, entries }) {
  const [inputSearch, setInputSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(
    true
  );
  const [
    autoUpdateApplicantDataEnabled,
    setAutoUpdateApplicantDataEnabled,
  ] = useState(false);
  return (
    <>
      {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    */}
      <div className="min-h-full font-sans">
        <Popover
          as="header"
          className="pb-32 bg-gradient-to-r from-indigo-800 to-indigo-600"
        >
          {({ open }) => (
            <>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                  {/* Logo */}

                  {/* Right section on desktop */}

                  <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                      {/* Left nav */}

                      <div className="px-12 lg:px-0">
                        {/* Search */}
                        <div className="max-w-full mx-auto w-full lg:max-w-md">
                          <label htmlFor="search" className="sr-only">
                            Search
                          </label>
                          <div className="relative text-white focus-within:text-gray-600 w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                              <SearchIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </div>
                            <input
                              id="search"
                              className="block w-full text-white bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                              placeholder="Search"
                              type="search"
                              name="search"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                                alt="Workflow"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="text-base font-medium text-gray-800 truncate">
                                {user.name}
                              </div>
                              <div className="text-sm font-medium text-gray-500 truncate">
                                {user.email}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      Profile Overview
                    </h2>
                    <div className="bg-white p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            {/* <p className="text-sm font-medium text-gray-600">
                              {project._id}
                            </p> */}
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                              {project.name}
                            </p>
                            <p className="text-sm font-medium text-gray-600">
                              {project.createdAt}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                          <a
                            href="#"
                            className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Project Settings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Actions panel */}
                <div className="shadow sm:hidden">
                  <ul
                    role="list"
                    className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                  >
                    {entries.map((transaction) => (
                      <li key={transaction.id}>
                        <a
                          href={transaction.href}
                          className="block px-4 py-4 bg-white hover:bg-gray-50"
                        >
                          <span className="flex items-center space-x-4">
                            <span className="flex-1 flex space-x-2 truncate">
                              <CashIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="flex flex-col text-gray-500 text-sm truncate">
                                <span className="truncate">
                                  {transaction.name}
                                </span>
                                <span>
                                  <span className="text-gray-900 font-medium">
                                    {transaction.amount}
                                  </span>{" "}
                                  {transaction.currency}
                                </span>
                                <time dateTime={transaction.datetime}>
                                  {transaction.date}
                                </time>
                              </span>
                            </span>
                            <ChevronRightIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <nav
                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                    aria-label="Pagination"
                  >
                    <div className="flex-1 flex justify-between">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                      >
                        Next
                      </a>
                    </div>
                  </nav>
                </div>

                {/* Activity table (small breakpoint and up) */}
                <div className="hidden sm:block">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col mt-2">
                      <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Entity Name
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                              </th>
                              <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                                Updated Date
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created/Due Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {entries
                              .filter(
                                (entry) =>
                                  entry.name
                                    .toLowerCase()
                                    .includes(inputSearch.toLowerCase()) &&
                                  entry.deleted === false
                              )
                              .map((transaction, index) => (
                                <tr key={transaction.id} className="bg-white">
                                  <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex">
                                      <a
                                        href={transaction.href}
                                        className="group inline-flex space-x-2 truncate text-sm"
                                      >
                                        <CashIcon
                                          className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        <p className="text-gray-500 truncate group-hover:text-gray-900">
                                          {transaction.name}
                                        </p>
                                      </a>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <span className="text-gray-900 font-medium">
                                      {transaction.amount}{" "}
                                    </span>
                                    {transaction.currency}
                                  </td>
                                  <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                                      {transaction.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                    <time dateTime={transaction.datetime}>
                                      {transaction.date}
                                    </time>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {/* Pagination */}
                        <nav
                          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                          aria-label="Pagination"
                        >
                          <div className="hidden sm:block">
                            <p className="text-sm text-gray-700">
                              Showing <span className="font-medium">1</span> to{" "}
                              <span className="font-medium">10</span> of{" "}
                              <span className="font-medium">20</span> results
                            </p>
                          </div>
                          <div className="flex-1 flex justify-between sm:justify-end">
                            <a
                              href="#"
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Previous
                            </a>
                            <a
                              href="#"
                              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Next
                            </a>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                {/* Announcements */}
                {/* <section aria-labelledby="announcements-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2
                        className="text-base font-medium text-gray-900"
                        id="announcements-title"
                      >
                        Announcements
                      </h2>
                      <div className="flow-root mt-6">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {announcements.map((announcement) => (
                            <li key={announcement.id} className="py-5">
                              <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  <a
                                    href={announcement.href}
                                    className="hover:underline focus:outline-none"
                                  >
                                   
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    {announcement.title}
                                  </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                  {announcement.preview}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section> */}

                {/* Recent Hires */}
                <section aria-labelledby="recent-hires-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <h2
                        className="text-base font-medium text-gray-900"
                        id="recent-hires-title"
                      >
                        Project Collabs
                      </h2>
                      <div className="flow-root mt-6">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {project.collaborators.length > 0 &&
                            project.collaborators.map((person) => (
                              <li key={person.user} className="py-4">
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0">
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${person.userName}`}
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {person.userName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                      {"@" + person.user}
                                    </p>
                                  </div>
                                  <div>
                                    <a
                                      href={person.href}
                                      className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                      {person.userType}
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default NewProjectComponent;
