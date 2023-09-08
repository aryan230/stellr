import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyEntries } from "../redux/actions/entryActions";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../redux/actions/organizationActions";
import ProjectSettings from "./ProjectSettings/ProjectSettings";
import { getProjectDetails } from "../redux/actions/projectActions";
import InsideLoader from "./Loader/InsideLoader";
import Entries from "./Entries/Entries";
import TaskEntries from "./Entries/TaskEntries";
import { listMyTasks } from "../redux/actions/taskActions";

function MiddleNavComponent({
  id,
  projectSettings,
  setProjectSettings,
  setMiddleNav,
  setModal,
  setTabId,
  setWhichTabisActive,
  setProjectInsideActive,
  setTaskModal,
  setNewCollab,
  setTaskContent,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;
  const entriesListMy = useSelector((state) => state.entriesListMy);
  const {
    entries,
    loading: loadingEntries,
    error: errorEntries,
  } = entriesListMy;

  const orgListMy = useSelector((state) => state.orgListMy);
  const { sucess: sucess, orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;
  const taskListMy = useSelector((state) => state.taskListMy);
  const { tasks, loading: loadingTasks, error: errorTasks } = taskListMy;
  useEffect(() => {
    dispatch(getProjectDetails(id));
    dispatch(listMyEntries(id));
    dispatch(listMyTasks(id));
    dispatch(listMyOrgs());
    dispatch(listMyCollabOrgs());
  }, [dispatch]);

  const findOrg =
    orgs && orgs.length > 0
      ? orgs[0].collaborators.find((e) => e.user == userInfo._id)
      : orgsCollab && orgsCollab.length > 0
      ? orgsCollab[0].collaborators.find((e) => e.user == userInfo._id)
      : null;

  const findOwner = project && project.user === userInfo._id && "owner";

  const find =
    project && project.collaborators.find((e) => e.user == userInfo._id);

  return (
    <div className="sl-inside">
      {/* {projectSettings && (
        <ProjectSettings
          //   setProjectSettings={setProjectSettings}
          project={project}
          setNewCollab={setNewCollab}
          //   setNewCollab={setNewCollab}
          //   setProjectUpdatedProfilers={setProjectUpdatedProfilers}
          //   setUpdatedUserCollabRole={setUpdatedUserCollabRole}
        />
      )} */}
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
          <p
            onClick={(e) => {
              setProjectInsideActive(false);
            }}
          >
            Projects / <br />
            <span>{project && project.name}</span>
          </p>

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
          {/* <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5"
          >
            <option value="US" selected>
              All Projects
            </option>
            <option value="CA">My Projects</option>
            <option value="FR">Collaborated Projects</option>
          </select> */}
        </div>
      </div>{" "}
      {loadingEntries ? (
        <InsideLoader />
      ) : (
        <div className="sl-elements-content">
          {entries &&
            entries
              .filter((entry) =>
                entry.name.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .map((doc, index) => (
                <Entries
                  doc={doc}
                  projectId={id}
                  setTabId={setTabId}
                  project={project && project}
                  setWhichTabisActive={setWhichTabisActive}
                  orgs={orgs}
                  orgsCollab={orgsCollab}
                  index={index}
                  entryType={true}
                />
              ))}
          {tasks &&
            tasks
              .filter((entry) =>
                entry.subject.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .map((doc, index) => (
                <TaskEntries
                  doc={doc}
                  setTaskModal={setTaskModal}
                  setTaskContent={setTaskContent}
                  index={index}
                  taskFrom={true}
                />
              ))}

          {/* {entries && entries.length === 0 && tasks && tasks.length === 0 && (
            <div className="middlenav-empty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M31.6663 3.33333H8.33301C7.00693 3.33333 5.73516 3.86011 4.79747 4.79779C3.85979 5.73548 3.33301 7.00725 3.33301 8.33333V10.2833C3.33277 10.9716 3.47462 11.6524 3.74967 12.2833V12.3833C3.98514 12.9183 4.31866 13.4044 4.73301 13.8167L14.9997 24.0167V35C14.9991 35.2832 15.0707 35.5619 15.2078 35.8098C15.3449 36.0577 15.5428 36.2665 15.783 36.4167C16.0482 36.581 16.3543 36.6677 16.6663 36.6667C16.9272 36.6651 17.1841 36.6023 17.4163 36.4833L24.083 33.15C24.3579 33.0115 24.589 32.7996 24.7508 32.5378C24.9126 32.276 24.9987 31.9744 24.9997 31.6667V24.0167L35.1997 13.8167C35.614 13.4044 35.9475 12.9183 36.183 12.3833V12.2833C36.481 11.6574 36.6456 10.9763 36.6663 10.2833V8.33333C36.6663 7.00725 36.1396 5.73548 35.2019 4.79779C34.2642 3.86011 32.9924 3.33333 31.6663 3.33333ZM22.1497 22.15C21.9952 22.3057 21.873 22.4904 21.7901 22.6935C21.7071 22.8965 21.6651 23.114 21.6663 23.3333V30.6333L18.333 32.3V23.3333C18.3343 23.114 18.2922 22.8965 18.2093 22.6935C18.1264 22.4904 18.0041 22.3057 17.8497 22.15L9.01634 13.3333H30.983L22.1497 22.15ZM33.333 10H6.66634V8.33333C6.66634 7.8913 6.84194 7.46738 7.1545 7.15482C7.46706 6.84226 7.89098 6.66666 8.33301 6.66666H31.6663C32.1084 6.66666 32.5323 6.84226 32.8449 7.15482C33.1574 7.46738 33.333 7.8913 33.333 8.33333V10Z"
                  fill="#686868"
                />
              </svg>
              <h1>
                Nothing here yet. if you think this is a mistake click refresh.
              </h1>
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  await setSelectedProjectNow(project);
                  setEntryModal(true);
                }}
              >
                Create new entry
              </a>
            </div>
          )} */}
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
  );
}

export default MiddleNavComponent;
