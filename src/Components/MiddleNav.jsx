import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProjectDetails,
  listMyCollabProjects,
  listMyProjects,
} from "../redux/actions/projectActions";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Entries from "./Entries/Entries";
import { addToCart } from "../redux/actions/cartActions";
import ProjectSettings from "./ProjectSettings/ProjectSettings";
import { listMyTasks } from "../redux/actions/taskActions";
import TaskEntries from "./Entries/TaskEntries";
import TaskModal from "./Entries/TaskModal/TaskModal";
import { listMySamples } from "../redux/actions/sampleActions";
import SampleEntries from "./Entries/SampleEntries";
import { listMyEntries } from "../redux/actions/entryActions";
import ProjectController from "./Projects/ProjectController";
import { listMyCollabOrgs } from "../redux/actions/organizationActions";
import _ from "lodash";
import InsideLoader from "./Loader/InsideLoader";
import Select from "react-select";
import MiddleNavComponent from "./MiddleNavComponent";

function MiddleNav({
  id,
  setId,
  addTab,
  setActiveProject,
  setActiveTab,
  removeTab,
  setHomeActive,
  setProfileActive,
  setMiddleNav,
  setNewCollab,
  newCollab,
  setTabId,
  newTask,
  newSample,
  taskModal,
  setTaskModal,
  taskContent,
  setTaskContent,
  setSampleContent,
  setSampleModal,
  setProjectListActive,
  setCalendarActive,
  setSampleListActive,
  projectUpdatedProfilers,
  setProjectUpdatedProfilers,
  setTaskUpdateController,
  taskUpdateController,
  setProjectInsideActiveId,
  setProjectInsideActive,
  setModal,
  projectSettings,
  setProjectSettings,
  setWhichTabisActive,
  updateUserCollabRole,
  setUpdatedUserCollabRole,
  projectInsideActive,
  projectInsideActiveId,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [age, setAge] = React.useState("");
  const [insideProjectId, setInsideProjectId] = useState();
  const [insideProject, setInsideProject] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState("ALL");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;

  const projectListMyOrg = useSelector((state) => state.projectListMyOrg);
  const {
    projects: projectsOrg,
    loading: projectOrgLoading,
    error: errorOrgLoading,
  } = projectListMyOrg;

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;
  const taskListMy = useSelector((state) => state.taskListMy);
  const { tasks, loading: loadingTasks, error: errorTasks } = taskListMy;
  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;

  const entriesListMy = useSelector((state) => state.entriesListMy);
  const {
    entries,
    loading: loadingEntries,
    error: errorEntries,
  } = entriesListMy;

  const fetchFirestoreData = async () => {
    const unsub = onSnapshot(doc(db, "entries", id), (doc) => {
      if (doc.data()) {
        const dataValue = doc.data().data;
        setData(dataValue);
        console.log(dataValue);
      } else {
        setData(null);
      }
    });
  };

  const priorityOptions = [
    {
      value: "High",
      label: "High",
    },
    {
      value: "Medium",
      label: "Medium",
    },
    {
      value: "Low",
      label: "Low",
    },
  ];

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listMyProjects());
      dispatch(listMyCollabProjects());
      dispatch(listMyCollabOrgs());
    }
  }, [dispatch, navigate, userInfo]);

  // useEffect(() => {
  //   if (sucess) {
  //     dispatch(listMyProjects());
  //     dispatch(listMyCollabProjects());
  //   }
  // }, [sucess]);
  useEffect(() => {
    if (newCollab) {
      dispatch(listMyProjects());
      dispatch(listMyCollabProjects());
      dispatch(listMyCollabOrgs());
    }
  }, [newCollab]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!project) {
      // dispatch(listMyProjects());
      // dispatch(listMyCollabProjects());
      // dispatch(getProjectDetails(id));
      // dispatch(listMyTasks(id));
      // dispatch(listMySamples(id));
      // dispatch(listMyEntries(id));
      // fetchFirestoreData();
    } else {
      if (project._id != id) {
        console.log("id mismatch:");
        // dispatch(getProjectDetails(id));
        // dispatch(listMyTasks(id));
        // dispatch(listMySamples(id));
        // dispatch(listMyEntries(id));
        // fetchFirestoreData();
      }
    }
  }, [dispatch, project, id]);

  useEffect(() => {
    if (newCollab) {
      // dispatch(getProjectDetails(id));
      // dispatch(listMyTasks(id));
      // dispatch(listMySamples(id));
      // dispatch(listMyEntries(id));
      // fetchFirestoreData();
    }
  }, [newCollab]);

  useEffect(() => {
    if (newTask) {
      // dispatch(getProjectDetails(id));
      // dispatch(listMyTasks(id));
      // dispatch(listMySamples(id));
      // dispatch(listMyEntries(id));
      // fetchFirestoreData();
    }
  }, [newTask]);

  useEffect(() => {
    if (newSample) {
      // dispatch(getProjectDetails(id));
      // dispatch(listMyTasks(id));
      // dispatch(listMySamples(id));
      // dispatch(listMyEntries(id));
      // fetchFirestoreData();
    }
  }, [newSample]);
  // useEffect(() => {
  //   if (projectUpdatedProfilers) {
  //     console.log("Triggered");
  //     dispatch(getProjectDetails(id));
  //   }
  // }, [projectUpdatedProfilers]);

  // useEffect(() => {
  //   if (taskUpdateController) {
  //     console.log("Triggered");
  //     dispatch(getProjectDetails(id));
  //     dispatch(listMyTasks(id));
  //     dispatch(listMySamples(id));
  //     dispatch(listMyEntries(id));
  //   }
  // }, [taskUpdateController]);

  let newArr =
    projects && projectsCollab && projectsOrg
      ? _.unionBy(projects, projectsCollab, projectsOrg, "_id")
      : _.unionBy(projects, projectsCollab, "_id");

  console.log(projectsOrg);

  return (
    <div className="structure-left">
      {projectInsideActive ? (
        <MiddleNavComponent
          id={projectInsideActiveId}
          projectSettings={projectSettings}
          setProjectSettings={setProjectSettings}
          setMiddleNav={setMiddleNav}
          setModal={setModal}
          setTabId={setTabId}
          setWhichTabisActive={setWhichTabisActive}
          setProjectInsideActive={setProjectInsideActive}
          setTaskModal={setTaskModal}
          setTaskContent={setTaskContent}
          setNewCollab={setNewCollab}
        />
      ) : (
        <div className="sl-inside">
          {projectSettings && (
            <ProjectSettings
              setProjectSettings={setProjectSettings}
              project={project}
              setNewCollab={setNewCollab}
              setProjectUpdatedProfilers={setProjectUpdatedProfilers}
              setUpdatedUserCollabRole={setUpdatedUserCollabRole}
            />
          )}
          <div className="sl-inside-top-back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              onClick={() => {
                setMiddleNav(false);
              }}
            >
              <path
                d="M12.7502 8.25H4.05767L5.78267 6.5325C5.8526 6.46257 5.90807 6.37955 5.94591 6.28819C5.98376 6.19682 6.00323 6.09889 6.00323 6C6.00323 5.90111 5.98376 5.80318 5.94591 5.71181C5.90807 5.62045 5.8526 5.53743 5.78267 5.4675C5.71274 5.39757 5.62972 5.3421 5.53835 5.30426C5.44699 5.26641 5.34906 5.24693 5.25017 5.24693C5.15127 5.24693 5.05335 5.26641 4.96198 5.30426C4.87061 5.3421 4.7876 5.39757 4.71767 5.4675L1.71767 8.4675C1.64939 8.53883 1.59586 8.62294 1.56017 8.715C1.48515 8.8976 1.48515 9.1024 1.56017 9.285C1.59586 9.37706 1.64939 9.46117 1.71767 9.5325L4.71767 12.5325C4.78739 12.6028 4.87034 12.6586 4.96173 12.6967C5.05313 12.7347 5.15116 12.7543 5.25017 12.7543C5.34918 12.7543 5.4472 12.7347 5.5386 12.6967C5.62999 12.6586 5.71294 12.6028 5.78267 12.5325C5.85296 12.4628 5.90876 12.3798 5.94683 12.2884C5.98491 12.197 6.00452 12.099 6.00452 12C6.00452 11.901 5.98491 11.803 5.94683 11.7116C5.90876 11.6202 5.85296 11.5372 5.78267 11.4675L4.05767 9.75H12.7502C12.9491 9.75 13.1398 9.67098 13.2805 9.53033C13.4211 9.38968 13.5002 9.19891 13.5002 9C13.5002 8.80109 13.4211 8.61032 13.2805 8.46967C13.1398 8.32902 12.9491 8.25 12.7502 8.25ZM15.7502 3C15.5513 3 15.3605 3.07902 15.2198 3.21967C15.0792 3.36032 15.0002 3.55109 15.0002 3.75V14.25C15.0002 14.4489 15.0792 14.6397 15.2198 14.7803C15.3605 14.921 15.5513 15 15.7502 15C15.9491 15 16.1398 14.921 16.2805 14.7803C16.4211 14.6397 16.5002 14.4489 16.5002 14.25V3.75C16.5002 3.55109 16.4211 3.36032 16.2805 3.21967C16.1398 3.07902 15.9491 3 15.7502 3V3Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="sl-header">
            <div className="sl-header-top">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <a
                      onClick={(e) => {
                        setProjectInsideActive(false);
                      }}
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                      <svg
                        className="w-3 h-3 mr-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Projects
                    </a>
                  </li>
                </ol>
              </nav>

              <div className="sl-header-top-svgs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <path
                    d="M5.99967 8.66668H7.33301V10C7.33301 10.1768 7.40325 10.3464 7.52827 10.4714C7.65329 10.5964 7.82286 10.6667 7.99967 10.6667C8.17649 10.6667 8.34605 10.5964 8.47108 10.4714C8.5961 10.3464 8.66634 10.1768 8.66634 10V8.66668H9.99967C10.1765 8.66668 10.3461 8.59644 10.4711 8.47141C10.5961 8.34639 10.6663 8.17682 10.6663 8.00001C10.6663 7.8232 10.5961 7.65363 10.4711 7.52861C10.3461 7.40358 10.1765 7.33334 9.99967 7.33334H8.66634V6.00001C8.66634 5.8232 8.5961 5.65363 8.47108 5.52861C8.34605 5.40358 8.17649 5.33334 7.99967 5.33334C7.82286 5.33334 7.65329 5.40358 7.52827 5.52861C7.40325 5.65363 7.33301 5.8232 7.33301 6.00001V7.33334H5.99967C5.82286 7.33334 5.65329 7.40358 5.52827 7.52861C5.40325 7.65363 5.33301 7.8232 5.33301 8.00001C5.33301 8.17682 5.40325 8.34639 5.52827 8.47141C5.65329 8.59644 5.82286 8.66668 5.99967 8.66668V8.66668ZM13.9997 1.33334H1.99967C1.82286 1.33334 1.65329 1.40358 1.52827 1.52861C1.40325 1.65363 1.33301 1.8232 1.33301 2.00001V14C1.33301 14.1768 1.40325 14.3464 1.52827 14.4714C1.65329 14.5964 1.82286 14.6667 1.99967 14.6667H13.9997C14.1765 14.6667 14.3461 14.5964 14.4711 14.4714C14.5961 14.3464 14.6663 14.1768 14.6663 14V2.00001C14.6663 1.8232 14.5961 1.65363 14.4711 1.52861C14.3461 1.40358 14.1765 1.33334 13.9997 1.33334V1.33334ZM13.333 13.3333H2.66634V2.66668H13.333V13.3333Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <input
              type="text"
              placeholder={`Search Project`}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <div className="sl-header-select">
              {" "}
              <select
                id="countries"
                onChange={(e) => {
                  setSelectedProjectType(e.target.value);
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5"
              >
                <option value="ALL" selected>
                  All Projects
                </option>
                <option value="MY">My Projects</option>
                <option value="CP">Collaborated Projects</option>
              </select>
            </div>
          </div>{" "}
          {loadingOrders ? (
            <div className="loader-div-main-stellr">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="sl-elements-content">
              {selectedProjectType === "ALL" &&
                newArr &&
                newArr.length > 0 &&
                newArr
                  .filter((entry) =>
                    entry.name.toLowerCase().includes(inputSearch.toLowerCase())
                  )
                  .map((order) => (
                    <ProjectController
                      order={order}
                      setProjectListActive={setProjectListActive}
                      setProjectInsideActive={setProjectInsideActive}
                      setProjectInsideActiveId={setProjectInsideActiveId}
                      setWhichTabisActive={setWhichTabisActive}
                    />
                  ))}{" "}
              {selectedProjectType === "MY" &&
                projects &&
                projects.length > 0 &&
                projects
                  .filter((entry) =>
                    entry.name.toLowerCase().includes(inputSearch.toLowerCase())
                  )
                  .map((order) => (
                    <ProjectController
                      order={order}
                      setProjectListActive={setProjectListActive}
                      setProjectInsideActive={setProjectInsideActive}
                      setProjectInsideActiveId={setProjectInsideActiveId}
                      setWhichTabisActive={setWhichTabisActive}
                    />
                  ))}
              {selectedProjectType === "CP" &&
                projectsCollab &&
                projectsCollab.length > 0 &&
                projectsCollab
                  .filter((entry) =>
                    entry.name.toLowerCase().includes(inputSearch.toLowerCase())
                  )
                  .map((order) => (
                    <ProjectController
                      order={order}
                      setProjectListActive={setProjectListActive}
                      setProjectInsideActive={setProjectInsideActive}
                      setProjectInsideActiveId={setProjectInsideActiveId}
                      setWhichTabisActive={setWhichTabisActive}
                    />
                  ))}
            </div>
          )}
          {/* {projectsCollab && projectsCollab.length > 0 ? (
          projectsCollab.map((order) => (
            <ProjectController
              order={order}
              setMiddleNav={setMiddleNav}
              setId={setId}
              type="collab"
              setProjectListActive={setProjectListActive}
              setSampleListActive={setSampleListActive}
            />
          ))
        ) : (
          <div className="mnc-element"></div>
        )} */}
          {/* {entries &&
            entries
              .filter((entry) =>
                entry.name.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .map((doc) => (
                <Entries
                  doc={doc}
                  addTab={addTab}
                  projectId={id}
                  data={data}
                  setActiveTab={setActiveTab}
                  removeTab={removeTab}
                  setHomeActive={setHomeActive}
                  setProfileActive={setProfileActive}
                  setTabId={setTabId}
                  project={project}
                  setProjectListActive={setProjectListActive}
                  setCalendarActive={setCalendarActive}
                  setSampleListActive={setSampleListActive}
                />
              ))}

          {tasks &&
            tasks
              .filter((entry) =>
                entry.subject.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .map((doc) => (
                <TaskEntries
                  doc={doc}
                  setTaskModal={setTaskModal}
                  setTaskContent={setTaskContent}
                />
              ))} */}
        </div>
      )}
    </div>
  );
}

export default MiddleNav;
