import { Fragment, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import BasicModalTailwind from "../../UI/MainModals/BasicModalTailwind";
import MainModalEntity from "../../UI/MainModals/MainModalEntity";
import ExportProtocols from "./DataExportEntities/ExportProtocols";
import ExportSOP from "./DataExportEntities/ExportSOP";
import ExportSamples from "./DataExportEntities/ExportSamples";
import CompleteLoader from "../Loaders/CompleteLoader";
import ExportChemicalDrawings from "./DataExportEntities/ExportChemicalDrawings";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function DataExportNew({ open, setOpen }) {
  const [subNavigation, setSubNavigation] = useState([
    {
      name: "Chemical Drawing",
      href: "#",
      click: () => {
        setCurrent("Chemical Drawing");
      },
      icon: UserCircleIcon,
      current: true,
    },
    {
      name: "Samples",
      href: "#",
      click: () => {
        setCurrent("Samples");
      },
      icon: UserCircleIcon,
      current: true,
    },
    {
      name: "Protocols",
      href: "#",
      click: () => {
        setCurrent("Protocols");
      },
      icon: CogIcon,
      current: false,
    },
    {
      name: "SOPs",
      href: "#",
      click: () => {
        setCurrent("SOPs");
      },
      icon: KeyIcon,
      current: false,
    },
  ]);
  const [current, setCurrent] = useState(subNavigation[0].name);
  const [loader, setLoader] = useState(false);
  return (
    <MainModalEntity open={open} setOpen={setOpen}>
      {loader ? (
        <CompleteLoader />
      ) : (
        <div>
          <Disclosure
            as="div"
            className="relative bg-indigo-700 pb-32 overflow-hidden"
          >
            {({ open }) => (
              <>
                <div
                  aria-hidden="true"
                  className={classNames(
                    open ? "bottom-0" : "inset-y-0",
                    "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
                  )}
                >
                  <div className="absolute inset-0 flex">
                    <div
                      className="h-full w-1/2"
                      style={{ backgroundColor: "#6366f1" }}
                    />
                    <div
                      className="h-full w-1/2"
                      style={{ backgroundColor: "#6366f1" }}
                    />
                  </div>
                  <div className="relative flex justify-center">
                    <svg
                      className="flex-shrink-0"
                      width={1750}
                      height={308}
                      viewBox="0 0 1750 308"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                        fill="#0369a1"
                      />
                      <path
                        d="M1465.84 308L16.816 0H1750v308h-284.16z"
                        fill="#5d00d2"
                      />
                      <path
                        d="M1733.19 0L284.161 308H0V0h1733.19z"
                        fill="#5d00d2"
                      />
                      <path
                        d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                        fill="#5d00d2"
                      />
                    </svg>
                  </div>
                </div>
                <header className="relative py-10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">
                      Export Your Data
                    </h1>
                  </div>
                </header>
              </>
            )}
          </Disclosure>

          <main className="relative -mt-32">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                  <aside className="py-6 lg:col-span-3">
                    <nav className="space-y-1">
                      {subNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={item.click}
                          className={classNames(
                            current === item.name
                              ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                              : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                            "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                          )}
                          aria-current={
                            current === item.name ? "page" : undefined
                          }
                        >
                          {/* <item.icon
                          className={classNames(
                            item.current
                              ? "text-indigo-500 group-hover:text-indigo-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        /> */}
                          <span className="truncate">{item.name}</span>
                        </a>
                      ))}
                    </nav>
                  </aside>

                  <form
                    className="divide-y divide-gray-200 lg:col-span-9"
                    action="#"
                    method="POST"
                  >
                    {/* Profile section */}
                    {current === "Samples" && (
                      <ExportSamples setLoader={setLoader} />
                    )}
                    {current === "Protocols" && (
                      <ExportProtocols setLoader={setLoader} />
                    )}
                    {current === "SOPs" && <ExportSOP setLoader={setLoader} />}
                    {current === "Chemical Drawing" && (
                      <ExportChemicalDrawings setLoader={setLoader} />
                    )}
                    {/* Privacy section */}
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </MainModalEntity>
  );
}

export default DataExportNew;
