import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listMyCollabProjects,
  listMyOrgProjects,
  listMyProjects,
} from "../redux/actions/projectActions";
import _ from "lodash";
import { listMyProtocols } from "../redux/actions/protocolActions";
import { listMySamples } from "../redux/actions/sampleActions";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import {
  listMyCollabTasks,
  listMyTasks,
  listMyTasksPersonal,
} from "../redux/actions/taskActions";
import { listMySops } from "../redux/actions/sopActions";
import { Helmet } from "react-helmet";

function SearchPage({
  setSampleContent,
  setSampleModal,
  setWhichTabisActive,
  setProjectInsideActiveId,
  setProjectInsideActive,
  setProtocolContent,
  setProtocolModal,
  setSopContent,
  setSopModal,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [tasksAll, setTasks] = useState();
  const [inputSearch, setInputSearch] = useState("");
  //userinfo

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //projects

  const projectListMy = useSelector((state) => state.projectListMy);
  const {
    projects,
    loading: loadingOrders,
    error: errorOrders,
  } = projectListMy;

  const projecListMyCollab = useSelector((state) => state.projecListMyCollab);
  const {
    projects: projectsCollab,
    loading: projectCollabLoading,
    error: errorCollabLoading,
  } = projecListMyCollab;

  const projectListMyOrg = useSelector((state) => state.projectListMyOrg);
  const {
    projects: projectsOrg,
    loading: projectOrgLoading,
    error: errorOrgLoading,
  } = projectListMyOrg;

  let newArrProjects =
    projects &&
    projectsCollab &&
    projectsOrg &&
    _.unionBy(projects, projectsCollab, projectsOrg, "_id");

  //   Samples

  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;

  //Protocols

  const protocolListMy = useSelector((state) => state.protocolListMy);
  const {
    protocols,
    loading: loadingProtocols,
    error: errorProtocols,
  } = protocolListMy;

  //Tasks

  const taskListMyPersonal = useSelector((state) => state.taskListMyPersonal);
  const {
    tasksList,
    loading: loadingTasks,
    error: errorTasks,
  } = taskListMyPersonal;
  const taskListMyCollab = useSelector((state) => state.taskListMyCollab);
  const {
    tasks,
    loading: loadingTasksCollab,
    error: errorTasksCollab,
  } = taskListMyCollab;

  // My Entries

  const sopListMy = useSelector((state) => state.sopListMy);
  const { sops, loading: loadingSop, error: errorSop } = sopListMy;

  const getAllMyEntries = async () => {};

  useEffect(() => {
    dispatch(listMyProjects());
    dispatch(listMyCollabProjects());
    dispatch(listMyOrgProjects());
    dispatch(listMySamples(userInfo._id));
    dispatch(listMyProtocols(userInfo._id));
    dispatch(listMySops(userInfo._id));
    dispatch(listMyTasksPersonal());
    dispatch(listMyCollabTasks());
  }, [dispatch]);

  return (
    <div className="search-page-main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search and Retrieve Data | Bio-Pharma ELN System</title>
        <meta
          name="description"
          content="Efficiently manage and track bio-pharma research projects with ourElectronic Lab Notebook software. Simplify collaboration and enhance data organization."
        />
      </Helmet>
      <div className="search-page-inside">
        <div className="search-page-input-element">
          {advancedSearch && (
            <AdvancedSearch
              setAdvancedSearch={setAdvancedSearch}
              samples={samples ? samples : []}
              projects={newArrProjects ? newArrProjects : []}
              protocols={protocols ? protocols : []}
              sops={sops ? sops : []}
              setSampleContent={setSampleContent}
              setSampleModal={setSampleModal}
              tasks={tasksList && tasks && tasksList.concat(tasks)}
              setWhichTabisActive={setWhichTabisActive}
              setProjectInsideActiveId={setProjectInsideActiveId}
              setProjectInsideActive={setProjectInsideActive}
              setProtocolContent={setProtocolContent}
              setProtocolModal={setProtocolModal}
              setSopContent={setSopContent}
              setSopModal={setSopModal}
            />
          )}
          <div className="input-button-attached">
            <input
              type="text"
              placeholder="Search for content by name or id"
              onChange={(e) => setInputSearch(e.target.value)}
            />
            {/* <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Submit
            </button> */}
          </div>

          <div className="advanced-ai-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.33301 8.00016C3.33301 7.82335 3.26277 7.65378 3.13775 7.52876C3.01272 7.40373 2.84315 7.3335 2.66634 7.3335H1.99967C1.82286 7.3335 1.65329 7.40373 1.52827 7.52876C1.40325 7.65378 1.33301 7.82335 1.33301 8.00016C1.33301 8.17697 1.40325 8.34654 1.52827 8.47157C1.65329 8.59659 1.82286 8.66683 1.99967 8.66683H2.66634C2.84315 8.66683 3.01272 8.59659 3.13775 8.47157C3.26277 8.34654 3.33301 8.17697 3.33301 8.00016ZM3.75967 11.3335L3.28634 11.8068C3.16217 11.9317 3.09248 12.1007 3.09248 12.2768C3.09248 12.453 3.16217 12.6219 3.28634 12.7468C3.41125 12.871 3.58022 12.9407 3.75634 12.9407C3.93246 12.9407 4.10143 12.871 4.22634 12.7468L4.69967 12.2735C4.80889 12.146 4.86596 11.9819 4.85948 11.8141C4.853 11.6463 4.78345 11.4872 4.66472 11.3685C4.54599 11.2497 4.38683 11.1802 4.21904 11.1737C4.05126 11.1672 3.88721 11.2243 3.75967 11.3335V11.3335ZM7.99967 3.3335C8.17649 3.3335 8.34605 3.26326 8.47108 3.13823C8.5961 3.01321 8.66634 2.84364 8.66634 2.66683V2.00016C8.66634 1.82335 8.5961 1.65378 8.47108 1.52876C8.34605 1.40373 8.17649 1.3335 7.99967 1.3335C7.82286 1.3335 7.65329 1.40373 7.52827 1.52876C7.40325 1.65378 7.33301 1.82335 7.33301 2.00016V2.66683C7.33301 2.84364 7.40325 3.01321 7.52827 3.13823C7.65329 3.26326 7.82286 3.3335 7.99967 3.3335ZM11.773 4.8935C11.9479 4.89276 12.1155 4.82333 12.2397 4.70016L12.713 4.22683C12.7828 4.16706 12.8395 4.09352 12.8795 4.01081C12.9195 3.9281 12.942 3.83801 12.9455 3.7462C12.9491 3.65439 12.9336 3.56283 12.9001 3.47728C12.8666 3.39173 12.8157 3.31403 12.7508 3.24906C12.6858 3.18409 12.6081 3.13325 12.5226 3.09974C12.437 3.06622 12.3455 3.05075 12.2536 3.0543C12.1618 3.05784 12.0717 3.08033 11.989 3.12035C11.9063 3.16036 11.8328 3.21704 11.773 3.28683L11.333 3.76016C11.2088 3.88507 11.1391 4.05404 11.1391 4.23016C11.1391 4.40629 11.2088 4.57525 11.333 4.70016C11.4505 4.81707 11.6074 4.886 11.773 4.8935V4.8935ZM3.77301 4.70016C3.89718 4.82333 4.06478 4.89276 4.23967 4.8935C4.32741 4.894 4.41439 4.87719 4.49561 4.84401C4.57684 4.81083 4.65071 4.76195 4.71301 4.70016C4.83718 4.57525 4.90687 4.40629 4.90687 4.23016C4.90687 4.05404 4.83718 3.88507 4.71301 3.76016L4.23967 3.28683C4.17795 3.22423 4.10451 3.17441 4.02353 3.14019C3.94255 3.10598 3.85563 3.08805 3.76772 3.08743C3.67982 3.08682 3.59265 3.10352 3.5112 3.13659C3.42975 3.16965 3.3556 3.21844 3.29301 3.28016C3.23041 3.34188 3.18058 3.41533 3.14637 3.49631C3.11216 3.57729 3.09423 3.66421 3.09361 3.75212C3.09236 3.92965 3.16169 4.10041 3.28634 4.22683L3.77301 4.70016ZM13.9997 7.3335H13.333C13.1562 7.3335 12.9866 7.40373 12.8616 7.52876C12.7366 7.65378 12.6663 7.82335 12.6663 8.00016C12.6663 8.17697 12.7366 8.34654 12.8616 8.47157C12.9866 8.59659 13.1562 8.66683 13.333 8.66683H13.9997C14.1765 8.66683 14.3461 8.59659 14.4711 8.47157C14.5961 8.34654 14.6663 8.17697 14.6663 8.00016C14.6663 7.82335 14.5961 7.65378 14.4711 7.52876C14.3461 7.40373 14.1765 7.3335 13.9997 7.3335ZM12.2397 11.3335C12.113 11.263 11.9669 11.2358 11.8233 11.2559C11.6798 11.2759 11.5467 11.3422 11.4442 11.4447C11.3417 11.5472 11.2754 11.6803 11.2554 11.8238C11.2353 11.9673 11.2626 12.1135 11.333 12.2402L11.8063 12.7135C11.9312 12.8377 12.1002 12.9074 12.2763 12.9074C12.4525 12.9074 12.6214 12.8377 12.7463 12.7135C12.8705 12.5886 12.9402 12.4196 12.9402 12.2435C12.9402 12.0674 12.8705 11.8984 12.7463 11.7735L12.2397 11.3335ZM7.99967 4.3335C7.27448 4.3335 6.56556 4.54854 5.96258 4.95144C5.3596 5.35434 4.88964 5.92699 4.61212 6.59699C4.33459 7.26699 4.26198 8.00423 4.40346 8.71549C4.54494 9.42676 4.89416 10.0801 5.40695 10.5929C5.91974 11.1057 6.57308 11.4549 7.28434 11.5964C7.99561 11.7379 8.73285 11.6652 9.40285 11.3877C10.0728 11.1102 10.6455 10.6402 11.0484 10.0373C11.4513 9.43427 11.6663 8.72536 11.6663 8.00016C11.6646 7.02824 11.2777 6.09664 10.5905 5.40938C9.9032 4.72213 8.97159 4.33526 7.99967 4.3335ZM7.99967 10.3335C7.53818 10.3335 7.08706 10.1966 6.70334 9.94026C6.31963 9.68387 6.02056 9.31945 5.84396 8.89309C5.66735 8.46673 5.62114 7.99757 5.71118 7.54495C5.80121 7.09233 6.02344 6.67657 6.34976 6.35025C6.67608 6.02392 7.09184 5.8017 7.54446 5.71166C7.99709 5.62163 8.46624 5.66784 8.8926 5.84444C9.31896 6.02105 9.68338 6.32012 9.93977 6.70383C10.1962 7.08755 10.333 7.53867 10.333 8.00016C10.333 8.619 10.0872 9.21249 9.64959 9.65008C9.212 10.0877 8.61851 10.3335 7.99967 10.3335V10.3335ZM7.99967 12.6668C7.82286 12.6668 7.65329 12.7371 7.52827 12.8621C7.40325 12.9871 7.33301 13.1567 7.33301 13.3335V14.0002C7.33301 14.177 7.40325 14.3465 7.52827 14.4716C7.65329 14.5966 7.82286 14.6668 7.99967 14.6668C8.17649 14.6668 8.34605 14.5966 8.47108 14.4716C8.5961 14.3465 8.66634 14.177 8.66634 14.0002V13.3335C8.66634 13.1567 8.5961 12.9871 8.47108 12.8621C8.34605 12.7371 8.17649 12.6668 7.99967 12.6668Z"
                fill="#5D00D2"
              />
            </svg>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setAdvancedSearch(true);
              }}
            >
              or use advanced AI search
            </a>
          </div>
        </div>
        <div className="search-page-inside-div-projcets">
          {" "}
          <div className="relative overflow-x-auto mt-4 rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Record Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Record Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Record Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Updated Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {newArrProjects &&
                  newArrProjects
                    .filter(
                      (entry) =>
                        entry.name
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase()) ||
                        entry._id
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase())
                    )
                    .map((p) => (
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {p._id}
                        </th>
                        <td className="px-6 py-4">{p.name}</td>
                        <td className="px-6 py-4">Project</td>
                        <td className="px-6 py-4">
                          {
                            new Date(p.createdAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          {
                            new Date(p.updatedAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href=""
                            className="text-indigo-600"
                            onClick={(e) => {
                              e.preventDefault();
                              setProjectInsideActiveId(p._id);
                              setProjectInsideActive(true);
                              setWhichTabisActive("projectList");
                            }}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                {samples &&
                  samples
                    .filter(
                      (entry) =>
                        JSON.parse(entry.data)
                          .sampleName.toLowerCase()
                          .includes(inputSearch.toLowerCase()) ||
                        entry._id
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase())
                    )
                    .map((s) => (
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {s._id}
                        </th>
                        <td className="px-6 py-4">
                          {JSON.parse(s.data).sampleName}
                        </td>
                        <td className="px-6 py-4">Sample</td>
                        <td className="px-6 py-4">
                          {
                            new Date(s.createdAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          {
                            new Date(s.updatedAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="text-indigo-600"
                            onClick={async (e) => {
                              e.preventDefault();
                              setSampleContent(s);
                              setSampleModal(true);
                            }}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                {protocols &&
                  protocols
                    .filter(
                      (entry) =>
                        entry.title
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase()) ||
                        entry._id
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase())
                    )
                    .map((s) => (
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {s._id}
                        </th>
                        <td className="px-6 py-4">{s.title}</td>
                        <td className="px-6 py-4">Protocol</td>
                        <td className="px-6 py-4">
                          {
                            new Date(s.createdAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          {
                            new Date(s.updatedAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="text-indigo-600"
                            onClick={async (e) => {
                              e.preventDefault();
                              setProtocolContent(s);
                              setProtocolModal(true);
                            }}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                {sops &&
                  sops
                    .filter(
                      (entry) =>
                        entry.title
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase()) ||
                        entry._id
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase())
                    )
                    .map((s) => (
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {s._id}
                        </th>
                        <td className="px-6 py-4">{s.title}</td>
                        <td className="px-6 py-4">SOP</td>
                        <td className="px-6 py-4">
                          {
                            new Date(s.createdAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          {
                            new Date(s.updatedAt)
                              .toLocaleString("en-GB")
                              .split(",")[0]
                          }
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="text-indigo-600"
                            onClick={async (e) => {
                              e.preventDefault();
                              setSopContent(s);
                              setSopModal(true);
                            }}
                          >
                            View
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
  );
}

export default SearchPage;
