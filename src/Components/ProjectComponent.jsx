import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getProjectDetails } from "../redux/actions/projectActions";
import { listMyTasks } from "../redux/actions/taskActions";
import { listMySamples } from "../redux/actions/sampleActions";
import TaskEntries from "./Entries/TaskEntries";
import Entries from "./Entries/Entries";
import SampleEntries from "./Entries/SampleEntries";
import { listMyEntries } from "../redux/actions/entryActions";
import { Tooltip } from "@mui/material";
import ProjectSettings from "./ProjectSettings/ProjectSettings";
import CompleteLoader from "./Loaders/CompleteLoader";
import { Folders } from "lucide-react";
import NewSpreadSheet from "./Modals/NewSpreadSheet";

function ProjectComponent({
  id,
  setProjectInsideActive,
  setTaskContent,
  setTaskModal,
  setSampleModal,
  setSampleContent,
  setHomeActive,
  setProfileActive,
  setTabId,
  setProjectListActive,
  setCalendarActive,
  setSampleListActive,
  setProjectSettings,
  setWhichTabisActive,
  setEntryModal,
  projectSettings,
  setNewCollab,
  setProjectUpdatedProfilers,
  newEntry,
  newTask,
  newCollab,
  setCreateNewTaskModal,
  projectUpdatedProfilers,
  setUpdatedUserCollabRole,
  updateUserCollabRole,
  setSelectedProjectNow,
  setCreateNewSampleModal,
  taskUpdateController,
  setTaskUpdateController,
  setEntryUpdate,
  orgs,
  orgsCollab,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [userType, setUserType] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;
  const taskListMy = useSelector((state) => state.taskListMy);
  const { tasks, loading: loadingTasks, error: errorTasks } = taskListMy;
  const sampleListMy = useSelector((state) => state.sampleListMy);
  const [isSpreadSheetOpen, setIsSpreadSheetOpen] = useState(false);
  const [spreadsheetData, setSpreadsheetData] = useState({});

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
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!project) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
      // fetchFirestoreData();
    } else {
      if (project._id != id) {
        console.log("id mismatch:");
        dispatch(getProjectDetails(id));
        dispatch(listMyTasks(id));
        dispatch(listMySamples(id));
        dispatch(listMyEntries(id));

        // fetchFirestoreData();
      }
    }
  }, [dispatch, project, id]);

  const reloadClick = () => {
    dispatch(getProjectDetails(id));
    dispatch(listMyTasks(id));
    dispatch(listMySamples(id));
    dispatch(listMyEntries(id));
    // fetchFirestoreData();
  };
  useEffect(() => {
    if (newEntry) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
    }
  }, [newEntry]);
  //newTask
  useEffect(() => {
    if (newTask) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
    }
  }, [newTask]);

  //newCollab
  useEffect(() => {
    if (newCollab) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
      setNewCollab(false);
    }
  }, [newCollab]);

  //projectUpdatedProfilers

  useEffect(() => {
    if (projectUpdatedProfilers) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
    }
  }, [projectUpdatedProfilers]);

  //updateUserCollabRole

  useEffect(() => {
    if (updateUserCollabRole) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
    }
  }, [updateUserCollabRole]);

  //taskUpdateController
  useEffect(() => {
    if (taskUpdateController) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
      setTaskUpdateController(false);
    }
  }, [taskUpdateController]);

  //setEntryUpdate

  useEffect(() => {
    if (setEntryUpdate) {
      dispatch(getProjectDetails(id));
      dispatch(listMyTasks(id));
      dispatch(listMySamples(id));
      dispatch(listMyEntries(id));
      setTaskUpdateController(false);
    }
  }, [setEntryUpdate]);

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
    <>
      {project && (
        <div className="project-component-inside">
          {projectSettings && (
            <ProjectSettings
              setProjectSettings={setProjectSettings}
              project={project}
              setNewCollab={setNewCollab}
              setProjectUpdatedProfilers={setProjectUpdatedProfilers}
              setUpdatedUserCollabRole={setUpdatedUserCollabRole}
              userType={
                findOwner
                  ? findOwner
                  : find
                  ? find.userType
                  : findOrg
                  ? findOrg.userType
                  : "no role found"
              }
            />
          )}
          {isSpreadSheetOpen && (
            <NewSpreadSheet
              spreadsheetData={spreadsheetData}
              setIsSpreadSheetOpen={setIsSpreadSheetOpen}
            />
          )}
          <div className="project-c-header">
            <div className="project-c-header-left">
              <button
                className="p-c-h-l-t"
                onClick={() => {
                  setProjectInsideActive(false);
                }}
              >
                <div className="p-c-h-t-l-inside">
                  {" "}
                  <h1> {project.name}</h1>
                  <p>app.getstellr.io/projects/{project._id}</p>
                </div>{" "}
              </button>
              <div className="project-c-header-right">
                <button className="setting-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5V1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15V15ZM12 8.25H9.75V6C9.75 5.80109 9.67099 5.61032 9.53033 5.46967C9.38968 5.32902 9.19892 5.25 9 5.25C8.80109 5.25 8.61033 5.32902 8.46967 5.46967C8.32902 5.61032 8.25 5.80109 8.25 6V8.25H6C5.80109 8.25 5.61033 8.32902 5.46967 8.46967C5.32902 8.61032 5.25 8.80109 5.25 9C5.25 9.19891 5.32902 9.38968 5.46967 9.53033C5.61033 9.67098 5.80109 9.75 6 9.75H8.25V12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61033 12.671 8.80109 12.75 9 12.75C9.19892 12.75 9.38968 12.671 9.53033 12.5303C9.67099 12.3897 9.75 12.1989 9.75 12V9.75H12C12.1989 9.75 12.3897 9.67098 12.5303 9.53033C12.671 9.38968 12.75 9.19891 12.75 9C12.75 8.80109 12.671 8.61032 12.5303 8.46967C12.3897 8.32902 12.1989 8.25 12 8.25Z"
                      fill="white"
                    />
                  </svg>
                  Add
                  <div className="drop-down-content">
                    <div className="middle-navbar-container">
                      <button
                        onClick={async () => {
                          console.log(project._id);
                          await setSelectedProjectNow(project);
                          setEntryModal(true);
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
                        onClick={async () => {
                          await setSelectedProjectNow(project);
                          setCreateNewTaskModal(true);
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
                          setCreateNewSampleModal(true);
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
                    </div>
                  </div>
                </button>

                <button
                  className="setting-btn"
                  onClick={() => {
                    // setUserType(find ? find.userType : "owner");
                    setProjectSettings(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_326_343)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.35825 1.7153C8.56981 1.69691 8.78413 1.6875 9.00085 1.6875C9.21757 1.6875 9.4319 1.69691 9.64345 1.7153C9.68338 1.71876 9.76509 1.75668 9.7973 1.8798L10.1225 3.12325C10.2874 3.75386 10.7403 4.21062 11.2444 4.46032C11.4396 4.557 11.6278 4.66597 11.808 4.78623C12.2766 5.09919 12.8992 5.26316 13.5282 5.09059L14.769 4.75014C14.8915 4.71652 14.9653 4.7681 14.9884 4.80103C15.2343 5.15079 15.45 5.52289 15.6323 5.91361C15.6489 5.94945 15.6571 6.03891 15.5666 6.12839L14.6499 7.03415C14.187 7.49161 14.0173 8.11134 14.053 8.67283C14.0599 8.78089 14.0634 8.88997 14.0634 9C14.0634 9.11003 14.0599 9.21911 14.053 9.32717C14.0173 9.88866 14.187 10.5084 14.6499 10.9658L15.5666 11.8716C15.6571 11.9611 15.6489 12.0505 15.6323 12.0864C15.45 12.4771 15.2343 12.8492 14.9884 13.1989C14.9653 13.2319 14.8915 13.2834 14.769 13.2499L13.5282 12.9094C12.8992 12.7368 12.2766 12.9008 11.808 13.2138C11.6278 13.3341 11.4396 13.443 11.2444 13.5397C10.7403 13.7894 10.2874 14.2461 10.1225 14.8768L9.7973 16.1202C9.76509 16.2433 9.68338 16.2812 9.64345 16.2847C9.4319 16.303 9.21757 16.3125 9.00085 16.3125C8.78413 16.3125 8.56981 16.303 8.35825 16.2847C8.31832 16.2812 8.23661 16.2433 8.20441 16.1202L7.87918 14.8767C7.71426 14.2461 7.26141 13.7894 6.75729 13.5397C6.56209 13.443 6.37393 13.3341 6.19383 13.2138C5.72514 12.9008 5.10252 12.7368 4.4736 12.9094L3.23273 13.2499C3.11021 13.2834 3.0364 13.2319 3.01324 13.1989C2.76747 12.8492 2.55166 12.4771 2.36946 12.0864C2.35275 12.0505 2.34454 11.9611 2.4351 11.8716L3.35184 10.9658C3.8148 10.5083 3.98448 9.8886 3.94875 9.32713C3.94189 9.21908 3.93839 9.11 3.93839 9C3.93839 8.89 3.94189 8.78092 3.94875 8.67287C3.98448 8.1114 3.8148 7.49167 3.35184 7.03422L2.4351 6.12839C2.34454 6.03892 2.35275 5.94946 2.36946 5.91362C2.55166 5.52289 2.76747 5.15079 3.01326 4.80103C3.0364 4.7681 3.11021 4.71653 3.23273 4.75014L4.4736 5.0906C5.10252 5.26317 5.72514 5.0992 6.19383 4.78624C6.37393 4.66599 6.56209 4.55703 6.75729 4.46034C7.2614 4.21064 7.71426 3.75388 7.87918 3.12328L8.20441 1.8798C8.23661 1.75668 8.31832 1.71876 8.35825 1.7153ZM9.00085 0C8.73529 0 8.47221 0.0115256 8.21211 0.0341364C7.37648 0.106779 6.762 0.725672 6.57182 1.4528L6.2466 2.6963C6.22695 2.77143 6.15783 2.87411 6.00828 2.94819C5.74771 3.07725 5.49677 3.22258 5.25676 3.38284C5.11841 3.47521 4.9951 3.48383 4.92011 3.46326L3.67924 3.12279C2.9556 2.92424 2.11391 3.14583 1.63257 3.83079C1.33024 4.26102 1.06454 4.71907 0.840067 5.20045C0.485728 5.96034 0.71503 6.80113 1.24902 7.32877L2.16576 8.23458C2.22104 8.28921 2.2752 8.40012 2.26466 8.56574C2.25552 8.70942 2.25089 8.85423 2.25089 9C2.25089 9.14577 2.25552 9.29058 2.26466 9.43426C2.2752 9.59988 2.22104 9.71079 2.16576 9.76542L1.24902 10.6712C0.715029 11.1989 0.485728 12.0396 0.840067 12.7996C1.06454 13.281 1.33024 13.7389 1.63257 14.1691C2.11391 14.8542 2.9556 15.0758 3.67924 14.8772L4.92011 14.5368C4.9951 14.5162 5.11842 14.5248 5.25676 14.6171C5.49677 14.7774 5.74771 14.9228 6.00828 15.0518C6.15783 15.1259 6.22695 15.2286 6.2466 15.3037L6.57182 16.5472C6.762 17.2744 7.37648 17.8932 8.21211 17.9659C8.47221 17.9885 8.73529 18 9.00085 18C9.26642 18 9.5295 17.9885 9.78959 17.9659C10.6252 17.8932 11.2397 17.2744 11.4298 16.5472L11.7551 15.3037C11.7748 15.2286 11.8438 15.126 11.9935 15.0518C12.254 14.9228 12.505 14.7774 12.745 14.6171C12.8833 14.5248 13.0066 14.5162 13.0817 14.5368L14.3224 14.8772C15.0462 15.0758 15.8878 14.8542 16.3692 14.1693C16.6714 13.739 16.9372 13.281 17.1616 12.7996C17.516 12.0396 17.2867 11.1989 16.7527 10.6712L15.836 9.76547C15.7807 9.71085 15.7266 9.59994 15.7371 9.43432C15.7462 9.29061 15.7509 9.14579 15.7509 9C15.7509 8.85421 15.7462 8.70939 15.7371 8.56568C15.7266 8.40006 15.7807 8.28915 15.836 8.23453L16.7527 7.32876C17.2867 6.80112 17.516 5.96033 17.1616 5.20044C16.9372 4.71906 16.6714 4.261 16.3692 3.83079C15.8878 3.14581 15.0462 2.92424 14.3224 3.12279L13.0817 3.46323C13.0066 3.48381 12.8833 3.4752 12.745 3.38283C12.505 3.22256 12.254 3.07721 11.9935 2.94814C11.8438 2.87407 11.7748 2.77139 11.7551 2.69625L11.4298 1.4528C11.2397 0.72567 10.6252 0.106777 9.78959 0.0341354C9.5295 0.0115253 9.26642 0 9.00085 0ZM10.6884 9C10.6884 9.93198 9.93284 10.6875 9.00085 10.6875C8.06887 10.6875 7.31335 9.93198 7.31335 9C7.31335 8.06802 8.06887 7.3125 9.00085 7.3125C9.93284 7.3125 10.6884 8.06802 10.6884 9ZM12.3759 9C12.3759 10.864 10.8648 12.375 9.00085 12.375C7.1369 12.375 5.62585 10.864 5.62585 9C5.62585 7.13604 7.1369 5.625 9.00085 5.625C10.8648 5.625 12.3759 7.13604 12.3759 9Z"
                        fill="#FFFFFF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_326_343">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder={`Search ${project.name}`}
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </div>
          {loadingEntries ? (
            <div className="project-c-bottom">
              <CompleteLoader text="Loading your data" />
            </div>
          ) : (
            <div className="project-c-bottom">
              <button
                className="sl-element"
                onClick={async (e) => {
                  e.preventDefault();
                }}
              >
                <div className="mnc-element-inside">
                  <div className="mnc-element-left">
                    <h3>Name of the Entity</h3>
                  </div>
                  <span> ID</span>
                  <span>Updated Date </span>
                  <span>Created/Due Date</span>
                </div>
              </button>
              {entries &&
                entries
                  .filter((entry) =>
                    entry.name.toLowerCase().includes(inputSearch.toLowerCase())
                  )
                  .map((doc, index) => (
                    <Entries
                      doc={doc}
                      projectId={id}
                      setHomeActive={setHomeActive}
                      setProfileActive={setProfileActive}
                      setTabId={setTabId}
                      project={project}
                      setProjectListActive={setProjectListActive}
                      setCalendarActive={setCalendarActive}
                      setSampleListActive={setSampleListActive}
                      setWhichTabisActive={setWhichTabisActive}
                      orgs={orgs}
                      orgsCollab={orgsCollab}
                      index={index}
                      setSpreadsheetData={setSpreadsheetData}
                      setIsSpreadSheetOpen={setIsSpreadSheetOpen}
                    />
                  ))}

              {tasks &&
                tasks
                  .filter((entry) =>
                    entry.subject
                      .toLowerCase()
                      .includes(inputSearch.toLowerCase())
                  )
                  .map((doc, index) => (
                    <TaskEntries
                      doc={doc}
                      setTaskModal={setTaskModal}
                      setTaskContent={setTaskContent}
                      index={index}
                    />
                  ))}
              {entries && entries.length === 0 && tasks && tasks.length === 0 && (
                <div className="middlenav-empty py-10">
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
                    Nothing here yet. if you think this is a mistake click
                    refresh.
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
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProjectComponent;
