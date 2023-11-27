import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listMyProtocols } from "../redux/actions/protocolActions";
import { Loader } from "lucide-react";
import InsideLoader from "../Components/Loader/InsideLoader";
import SecondInsideLoader from "../Components/Loader/SecondInsideLoader";
import CompleteLoader from "../Components/Loaders/CompleteLoader";
import { listMySops } from "../redux/actions/sopActions";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ArchiveSOP = () => {
  const dispatch = useDispatch();

  const sopListMy = useSelector((state) => state.sopListMy);
  const { sops, loading: loadingP, error: errorSamples } = sopListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <dl className="mt-6 space-y-6 divide-y divide-gray-200 font-sans">
      <Disclosure as="div" className="pt-6">
        {({ open }) => (
          <>
            <dt className="text-lg">
              <Disclosure.Button
                className="text-left w-full flex justify-between items-start text-gray-400"
                onClick={(e) => {
                  dispatch(listMySops(userInfo._id));
                }}
              >
                <span className="font-medium text-gray-900">SOPs</span>
                <span className="ml-6 h-7 flex items-center">
                  <ChevronDownIcon
                    className={classNames(
                      open ? "-rotate-180" : "rotate-0",
                      "h-6 w-6 transform"
                    )}
                    aria-hidden="true"
                  />
                </span>
              </Disclosure.Button>
            </dt>
            <Disclosure.Panel as="dd" className="mt-2 pr-12">
              {loadingP ? (
                <CompleteLoader />
              ) : (
                sops && (
                  <div className="flex flex-col pt-5">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Name
                                </th>

                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {sops
                                .filter((p) => p.deleted === true)
                                .map((person) => (
                                  <tr key={person.email}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {person.title}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900"
                                      >
                                        Restore
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </dl>
  );
};

export default ArchiveSOP;
