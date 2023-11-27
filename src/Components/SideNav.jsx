import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateModal from "./Modals/CreateModal";
import Loader from "../css/utils/Loader";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  listMyCollabProjects,
  listMyOrgProjects,
  listMyProjects,
} from "../redux/actions/projectActions";
import ProjectController from "./Projects/ProjectController";
import CreateEntry from "./Modals/CreateEntry";
import CreateTask from "./Modals/CreateTask";
import CreateSample from "./Modals/CreateSample";
import CreateProtocol from "./Modals/CreateProtocol";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../redux/actions/organizationActions";
import CreateSop from "./Modals/CreateSop";
import { addToState } from "../redux/actions/stateActions";
import DataExport from "./DataExport/DataExport";
import {
  Biohazard,
  Calendar,
  Folders,
  Home,
  KanbanSquare,
  LayoutGrid,
  PackageOpen,
  Plus,
  Recycle,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react";
import CreateKetcher from "./Modals/CreateKetcher";

function SideNav({
  setMiddleNav,
  setId,
  addTab,
  setActiveTab,
  setHomeActive,
  setProfileActive,
  newCollab,
  setNewTask,
  setNewSample,
  setActiveProject,
  setActiveProjectId,
  setProjectListActive,
  setProjectInsideActive,
  setProjectInsideActiveId,
  setCalendarActive,
  setSampleListActive,
  setWhichTabisActive,
  modal,
  setModal,
  entryModal,
  setEntryModal,
  setTabId,
  setNewEntry,
  setTaskModal,
  taskModal,
  selectedProjectNow,
  sampleModal,
  setSampleModal,
  setCreateOrg,
  setCreateNewProtocol,
  createNewProtocol,
  setNewProtocol,
  setCreateNewSop,
  createNewSop,
  setNewSop,
  createDrawingModal,
  setCreateDrawingModal,
  setCDModal,
  setCDModalContent,
  CDUpdate,
  setCDUpdate,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [dataExport, setDataExport] = useState(false);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
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

  const projectListMyOrg = useSelector((state) => state.projectListMyOrg);
  const {
    projects: projectsOrg,
    loading: projectOrgLoading,
    error: errorOrgLoading,
  } = projectListMyOrg;

  const orgListMy = useSelector((state) => state.orgListMy);
  const { orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;

  const projectCreate = useSelector((state) => state.projectCreate);
  const { project, sucess, error, loading: orderCreateLoading } = projectCreate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listMyProjects());
      dispatch(listMyCollabProjects());
      dispatch(listMyOrgProjects());
      dispatch(listMyOrgs());
      dispatch(listMyCollabOrgs());
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (sucess) {
      dispatch(listMyProjects());
      dispatch(listMyCollabProjects());
      dispatch(listMyOrgProjects());
      dispatch(listMyOrgs());
      dispatch(listMyCollabOrgs());
    }
  }, [sucess]);

  useEffect(() => {
    if (newCollab) {
      dispatch(listMyProjects());
      dispatch(listMyCollabProjects());
      dispatch(listMyOrgProjects());
      dispatch(listMyOrgs());
      dispatch(listMyCollabOrgs());
    }
  }, [newCollab]);

  return (
    <div className="navbar">
      {modal && (
        <CreateModal
          setModal={setModal}
          setMiddleNav={setMiddleNav}
          setId={setId}
          setActiveProject={setActiveProject}
          setActiveProjectId={setActiveProjectId}
          setProjectListActive={setProjectListActive}
          setHomeActive={setHomeActive}
          setProfileActive={setProfileActive}
          setProjectInsideActive={setProjectInsideActive}
          setProjectInsideActiveId={setProjectInsideActiveId}
          setWhichTabisActive={setWhichTabisActive}
        />
      )}
      {createDrawingModal && (
        <CreateKetcher
          setCreateDrawingModal={setCreateDrawingModal}
          setWhichTabisActive={setWhichTabisActive}
          setCDUpdate={setCDUpdate}
        />
      )}
      {dataExport && <DataExport setDataExport={setDataExport} />}
      {entryModal && (
        <CreateEntry
          setEntryModal={setEntryModal}
          projects={projects ? projects : []}
          projectsCollab={projectsCollab ? projectsCollab : []}
          projectsOrg={projectsOrg ? projectsOrg : []}
          setMiddleNav={setMiddleNav}
          setId={setId}
          setWhichTabisActive={setWhichTabisActive}
          setTabId={setTabId}
          setNewEntry={setNewEntry}
          selectedProjectNow={selectedProjectNow}
          orgs={orgs}
          orgsCollab={orgsCollab}
          setProjectInsideActive={setProjectInsideActive}
          setProjectInsideActiveId={setProjectInsideActiveId}
        />
      )}
      {createNewProtocol && (
        <CreateProtocol
          setCreateNewProtocol={setCreateNewProtocol}
          setNewProtocol={setNewProtocol}
          setWhichTabisActive={setWhichTabisActive}
        />
      )}
      {createNewSop && (
        <CreateSop
          setCreateNewSop={setCreateNewSop}
          setNewSop={setNewSop}
          setWhichTabisActive={setWhichTabisActive}
        />
      )}
      {taskModal && (
        <CreateTask
          setTaskModal={setTaskModal}
          projects={projects ? projects : []}
          projectsCollab={projectsCollab ? projectsCollab : []}
          setMiddleNav={setMiddleNav}
          setWhichTabisActive={setWhichTabisActive}
          setNewTask={setNewTask}
          setProjectInsideActive={setProjectInsideActive}
          setProjectInsideActiveId={setProjectInsideActiveId}
          selectedProjectNow={selectedProjectNow}
          projectsOrg={projectsOrg ? projectsOrg : []}
          orgs={orgs}
          orgsCollab={orgsCollab}
        />
      )}
      {sampleModal && (
        <CreateSample
          setSampleModal={setSampleModal}
          projects={projects ? projects : []}
          projectsCollab={projectsCollab ? projectsCollab : []}
          projectsOrg={projectsOrg ? projectsOrg : []}
          setNewSample={setNewSample}
          setWhichTabisActive={setWhichTabisActive}
        />
      )}
      {loader && <Loader />}

      <div className="top-navbar">
        <ul>
          <li>
            <a
              href=""
              onClick={async (e) => {
                e.preventDefault();
                setMiddleNav(false);
                await dispatch(addToState("home"));
                setWhichTabisActive("home");
              }}
            >
              <Home size={18} color="white" />
              Home
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setMiddleNav(true);
                dispatch(addToState("projectList"));
                setWhichTabisActive("projectList");
              }}
            >
              <Folders size={18} color="white" />
              Projects
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={async (e) => {
                e.preventDefault();
                setMiddleNav(false);
                await dispatch(addToState("search"));
                setWhichTabisActive("search");
              }}
            >
              <Search size={18} color="white" />
              Search
            </a>
          </li>
          <li className="create">
            <a href="#">
              <Plus size={18} color="white" />
              Create
            </a>
            <div className="drop-down-content">
              <div className="middle-navbar-container">
                <button
                  onClick={() => {
                    setLoader(true);
                    window.setTimeout(() => {
                      setLoader(false);
                      setModal(true);
                    }, 2000);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <Folders size={16} />
                      <p>Project</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLoader(true);
                    window.setTimeout(() => {
                      setLoader(false);
                      setEntryModal(true);
                    }, 2000);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 5.96C13.3267 5.89876 13.3133 5.83842 13.2937 5.78V5.72C13.2616 5.65146 13.2188 5.58845 13.167 5.53334V5.53334L9.16699 1.53334C9.11188 1.48148 9.04887 1.43872 8.98033 1.40667H8.92033C8.8526 1.36783 8.77781 1.3429 8.70033 1.33334H4.66699C4.13656 1.33334 3.62785 1.54405 3.25278 1.91912C2.87771 2.2942 2.66699 2.8029 2.66699 3.33334V12.6667C2.66699 13.1971 2.87771 13.7058 3.25278 14.0809C3.62785 14.456 4.13656 14.6667 4.66699 14.6667H11.3337C11.8641 14.6667 12.3728 14.456 12.7479 14.0809C13.1229 13.7058 13.3337 13.1971 13.3337 12.6667V6C13.3337 6 13.3337 6 13.3337 5.96ZM9.33366 3.60667L11.0603 5.33334H10.0003C9.82351 5.33334 9.65395 5.2631 9.52892 5.13807C9.4039 5.01305 9.33366 4.84348 9.33366 4.66667V3.60667ZM12.0003 12.6667C12.0003 12.8435 11.9301 13.013 11.8051 13.1381C11.68 13.2631 11.5105 13.3333 11.3337 13.3333H4.66699C4.49018 13.3333 4.32061 13.2631 4.19559 13.1381C4.07056 13.013 4.00033 12.8435 4.00033 12.6667V3.33334C4.00033 3.15652 4.07056 2.98696 4.19559 2.86193C4.32061 2.73691 4.49018 2.66667 4.66699 2.66667H8.00033V4.66667C8.00033 5.1971 8.21104 5.70581 8.58611 6.08088C8.96118 6.45596 9.46989 6.66667 10.0003 6.66667H12.0003V12.6667Z"
                          fill="black"
                        />
                      </svg>
                      <p>Entry</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLoader(true);
                    window.setTimeout(() => {
                      setLoader(false);
                      setTaskModal(true);
                    }, 2000);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6.80634 9.83333C6.86832 9.89581 6.94205 9.94541 7.02329 9.97926C7.10453 10.0131 7.19167 10.0305 7.27967 10.0305C7.36768 10.0305 7.45482 10.0131 7.53606 9.97926C7.6173 9.94541 7.69103 9.89581 7.75301 9.83333L10.473 7.11333C10.5985 6.98779 10.6691 6.81753 10.6691 6.63999C10.6691 6.46246 10.5985 6.2922 10.473 6.16666C10.3475 6.04113 10.1772 5.9706 9.99967 5.9706C9.82214 5.9706 9.65188 6.04113 9.52634 6.16666L7.27967 8.41999L6.47301 7.60666C6.34747 7.48113 6.17721 7.4106 5.99967 7.4106C5.82214 7.4106 5.65188 7.48113 5.52634 7.60666C5.40081 7.7322 5.33028 7.90246 5.33028 8.07999C5.33028 8.25753 5.40081 8.42779 5.52634 8.55333L6.80634 9.83333ZM13.9997 1.33333H1.99967C1.82286 1.33333 1.65329 1.40357 1.52827 1.52859C1.40325 1.65361 1.33301 1.82318 1.33301 1.99999V14C1.33301 14.1768 1.40325 14.3464 1.52827 14.4714C1.65329 14.5964 1.82286 14.6667 1.99967 14.6667H13.9997C14.1765 14.6667 14.3461 14.5964 14.4711 14.4714C14.5961 14.3464 14.6663 14.1768 14.6663 14V1.99999C14.6663 1.82318 14.5961 1.65361 14.4711 1.52859C14.3461 1.40357 14.1765 1.33333 13.9997 1.33333V1.33333ZM13.333 13.3333H2.66634V2.66666H13.333V13.3333Z"
                          fill="black"
                        />
                      </svg>
                      <p>Tasks</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLoader(true);
                    window.setTimeout(() => {
                      setLoader(false);
                      setCreateDrawingModal(true);
                    }, 2000);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <Biohazard size={16} />
                      <p>Chemical Drawing</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLoader(true);
                    window.setTimeout(() => {
                      setLoader(false);
                      setSampleModal(true);
                    }, 2000);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M14.473 7.52666L11.1397 4.19333C11.0774 4.13154 11.0035 4.08266 10.9223 4.04948C10.8411 4.01631 10.7541 3.99949 10.6663 4H3.33301C2.80257 4 2.29387 4.21071 1.91879 4.58578C1.54372 4.96086 1.33301 5.46956 1.33301 6V10C1.33301 10.5304 1.54372 11.0391 1.91879 11.4142C2.29387 11.7893 2.80257 12 3.33301 12H10.6663C10.7541 12.0005 10.8411 11.9837 10.9223 11.9505C11.0035 11.9173 11.0774 11.8684 11.1397 11.8067L14.473 8.47333C14.5355 8.41135 14.5851 8.33762 14.6189 8.25638C14.6528 8.17514 14.6702 8.088 14.6702 8C14.6702 7.91199 14.6528 7.82485 14.6189 7.74361C14.5851 7.66237 14.5355 7.58864 14.473 7.52666ZM10.393 10.6667H3.33301C3.1562 10.6667 2.98663 10.5964 2.8616 10.4714C2.73658 10.3464 2.66634 10.1768 2.66634 10V6C2.66634 5.82318 2.73658 5.65362 2.8616 5.52859C2.98663 5.40357 3.1562 5.33333 3.33301 5.33333H10.393L13.0597 8L10.393 10.6667Z"
                          fill="black"
                        />
                      </svg>
                      <p>Sample</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLoader(true);
                    window.setTimeout(() => {
                      setLoader(false);
                      setCreateNewProtocol(true);
                    }, 2000);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M11.9993 1.33337H5.33268C4.62544 1.33337 3.94716 1.61433 3.44706 2.11442C2.94697 2.61452 2.66602 3.2928 2.66602 4.00004V12C2.66602 12.7073 2.94697 13.3856 3.44706 13.8857C3.94716 14.3858 4.62544 14.6667 5.33268 14.6667H11.9993C12.353 14.6667 12.6921 14.5262 12.9422 14.2762C13.1922 14.0261 13.3327 13.687 13.3327 13.3334V2.66671C13.3327 2.31309 13.1922 1.97395 12.9422 1.7239C12.6921 1.47385 12.353 1.33337 11.9993 1.33337ZM3.99935 4.00004C3.99935 3.64642 4.13982 3.30728 4.38987 3.05723C4.63992 2.80718 4.97906 2.66671 5.33268 2.66671H11.9993V9.33337H5.33268C4.86271 9.33534 4.40201 9.46434 3.99935 9.70671V4.00004ZM5.33268 13.3334C4.97906 13.3334 4.63992 13.1929 4.38987 12.9428C4.13982 12.6928 3.99935 12.3537 3.99935 12C3.99935 11.6464 4.13982 11.3073 4.38987 11.0572C4.63992 10.8072 4.97906 10.6667 5.33268 10.6667H11.9993V13.3334H5.33268ZM6.66602 5.33337H9.33268C9.50949 5.33337 9.67906 5.26314 9.80409 5.13811C9.92911 5.01309 9.99935 4.84352 9.99935 4.66671C9.99935 4.4899 9.92911 4.32033 9.80409 4.1953C9.67906 4.07028 9.50949 4.00004 9.33268 4.00004H6.66602C6.4892 4.00004 6.31964 4.07028 6.19461 4.1953C6.06959 4.32033 5.99935 4.4899 5.99935 4.66671C5.99935 4.84352 6.06959 5.01309 6.19461 5.13811C6.31964 5.26314 6.4892 5.33337 6.66602 5.33337V5.33337Z"
                          fill="black"
                        />
                      </svg>
                      <p>Protocol</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLoader(true);
                    window.setTimeout(() => {
                      setLoader(false);
                      setCreateNewSop(true);
                    }, 2000);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M5.99935 6.66671H6.66602C6.84283 6.66671 7.0124 6.59647 7.13742 6.47144C7.26244 6.34642 7.33268 6.17685 7.33268 6.00004C7.33268 5.82323 7.26244 5.65366 7.13742 5.52864C7.0124 5.40361 6.84283 5.33337 6.66602 5.33337H5.99935C5.82254 5.33337 5.65297 5.40361 5.52794 5.52864C5.40292 5.65366 5.33268 5.82323 5.33268 6.00004C5.33268 6.17685 5.40292 6.34642 5.52794 6.47144C5.65297 6.59647 5.82254 6.66671 5.99935 6.66671V6.66671ZM5.99935 8.00004C5.82254 8.00004 5.65297 8.07028 5.52794 8.1953C5.40292 8.32033 5.33268 8.4899 5.33268 8.66671C5.33268 8.84352 5.40292 9.01309 5.52794 9.13811C5.65297 9.26314 5.82254 9.33337 5.99935 9.33337H9.99935C10.1762 9.33337 10.3457 9.26314 10.4708 9.13811C10.5958 9.01309 10.666 8.84352 10.666 8.66671C10.666 8.4899 10.5958 8.32033 10.4708 8.1953C10.3457 8.07028 10.1762 8.00004 9.99935 8.00004H5.99935ZM13.3327 5.96004C13.3257 5.8988 13.3123 5.83846 13.2927 5.78004V5.72004C13.2606 5.65149 13.2179 5.58848 13.166 5.53337V5.53337L9.16602 1.53337C9.11091 1.48152 9.0479 1.43876 8.97935 1.40671C8.95945 1.40388 8.93925 1.40388 8.91935 1.40671C8.85163 1.36787 8.77683 1.34294 8.69935 1.33337H4.66602C4.13558 1.33337 3.62687 1.54409 3.2518 1.91916C2.87673 2.29423 2.66602 2.80294 2.66602 3.33337V12.6667C2.66602 13.1971 2.87673 13.7058 3.2518 14.0809C3.62687 14.456 4.13558 14.6667 4.66602 14.6667H11.3327C11.8631 14.6667 12.3718 14.456 12.7469 14.0809C13.122 13.7058 13.3327 13.1971 13.3327 12.6667V6.00004C13.3327 6.00004 13.3327 6.00004 13.3327 5.96004ZM9.33268 3.60671L11.0593 5.33337H9.99935C9.82254 5.33337 9.65297 5.26314 9.52794 5.13811C9.40292 5.01309 9.33268 4.84352 9.33268 4.66671V3.60671ZM11.9993 12.6667C11.9993 12.8435 11.9291 13.0131 11.8041 13.1381C11.6791 13.2631 11.5095 13.3334 11.3327 13.3334H4.66602C4.4892 13.3334 4.31964 13.2631 4.19461 13.1381C4.06959 13.0131 3.99935 12.8435 3.99935 12.6667V3.33337C3.99935 3.15656 4.06959 2.98699 4.19461 2.86197C4.31964 2.73695 4.4892 2.66671 4.66602 2.66671H7.99935V4.66671C7.99935 5.19714 8.21006 5.70585 8.58514 6.08092C8.96021 6.45599 9.46892 6.66671 9.99935 6.66671H11.9993V12.6667ZM9.99935 10.6667H5.99935C5.82254 10.6667 5.65297 10.7369 5.52794 10.862C5.40292 10.987 5.33268 11.1566 5.33268 11.3334C5.33268 11.5102 5.40292 11.6798 5.52794 11.8048C5.65297 11.9298 5.82254 12 5.99935 12H9.99935C10.1762 12 10.3457 11.9298 10.4708 11.8048C10.5958 11.6798 10.666 11.5102 10.666 11.3334C10.666 11.1566 10.5958 10.987 10.4708 10.862C10.3457 10.7369 10.1762 10.6667 9.99935 10.6667Z"
                          fill="black"
                        />
                      </svg>
                      <p>SOP</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </li>
          <li>
            <a
              href=""
              onClick={async (e) => {
                e.preventDefault();
                setMiddleNav(false);
                await dispatch(addToState("chemicalList"));
                setWhichTabisActive("chemicalList");
              }}
            >
              <Biohazard size={16} />
              Chemical Drawing
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setMiddleNav(false);
                setWhichTabisActive("calendar");
              }}
            >
              <Calendar size={18} color="white" />
              Calender
            </a>
          </li>
          <li className="create">
            <a href="#">
              <LayoutGrid size={18} color="white" />
              Registries
            </a>
            <div className="drop-down-content">
              <div className="middle-navbar-container">
                {/* <button
                  onClick={async () => {
                    setMiddleNav(false);
                    await dispatch(addToState("chemicalList"));
                    setWhichTabisActive("chemicalList");
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <Biohazard size={16} />
                      <p>Chemical Drawing</p>
                    </div>
                  </div>
                </button> */}
                <button
                  onClick={async () => {
                    setMiddleNav(false);
                    await dispatch(addToState("sampleList"));
                    setWhichTabisActive("sampleList");
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M14.473 7.52666L11.1397 4.19333C11.0774 4.13154 11.0035 4.08266 10.9223 4.04948C10.8411 4.01631 10.7541 3.99949 10.6663 4H3.33301C2.80257 4 2.29387 4.21071 1.91879 4.58578C1.54372 4.96086 1.33301 5.46956 1.33301 6V10C1.33301 10.5304 1.54372 11.0391 1.91879 11.4142C2.29387 11.7893 2.80257 12 3.33301 12H10.6663C10.7541 12.0005 10.8411 11.9837 10.9223 11.9505C11.0035 11.9173 11.0774 11.8684 11.1397 11.8067L14.473 8.47333C14.5355 8.41135 14.5851 8.33762 14.6189 8.25638C14.6528 8.17514 14.6702 8.088 14.6702 8C14.6702 7.91199 14.6528 7.82485 14.6189 7.74361C14.5851 7.66237 14.5355 7.58864 14.473 7.52666ZM10.393 10.6667H3.33301C3.1562 10.6667 2.98663 10.5964 2.8616 10.4714C2.73658 10.3464 2.66634 10.1768 2.66634 10V6C2.66634 5.82318 2.73658 5.65362 2.8616 5.52859C2.98663 5.40357 3.1562 5.33333 3.33301 5.33333H10.393L13.0597 8L10.393 10.6667Z"
                          fill="black"
                        />
                      </svg>
                      <p>Samples</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={async () => {
                    setMiddleNav(false);
                    await dispatch(addToState("listProtocols"));
                    setWhichTabisActive("listProtocols");
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill="none"
                      >
                        <path
                          d="M10.0003 0.333344H3.33366C2.62641 0.333344 1.94814 0.614295 1.44804 1.11439C0.947944 1.61449 0.666992 2.29277 0.666992 3.00001V11C0.666992 11.7073 0.947944 12.3855 1.44804 12.8856C1.94814 13.3857 2.62641 13.6667 3.33366 13.6667H10.0003C10.3539 13.6667 10.6931 13.5262 10.9431 13.2762C11.1932 13.0261 11.3337 12.687 11.3337 12.3333V1.66668C11.3337 1.31305 11.1932 0.973916 10.9431 0.723868C10.6931 0.473819 10.3539 0.333344 10.0003 0.333344ZM2.00033 3.00001C2.00033 2.64639 2.1408 2.30725 2.39085 2.0572C2.6409 1.80715 2.98004 1.66668 3.33366 1.66668H10.0003V8.33334H3.33366C2.86369 8.33531 2.40299 8.46431 2.00033 8.70668V3.00001ZM3.33366 12.3333C2.98004 12.3333 2.6409 12.1929 2.39085 11.9428C2.1408 11.6928 2.00033 11.3536 2.00033 11C2.00033 10.6464 2.1408 10.3072 2.39085 10.0572C2.6409 9.80715 2.98004 9.66668 3.33366 9.66668H10.0003V12.3333H3.33366ZM4.66699 4.33334H7.33366C7.51047 4.33334 7.68004 4.26311 7.80506 4.13808C7.93009 4.01306 8.00033 3.84349 8.00033 3.66668C8.00033 3.48987 7.93009 3.3203 7.80506 3.19527C7.68004 3.07025 7.51047 3.00001 7.33366 3.00001H4.66699C4.49018 3.00001 4.32061 3.07025 4.19559 3.19527C4.07056 3.3203 4.00033 3.48987 4.00033 3.66668C4.00033 3.84349 4.07056 4.01306 4.19559 4.13808C4.32061 4.26311 4.49018 4.33334 4.66699 4.33334Z"
                          fill="black"
                        />
                      </svg>
                      <p>Protocols</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={async () => {
                    setMiddleNav(false);
                    await dispatch(addToState("listSops"));
                    setWhichTabisActive("listSops");
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M5.99935 6.66671H6.66602C6.84283 6.66671 7.0124 6.59647 7.13742 6.47144C7.26244 6.34642 7.33268 6.17685 7.33268 6.00004C7.33268 5.82323 7.26244 5.65366 7.13742 5.52864C7.0124 5.40361 6.84283 5.33337 6.66602 5.33337H5.99935C5.82254 5.33337 5.65297 5.40361 5.52794 5.52864C5.40292 5.65366 5.33268 5.82323 5.33268 6.00004C5.33268 6.17685 5.40292 6.34642 5.52794 6.47144C5.65297 6.59647 5.82254 6.66671 5.99935 6.66671V6.66671ZM5.99935 8.00004C5.82254 8.00004 5.65297 8.07028 5.52794 8.1953C5.40292 8.32033 5.33268 8.4899 5.33268 8.66671C5.33268 8.84352 5.40292 9.01309 5.52794 9.13811C5.65297 9.26314 5.82254 9.33337 5.99935 9.33337H9.99935C10.1762 9.33337 10.3457 9.26314 10.4708 9.13811C10.5958 9.01309 10.666 8.84352 10.666 8.66671C10.666 8.4899 10.5958 8.32033 10.4708 8.1953C10.3457 8.07028 10.1762 8.00004 9.99935 8.00004H5.99935ZM13.3327 5.96004C13.3257 5.8988 13.3123 5.83846 13.2927 5.78004V5.72004C13.2606 5.65149 13.2179 5.58848 13.166 5.53337V5.53337L9.16602 1.53337C9.11091 1.48152 9.0479 1.43876 8.97935 1.40671C8.95945 1.40388 8.93925 1.40388 8.91935 1.40671C8.85163 1.36787 8.77683 1.34294 8.69935 1.33337H4.66602C4.13558 1.33337 3.62687 1.54409 3.2518 1.91916C2.87673 2.29423 2.66602 2.80294 2.66602 3.33337V12.6667C2.66602 13.1971 2.87673 13.7058 3.2518 14.0809C3.62687 14.456 4.13558 14.6667 4.66602 14.6667H11.3327C11.8631 14.6667 12.3718 14.456 12.7469 14.0809C13.122 13.7058 13.3327 13.1971 13.3327 12.6667V6.00004C13.3327 6.00004 13.3327 6.00004 13.3327 5.96004ZM9.33268 3.60671L11.0593 5.33337H9.99935C9.82254 5.33337 9.65297 5.26314 9.52794 5.13811C9.40292 5.01309 9.33268 4.84352 9.33268 4.66671V3.60671ZM11.9993 12.6667C11.9993 12.8435 11.9291 13.0131 11.8041 13.1381C11.6791 13.2631 11.5095 13.3334 11.3327 13.3334H4.66602C4.4892 13.3334 4.31964 13.2631 4.19461 13.1381C4.06959 13.0131 3.99935 12.8435 3.99935 12.6667V3.33337C3.99935 3.15656 4.06959 2.98699 4.19461 2.86197C4.31964 2.73695 4.4892 2.66671 4.66602 2.66671H7.99935V4.66671C7.99935 5.19714 8.21006 5.70585 8.58514 6.08092C8.96021 6.45599 9.46892 6.66671 9.99935 6.66671H11.9993V12.6667ZM9.99935 10.6667H5.99935C5.82254 10.6667 5.65297 10.7369 5.52794 10.862C5.40292 10.987 5.33268 11.1566 5.33268 11.3334C5.33268 11.5102 5.40292 11.6798 5.52794 11.8048C5.65297 11.9298 5.82254 12 5.99935 12H9.99935C10.1762 12 10.3457 11.9298 10.4708 11.8048C10.5958 11.6798 10.666 11.5102 10.666 11.3334C10.666 11.1566 10.5958 10.987 10.4708 10.862C10.3457 10.7369 10.1762 10.6667 9.99935 10.6667Z"
                          fill="black"
                        />
                      </svg>
                      <p>SOPs</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </li>

          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setMiddleNav(false);
                setWhichTabisActive("reportsAndDashboard");
              }}
            >
              <KanbanSquare size={18} color="white" />
              Reports & Dashboards
            </a>
          </li>

          {/* <li>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.71 11.29L16.71 6.29C16.6166 6.19732 16.5057 6.12399 16.3839 6.07423C16.2621 6.02447 16.1316 5.99924 16 6H5C4.20435 6 3.44129 6.31607 2.87868 6.87868C2.31607 7.44129 2 8.20435 2 9V15C2 15.7957 2.31607 16.5587 2.87868 17.1213C3.44129 17.6839 4.20435 18 5 18H16C16.1316 18.0008 16.2621 17.9755 16.3839 17.9258C16.5057 17.876 16.6166 17.8027 16.71 17.71L21.71 12.71C21.8037 12.617 21.8781 12.5064 21.9289 12.3846C21.9797 12.2627 22.0058 12.132 22.0058 12C22.0058 11.868 21.9797 11.7373 21.9289 11.6154C21.8781 11.4936 21.8037 11.383 21.71 11.29ZM15.59 16H5C4.73478 16 4.48043 15.8946 4.29289 15.7071C4.10536 15.5196 4 15.2652 4 15V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H15.59L19.59 12L15.59 16Z"
                  fill="white"
                />
              </svg>
              Samples
            </a>
          </li> */}

          {/* <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setMiddleNav(false);
                setWhichTabisActive("listProtocols");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 2H8C6.93913 2 5.92172 2.42143 5.17157 3.17157C4.42143 3.92172 4 4.93913 4 6V18C4 19.0609 4.42143 20.0783 5.17157 20.8284C5.92172 21.5786 6.93913 22 8 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V4C20 3.46957 19.7893 2.96086 19.4142 2.58579C19.0391 2.21071 18.5304 2 18 2ZM6 6C6 5.46957 6.21071 4.96086 6.58579 4.58579C6.96086 4.21071 7.46957 4 8 4H18V14H8C7.29504 14.003 6.60399 14.1964 6 14.56V6ZM8 20C7.46957 20 6.96086 19.7893 6.58579 19.4142C6.21071 19.0391 6 18.5304 6 18C6 17.4696 6.21071 16.9609 6.58579 16.5858C6.96086 16.2107 7.46957 16 8 16H18V20H8ZM10 8H14C14.2652 8 14.5196 7.89464 14.7071 7.70711C14.8946 7.51957 15 7.26522 15 7C15 6.73478 14.8946 6.48043 14.7071 6.29289C14.5196 6.10536 14.2652 6 14 6H10C9.73478 6 9.48043 6.10536 9.29289 6.29289C9.10536 6.48043 9 6.73478 9 7C9 7.26522 9.10536 7.51957 9.29289 7.70711C9.48043 7.89464 9.73478 8 10 8V8Z"
                  fill="white"
                />
              </svg>
              Protocols
            </a>
          </li> */}
        </ul>
      </div>

      <div className="bottom-navbar">
        <ul>
          {userInfo && userInfo.isAdmin && (
            <li>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setMiddleNav(false);
                  setWhichTabisActive("admin");
                }}
              >
                <Shield size={18} color="white" />
                Admin
              </a>
            </li>
          )}
          <li>
            <a
              href=""
              onClick={async (e) => {
                e.preventDefault();
                setMiddleNav(false);
                setWhichTabisActive("profile");
              }}
            >
              <User size={18} color="white" />
              Account
            </a>
          </li>
          <li>
            <a href="#">
              <Settings size={18} color="white" />
              Settings
            </a>
            <div className="drop-down-content">
              <div className="middle-navbar-container">
                <button
                  onClick={async () => {
                    await dispatch(addToState("archive"));
                    setWhichTabisActive("archive");
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <Recycle size={20} />
                      <p>Archive Settings</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={async () => {
                    await dispatch(addToState("orgList"));
                    setWhichTabisActive("orgList");
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_400_547)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.5 14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H4V13.25C4 12.8358 4.33579 12.5 4.75 12.5H7.25C7.66421 12.5 8 12.8358 8 13.25V14.5H10.25C10.3881 14.5 10.5 14.3881 10.5 14.25V1.75C10.5 1.61193 10.3881 1.5 10.25 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25ZM1.75 16C0.783502 16 0 15.2165 0 14.25V1.75C0 0.783501 0.783502 0 1.75 0H10.25C11.2165 0 12 0.783501 12 1.75V14.25C12 14.3349 11.994 14.4184 11.9823 14.5001H14.25C14.3881 14.5001 14.5 14.3882 14.5 14.2501V8.28526C14.5 8.20168 14.4582 8.12362 14.3887 8.07725L13.334 7.37412C12.9893 7.14435 12.8962 6.6787 13.126 6.33405C13.3557 5.98941 13.8214 5.89628 14.166 6.12604L15.2207 6.82918C15.7076 7.15374 16 7.70015 16 8.28526V14.2501C16 15.2166 15.2165 16.0001 14.25 16.0001H10.75C10.6818 16.0001 10.6157 15.991 10.5528 15.9739C10.4545 15.9911 10.3533 16 10.25 16H7.25C6.83579 16 6.5 15.6642 6.5 15.25V14H5.5V15.25C5.5 15.6642 5.16421 16 4.75 16H1.75ZM3 3.75C3 3.33579 3.33579 3 3.75 3H4.25C4.66421 3 5 3.33579 5 3.75C5 4.16421 4.66421 4.5 4.25 4.5H3.75C3.33579 4.5 3 4.16421 3 3.75ZM3.75 6C3.33579 6 3 6.33579 3 6.75C3 7.16421 3.33579 7.5 3.75 7.5H4.25C4.66421 7.5 5 7.16421 5 6.75C5 6.33579 4.66421 6 4.25 6H3.75ZM3 9.75C3 9.33579 3.33579 9 3.75 9H4.25C4.66421 9 5 9.33579 5 9.75C5 10.1642 4.66421 10.5 4.25 10.5H3.75C3.33579 10.5 3 10.1642 3 9.75ZM7.75 9C7.33579 9 7 9.33579 7 9.75C7 10.1642 7.33579 10.5 7.75 10.5H8.25C8.66421 10.5 9 10.1642 9 9.75C9 9.33579 8.66421 9 8.25 9H7.75ZM7 6.75C7 6.33579 7.33579 6 7.75 6H8.25C8.66421 6 9 6.33579 9 6.75C9 7.16421 8.66421 7.5 8.25 7.5H7.75C7.33579 7.5 7 7.16421 7 6.75ZM7.75 3C7.33579 3 7 3.33579 7 3.75C7 4.16421 7.33579 4.5 7.75 4.5H8.25C8.66421 4.5 9 4.16421 9 3.75C9 3.33579 8.66421 3 8.25 3H7.75Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_400_547">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p>Organization Settings</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setWhichTabisActive("templates");
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.2666 8.44C13.1598 8.31834 13.1008 8.16194 13.1008 8C13.1008 7.83806 13.1598 7.68166 13.2666 7.56L14.12 6.6C14.214 6.49511 14.2724 6.36314 14.2868 6.22301C14.3011 6.08287 14.2708 5.94179 14.2 5.82L12.8666 3.51333C12.7966 3.39168 12.6899 3.29525 12.5618 3.23779C12.4337 3.18033 12.2908 3.16477 12.1533 3.19333L10.9 3.44667C10.7405 3.47962 10.5745 3.45306 10.4332 3.372C10.292 3.29094 10.1853 3.16099 10.1333 3.00667L9.72664 1.78667C9.68191 1.65425 9.59671 1.53924 9.48306 1.4579C9.36941 1.37655 9.23307 1.33297 9.0933 1.33333H6.42664C6.28126 1.32575 6.13739 1.36595 6.01701 1.44781C5.89663 1.52967 5.80636 1.64868 5.75997 1.78667L5.38664 3.00667C5.33464 3.16099 5.22795 3.29094 5.08671 3.372C4.94547 3.45306 4.77945 3.47962 4.61997 3.44667L3.3333 3.19333C3.20301 3.17492 3.07017 3.19548 2.95154 3.25243C2.8329 3.30937 2.73377 3.40015 2.66664 3.51333L1.3333 5.82C1.26074 5.94043 1.22812 6.08072 1.24009 6.22082C1.25207 6.36091 1.30803 6.49363 1.39997 6.6L2.24664 7.56C2.35352 7.68166 2.41246 7.83806 2.41246 8C2.41246 8.16194 2.35352 8.31834 2.24664 8.44L1.39997 9.4C1.30803 9.50637 1.25207 9.63909 1.24009 9.77919C1.22812 9.91928 1.26074 10.0596 1.3333 10.18L2.66664 12.4867C2.7367 12.6083 2.84338 12.7047 2.97147 12.7622C3.09956 12.8197 3.24252 12.8352 3.37997 12.8067L4.6333 12.5533C4.79278 12.5204 4.95881 12.5469 5.10005 12.628C5.24129 12.7091 5.34797 12.839 5.39997 12.9933L5.80664 14.2133C5.85302 14.3513 5.9433 14.4703 6.06368 14.5522C6.18406 14.634 6.32793 14.6743 6.4733 14.6667H9.13997C9.27973 14.667 9.41607 14.6235 9.52972 14.5421C9.64337 14.4608 9.72858 14.3457 9.7733 14.2133L10.18 12.9933C10.232 12.839 10.3387 12.7091 10.4799 12.628C10.6211 12.5469 10.7872 12.5204 10.9466 12.5533L12.2 12.8067C12.3374 12.8352 12.4804 12.8197 12.6085 12.7622C12.7366 12.7047 12.8432 12.6083 12.9133 12.4867L14.2466 10.18C14.3174 10.0582 14.3478 9.91713 14.3334 9.777C14.3191 9.63687 14.2607 9.50489 14.1666 9.4L13.2666 8.44ZM12.2733 9.33333L12.8066 9.93333L11.9533 11.4133L11.1666 11.2533C10.6865 11.1552 10.187 11.2367 9.76303 11.4825C9.33905 11.7283 9.02007 12.1212 8.86664 12.5867L8.6133 13.3333H6.90664L6.66664 12.5733C6.51321 12.1079 6.19423 11.715 5.77024 11.4692C5.34626 11.2234 4.84679 11.1419 4.36664 11.24L3.57997 11.4L2.7133 9.92667L3.24664 9.32667C3.57461 8.95999 3.75593 8.48529 3.75593 7.99333C3.75593 7.50138 3.57461 7.02668 3.24664 6.66L2.7133 6.06L3.56664 4.59333L4.3533 4.75333C4.83345 4.85148 5.33292 4.76992 5.75691 4.52413C6.18089 4.27835 6.49987 3.88544 6.6533 3.42L6.90664 2.66667H8.6133L8.86664 3.42667C9.02007 3.89211 9.33905 4.28501 9.76303 4.5308C10.187 4.77659 10.6865 4.85815 11.1666 4.76L11.9533 4.6L12.8066 6.08L12.2733 6.68C11.949 7.04584 11.77 7.51779 11.77 8.00667C11.77 8.49555 11.949 8.96749 12.2733 9.33333V9.33333ZM7.75997 5.33333C7.23255 5.33333 6.71698 5.48973 6.27845 5.78275C5.83992 6.07577 5.49813 6.49224 5.29629 6.97951C5.09446 7.46678 5.04165 8.00296 5.14454 8.52024C5.24744 9.03752 5.50141 9.51268 5.87435 9.88562C6.24729 10.2586 6.72245 10.5125 7.23973 10.6154C7.75701 10.7183 8.29319 10.6655 8.78046 10.4637C9.26773 10.2618 9.68421 9.92005 9.97722 9.48152C10.2702 9.04299 10.4266 8.52742 10.4266 8C10.4266 7.29276 10.1457 6.61448 9.64559 6.11438C9.14549 5.61429 8.46722 5.33333 7.75997 5.33333V5.33333ZM7.75997 9.33333C7.49626 9.33333 7.23848 9.25514 7.01921 9.10863C6.79994 8.96212 6.62905 8.75388 6.52813 8.51025C6.42721 8.26661 6.40081 7.99852 6.45226 7.73988C6.5037 7.48124 6.63069 7.24366 6.81716 7.05719C7.00363 6.87072 7.24121 6.74373 7.49985 6.69229C7.75849 6.64084 8.02658 6.66724 8.27022 6.76816C8.51385 6.86908 8.72209 7.03998 8.8686 7.25924C9.01511 7.47851 9.0933 7.73629 9.0933 8C9.0933 8.35362 8.95283 8.69276 8.70278 8.94281C8.45273 9.19286 8.11359 9.33333 7.75997 9.33333Z"
                          fill="black"
                        />
                      </svg>
                      <p>Template Settings</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    setDataExport(true);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M5.80665 5.14L7.33331 3.60666V10C7.33331 10.1768 7.40355 10.3464 7.52857 10.4714C7.6536 10.5964 7.82317 10.6667 7.99998 10.6667C8.17679 10.6667 8.34636 10.5964 8.47138 10.4714C8.59641 10.3464 8.66665 10.1768 8.66665 10V3.60666L10.1933 5.14C10.2553 5.20248 10.329 5.25208 10.4103 5.28592C10.4915 5.31977 10.5786 5.3372 10.6666 5.3372C10.7547 5.3372 10.8418 5.31977 10.923 5.28592C11.0043 5.25208 11.078 5.20248 11.14 5.14C11.2025 5.07802 11.2521 5.00429 11.2859 4.92305C11.3198 4.84181 11.3372 4.75467 11.3372 4.66666C11.3372 4.57866 11.3198 4.49152 11.2859 4.41028C11.2521 4.32904 11.2025 4.25531 11.14 4.19333L8.47331 1.52666C8.40991 1.46597 8.33515 1.41839 8.25331 1.38666C8.09101 1.31998 7.90895 1.31998 7.74665 1.38666C7.66481 1.41839 7.59005 1.46597 7.52665 1.52666L4.85998 4.19333C4.79782 4.25549 4.74851 4.32928 4.71487 4.4105C4.68123 4.49171 4.66392 4.57876 4.66392 4.66666C4.66392 4.75457 4.68123 4.84162 4.71487 4.92283C4.74851 5.00404 4.79782 5.07784 4.85998 5.14C4.92214 5.20216 4.99593 5.25146 5.07715 5.2851C5.15836 5.31874 5.24541 5.33606 5.33331 5.33606C5.42122 5.33606 5.50826 5.31874 5.58948 5.2851C5.67069 5.25146 5.74449 5.20216 5.80665 5.14ZM14 9.33333C13.8232 9.33333 13.6536 9.40357 13.5286 9.52859C13.4035 9.65362 13.3333 9.82319 13.3333 10V12.6667C13.3333 12.8435 13.2631 13.013 13.1381 13.1381C13.013 13.2631 12.8435 13.3333 12.6666 13.3333H3.33331C3.1565 13.3333 2.98693 13.2631 2.86191 13.1381C2.73688 13.013 2.66665 12.8435 2.66665 12.6667V10C2.66665 9.82319 2.59641 9.65362 2.47138 9.52859C2.34636 9.40357 2.17679 9.33333 1.99998 9.33333C1.82317 9.33333 1.6536 9.40357 1.52858 9.52859C1.40355 9.65362 1.33331 9.82319 1.33331 10V12.6667C1.33331 13.1971 1.54403 13.7058 1.9191 14.0809C2.29417 14.456 2.80288 14.6667 3.33331 14.6667H12.6666C13.1971 14.6667 13.7058 14.456 14.0809 14.0809C14.4559 13.7058 14.6666 13.1971 14.6666 12.6667V10C14.6666 9.82319 14.5964 9.65362 14.4714 9.52859C14.3464 9.40357 14.1768 9.33333 14 9.33333Z"
                          fill="black"
                        />
                      </svg>
                      <p>Data Export</p>
                    </div>
                  </div>
                </button>
                <div className="mnc-element">
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M7.52665 10.1933C7.49798 10.225 7.47126 10.2584 7.44665 10.2933C7.42142 10.3305 7.40124 10.3709 7.38665 10.4133C7.36743 10.4511 7.35395 10.4916 7.34665 10.5333C7.34338 10.5777 7.34338 10.6223 7.34665 10.6667C7.3444 10.7541 7.36266 10.8409 7.39998 10.92C7.42992 11.0027 7.47769 11.0779 7.53991 11.1401C7.60212 11.2023 7.67725 11.2501 7.75998 11.28C7.83978 11.3153 7.92607 11.3335 8.01332 11.3335C8.10056 11.3335 8.18685 11.3153 8.26665 11.28C8.34938 11.2501 8.42451 11.2023 8.48673 11.1401C8.54894 11.0779 8.59671 11.0027 8.62665 10.92C8.65625 10.8389 8.66984 10.7529 8.66665 10.6667C8.66716 10.5789 8.65034 10.492 8.61716 10.4107C8.58399 10.3295 8.5351 10.2556 8.47332 10.1933C8.41134 10.1308 8.33761 10.0813 8.25637 10.0474C8.17513 10.0136 8.08799 9.99613 7.99998 9.99613C7.91198 9.99613 7.82484 10.0136 7.7436 10.0474C7.66236 10.0813 7.58862 10.1308 7.52665 10.1933ZM7.99998 1.33333C6.68144 1.33333 5.39251 1.72433 4.29618 2.45687C3.19985 3.18941 2.34537 4.2306 1.84079 5.44878C1.3362 6.66695 1.20418 8.0074 1.46141 9.3006C1.71865 10.5938 2.35359 11.7817 3.28594 12.714C4.21829 13.6464 5.40617 14.2813 6.69938 14.5386C7.99259 14.7958 9.33303 14.6638 10.5512 14.1592C11.7694 13.6546 12.8106 12.8001 13.5431 11.7038C14.2757 10.6075 14.6666 9.31854 14.6666 8C14.6666 7.12452 14.4942 6.25761 14.1592 5.44878C13.8241 4.63994 13.3331 3.90501 12.714 3.28596C12.095 2.6669 11.36 2.17584 10.5512 1.8408C9.74237 1.50577 8.87546 1.33333 7.99998 1.33333V1.33333ZM7.99998 13.3333C6.94515 13.3333 5.914 13.0205 5.03694 12.4345C4.15988 11.8485 3.47629 11.0155 3.07263 10.041C2.66896 9.06644 2.56334 7.99408 2.76913 6.95952C2.97492 5.92495 3.48287 4.97464 4.22875 4.22876C4.97463 3.48288 5.92494 2.97493 6.9595 2.76915C7.99407 2.56336 9.06642 2.66898 10.041 3.07264C11.0155 3.47631 11.8485 4.1599 12.4345 5.03696C13.0205 5.91402 13.3333 6.94517 13.3333 8C13.3333 9.41449 12.7714 10.771 11.7712 11.7712C10.771 12.7714 9.41447 13.3333 7.99998 13.3333V13.3333ZM7.99998 4.66667C7.64869 4.66644 7.30354 4.75875 6.99926 4.9343C6.69497 5.10984 6.44229 5.36244 6.26665 5.66667C6.21841 5.74255 6.18603 5.8274 6.17143 5.91612C6.15684 6.00484 6.16034 6.09559 6.18174 6.18292C6.20313 6.27026 6.24196 6.35236 6.29591 6.42429C6.34985 6.49622 6.41779 6.5565 6.49563 6.6015C6.57347 6.64649 6.65962 6.67528 6.74887 6.68612C6.83813 6.69696 6.92866 6.68964 7.01501 6.66458C7.10136 6.63953 7.18175 6.59727 7.25135 6.54035C7.32094 6.48342 7.37831 6.413 7.41998 6.33333C7.47872 6.2316 7.5633 6.14719 7.66515 6.08865C7.767 6.03012 7.88251 5.99953 7.99998 6C8.17679 6 8.34636 6.07024 8.47139 6.19526C8.59641 6.32029 8.66665 6.48986 8.66665 6.66667C8.66665 6.84348 8.59641 7.01305 8.47139 7.13807C8.34636 7.2631 8.17679 7.33333 7.99998 7.33333C7.82317 7.33333 7.6536 7.40357 7.52858 7.5286C7.40355 7.65362 7.33332 7.82319 7.33332 8V8.66667C7.33332 8.84348 7.40355 9.01305 7.52858 9.13807C7.6536 9.2631 7.82317 9.33333 7.99998 9.33333C8.17679 9.33333 8.34636 9.2631 8.47139 9.13807C8.59641 9.01305 8.66665 8.84348 8.66665 8.66667V8.54667C9.10756 8.38668 9.47822 8.07682 9.71383 7.67125C9.94944 7.26567 10.035 6.79019 9.95558 6.32793C9.87615 5.86566 9.63678 5.44601 9.27931 5.14234C8.92184 4.83868 8.46901 4.67031 7.99998 4.66667V4.66667Z"
                          fill="black"
                        />
                      </svg>
                      <p>Help</p>
                    </div>
                  </div>
                </div>
                {/* <div
                  onClick={() => {
                    setCreateOrg(true);
                  }}
                  className="mnc-element"
                >
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12.6667 7.33333H8.66669V3.33333C8.66669 3.15652 8.59645 2.98695 8.47142 2.86193C8.3464 2.73691 8.17683 2.66667 8.00002 2.66667C7.82321 2.66667 7.65364 2.73691 7.52862 2.86193C7.40359 2.98695 7.33335 3.15652 7.33335 3.33333V7.33333H3.33335C3.15654 7.33333 2.98697 7.40357 2.86195 7.5286C2.73693 7.65362 2.66669 7.82319 2.66669 8C2.66669 8.17681 2.73693 8.34638 2.86195 8.4714C2.98697 8.59643 3.15654 8.66667 3.33335 8.66667H7.33335V12.6667C7.33335 12.8435 7.40359 13.013 7.52862 13.1381C7.65364 13.2631 7.82321 13.3333 8.00002 13.3333C8.17683 13.3333 8.3464 13.2631 8.47142 13.1381C8.59645 13.013 8.66669 12.8435 8.66669 12.6667V8.66667H12.6667C12.8435 8.66667 13.0131 8.59643 13.1381 8.4714C13.2631 8.34638 13.3334 8.17681 13.3334 8C13.3334 7.82319 13.2631 7.65362 13.1381 7.5286C13.0131 7.40357 12.8435 7.33333 12.6667 7.33333Z"
                          fill="black"
                        />
                      </svg>
                      <p>Create or Join an Organization</p>
                    </div>
                  </div>
                </div> */}
                <button onClick={logoutHandler} className="mnc-element">
                  <div className="mnc-element-inside">
                    <div className="mnc-element-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.33334 4C3.51015 4 3.67972 4.07024 3.80475 4.19526C3.92977 4.32029 4.00001 4.48986 4.00001 4.66667V7.33333C4.00001 7.51014 4.07025 7.67971 4.19527 7.80474C4.32029 7.92976 4.48986 8 4.66667 8H11.06L10.1933 7.14C10.0678 7.01446 9.99728 6.8442 9.99728 6.66667C9.99728 6.48913 10.0678 6.31887 10.1933 6.19333C10.3189 6.0678 10.4891 5.99727 10.6667 5.99727C10.8442 5.99727 11.0145 6.0678 11.14 6.19333L13.14 8.19333C13.2007 8.25674 13.2483 8.3315 13.28 8.41333C13.3467 8.57564 13.3467 8.75769 13.28 8.92C13.2483 9.00183 13.2007 9.0766 13.14 9.14L11.14 11.14C11.078 11.2025 11.0043 11.2521 10.9231 11.2859C10.8418 11.3198 10.7547 11.3372 10.6667 11.3372C10.5787 11.3372 10.4915 11.3198 10.4103 11.2859C10.3291 11.2521 10.2553 11.2025 10.1933 11.14C10.1309 11.078 10.0813 11.0043 10.0474 10.9231C10.0136 10.8418 9.99614 10.7547 9.99614 10.6667C9.99614 10.5787 10.0136 10.4915 10.0474 10.4103C10.0813 10.329 10.1309 10.2553 10.1933 10.1933L11.06 9.33333H4.66667C4.13624 9.33333 3.62753 9.12262 3.25246 8.74755C2.87739 8.37247 2.66667 7.86377 2.66667 7.33333V4.66667C2.66667 4.48986 2.73691 4.32029 2.86194 4.19526C2.98696 4.07024 3.15653 4 3.33334 4Z"
                          fill="black"
                        />
                      </svg>
                      <p>Logout</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
