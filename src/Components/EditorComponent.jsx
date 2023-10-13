import React, { useEffect, useRef, useState } from "react";
import MiddleNav from "./MiddleNav";
import SideNav from "./SideNav";
import Loader from "../css/utils/Loader";
import { useNavigate, useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import CustomEditor from "./Editor/Editor";
import TabsHeader from "./Main/TabsHeader";
import CreateNewPost from "./Editor/NewEditor";
import CalendarTemp from "./Calendar";
import ProfilePage from "../Pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import TaskModal from "./Entries/TaskModal/TaskModal";
import FirstTime from "./Modals/FirstTime";
import SampleModal from "./Entries/SampleModal/SampleModal";
import { getUserDetails, logout } from "../redux/actions/userActions";
import ProjectComponent from "./ProjectComponent";
import ListProjects from "./ListProjects";
import UndisclosedEditor from "./Editor/UndisclosedEditor";
import SpreadSheet from "./Modals/SpreadSheet";
import someFunction from "../Data/someFunction";
import ViewOnlyEditor from "./Editor/ViewOnlyEditor";
import TextEditor from "./Editor/QuillEditor";
import Home from "./Home";
import ListSamples from "./ListSamples";
import TextEditorRead from "./Editor/QuillEditorRead";
import ListOrganizations from "./ListOrganizations";
import CreateOrg from "./Modals/CreateOrg";
import ListProtocols from "./ListProtocols";
import ProtocolModal from "./Entries/ProtocolModal/ProtocolModal";
import SearchPage from "./SearchPage";
import AdminPannel from "./AdminPannel";
import ListSops from "./ListSops";
import SopModal from "./Entries/SopModal/SopModal";
import { Toaster } from "react-hot-toast";
import TemplateSettings from "./TemplateSettings";
import TextEditorTwo from "./Editor/QuillEditorTwo";
import Footer from "../Pages/Footer";
import Banner from "./Banner";
import ListSamplesNew from "./ListSamplesNew";
import ListProtocolsNew from "./ListProtocolsNew";
import ListSamplesAll from "./ListSamplesAll";
import ReportsAndDashboard from "./ReportsAndDashboard/ReportsAndDashboard";
import ListProtocolsAll from "./ListProtocolsAll";
import BannerOrg from "./BannerOrg";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../redux/actions/organizationActions";
import ListSopsAll from "./ListSopsAll";
import MenuIcon from "@mui/icons-material/Menu";
import { addToState } from "../redux/actions/stateActions";
import TextEditorTwoRead from "./Editor/QuillEditorTwoRead";
import MainToast from "./Toast/MainToast";
function EditorComponent() {
  const mainDiv = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [middleNav, setMiddleNav] = useState(false);
  const [id, setId] = useState();
  const [tabID, setTabId] = useState();
  const [tabsPannel, setTabsPannel] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [activeProject, setActiveProject] = useState();
  const [homeActive, setHomeActive] = useState(false);
  const [calendarActive, setCalendarActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [newCollab, setNewCollab] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [newSample, setNewSample] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [sampleModal, setSampleModal] = useState(false);
  const [sampleContent, setSampleContent] = useState();
  const [activeProjectId, setActiveProjectId] = useState();
  const [projectActive, setProjectActive] = useState(false);
  const [projectListActive, setProjectListActive] = useState(false);
  const [projectInsideActive, setProjectInsideActive] = useState(false);
  const [projectInsideActiveId, setProjectInsideActiveId] = useState();
  const [sampleListActive, setSampleListActive] = useState(false);
  const [projectUpdatedProfilers, setProjectUpdatedProfilers] = useState(false);
  const [taskUpdateController, setTaskUpdateController] = useState(false);
  const [whichTabisActive, setWhichTabisActive] = useState("home");
  const [projectSettings, setProjectSettings] = useState(false);
  const [entryModal, setEntryModal] = useState(false);
  const [createNewTaskModal, setCreateNewTaskModal] = useState(false);
  const [createNewSampleModal, setCreateNewSampleModal] = useState(false);
  const [createOrg, setCreateOrg] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { tabDetails } = cart;
  const [taskContent, setTaskContent] = useState();
  const [newEntry, setNewEntry] = useState(false);
  const [updateUserCollabRole, setUpdatedUserCollabRole] = useState(false);
  const mobileRef = useRef();
  //Protocol
  const [createNewProtocol, setCreateNewProtocol] = useState(false);
  const [newProtocol, setNewProtocol] = useState(false);
  const [protocolModal, setProtocolModal] = useState(false);
  const [protocolContent, setProtocolContent] = useState();

  //SOP
  const [createNewSop, setCreateNewSop] = useState(false);
  const [newSop, setNewSop] = useState(false);
  const [sopModal, setSopModal] = useState(false);
  const [sopContent, setSopContent] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const [selectedProjectNow, setSelectedProjectNow] = useState();
  const [UpdatedUserCollabRoleOrg, setUpdatedUserCollabRoleOrg] = useState(
    false
  );
  const [sampleUpdate, setSampleUpdate] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(false);
  const [entryUpdate, setEntryUpdate] = useState(false);
  const [userRole, setUserRole] = useState();
  const {
    loading: loadingUserDetails,
    error: errorLoadingDetails,
    sucess: sucessLoadingDetails,
    user,
  } = userDetails;
  const [newOrg, setNewOrg] = useState(false);
  const [userInfoName, setUserInfoName] = useState(
    user && user.name ? true : false
  );
  console.log(tabDetails);

  //Banner

  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (middleNav) {
      mainDiv.current.style.width = "80%";
    } else {
      mainDiv.current.style.width = "100%";
    }
  }, [middleNav]);

  useEffect(() => {
    console.log(id);
  }, [id]);
  const removeTab = (id) => {
    const index = tabsPannel.findIndex((obj) => obj.id == id);
    tabsPannel.splice(index, 1);

    if (tabsPannel.length > 0) {
      setTabId(tabsPannel[0].id);
    }
  };
  const [todaysDate, setTodaysDate] = useState();
  useEffect(() => {
    if (localStorage.getItem("showBanner")) {
      setShowBanner(false);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  //State

  const state = useSelector((state) => state.state);
  const { stateDetails } = state;

  console.log(stateDetails);

  const addTab = (id, name, block, projectId, data) => {
    if (tabsPannel.some((el) => el.id == id)) {
      setTabId(id);
    } else {
      if (tabsPannel.length > 3) {
        console.log("Worked");
        tabsPannel.pop();
        tabsPannel.push({
          id,
          name,
          block,
          projectId,
          data,
        });
        setTabId(id);
      } else {
        tabsPannel.push({
          id,
          name,
          block,
          projectId,
          data,
        });
        setTabId(id);
      }
    }
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (stateDetails) {
      if (stateDetails.split("#")[0] === "projectList") {
        const stateArray = stateDetails.split("#");

        setWhichTabisActive(stateArray[0]);
        if (stateArray[1] != null) {
          setProjectInsideActiveId(stateArray[1]);
          setProjectInsideActive(true);
        }
      } else if (stateDetails.split("#")[0] == "tabs") {
        const stateArray = stateDetails.split("#");

        if (stateArray[1] != null) {
          setTabId(stateArray[1]);
          setWhichTabisActive("tabs");
        }
      } else {
        setWhichTabisActive(stateDetails);
      }
    }
  }, []);

  //Org

  const [showBannerOrg, setShowBannerOrg] = useState(false);
  const orgListMy = useSelector((state) => state.orgListMy);
  const { sucess: sucess, orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;

  const [mobileNavActive, setMobileNavActive] = useState(false);

  useEffect(() => {
    dispatch(listMyOrgs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listMyCollabOrgs());
  }, [dispatch]);

  useEffect(() => {
    if (sucess && sucessCollab) {
      console.log(orgs);
      if (orgs.length === 0 && orgsCollab.length === 0) {
        setShowBannerOrg(true);
      }
    }
  }, [dispatch, sucess, sucessCollab]);

  const getTodaysDate = () => {
    var date_not_formatted = new Date(Date.now());

    var formatted_string = date_not_formatted.getFullYear() + "-";

    if (date_not_formatted.getMonth() < 9) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getMonth() + 1;
    formatted_string += "-";

    if (date_not_formatted.getDate() < 10) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getDate();
    setTodaysDate(formatted_string);
  };

  useEffect(() => {
    if (!todaysDate) {
      getTodaysDate();
    }
  }, [todaysDate]);

  return (
    <div className="main-container">
      <MainToast />
      <Toaster position="top-center" reverseOrder={true} />
      {taskModal && (
        <TaskModal
          setTaskModal={setTaskModal}
          doc={taskContent}
          setTaskUpdateController={setTaskUpdateController}
          setTaskUpdate={setTaskUpdate}
        />
      )}
      {sampleModal && (
        <SampleModal
          setSampleModal={setSampleModal}
          doc={sampleContent}
          setWhichTabisActive={setWhichTabisActive}
          setSampleUpdate={setSampleUpdate}
        />
      )}
      {protocolModal && (
        <ProtocolModal
          setProtocolModal={setProtocolModal}
          doc={protocolContent}
          setWhichTabisActive={setWhichTabisActive}
          setNewProtocol={setNewProtocol}
        />
      )}
      {sopModal && (
        <SopModal
          setSopModal={setSopModal}
          doc={sopContent}
          setWhichTabisActive={setWhichTabisActive}
        />
      )}
      {createOrg && (
        <CreateOrg
          setCreateOrg={setCreateOrg}
          setNewOrg={setNewOrg}
          setWhichTabisActive={setWhichTabisActive}
          setUpdatedUserCollabRoleOrg={setUpdatedUserCollabRoleOrg}
          setShowBannerOrg={setShowBannerOrg}
        />
      )}
      <SideNav
        modal={modal}
        setModal={setModal}
        setMiddleNav={setMiddleNav}
        setId={setId}
        addTab={addTab}
        setActiveTab={setActiveTab}
        setHomeActive={setHomeActive}
        setProfileActive={setProfileActive}
        newCollab={newCollab}
        setNewTask={setNewTask}
        setNewSample={setNewSample}
        setActiveProject={setProjectActive}
        setActiveProjectId={setActiveProjectId}
        setProjectListActive={setProjectListActive}
        setProjectInsideActive={setProjectInsideActive}
        setProjectInsideActiveId={setProjectInsideActiveId}
        setCalendarActive={setCalendarActive}
        setSampleListActive={setSampleListActive}
        setWhichTabisActive={setWhichTabisActive}
        entryModal={entryModal}
        setEntryModal={setEntryModal}
        setTabId={setTabId}
        setNewEntry={setNewEntry}
        setTaskModal={setCreateNewTaskModal}
        taskModal={createNewTaskModal}
        selectedProjectNow={selectedProjectNow}
        setSampleModal={setCreateNewSampleModal}
        sampleModal={createNewSampleModal}
        setCreateOrg={setCreateOrg}
        setCreateNewProtocol={setCreateNewProtocol}
        createNewProtocol={createNewProtocol}
        setNewProtocol={setNewProtocol}
        setCreateNewSop={setCreateNewSop}
        createNewSop={createNewSop}
        setNewSop={setNewSop}
      />
      <div className="main-content">
        {showBanner && <Banner setShowBanner={setShowBanner} />}
        {showBannerOrg && (
          <BannerOrg
            setCreateOrg={setCreateOrg}
            setWhichTabisActive={setWhichTabisActive}
            setNewOrg={setNewOrg}
            setUpdatedUserCollabRoleOrg={setUpdatedUserCollabRoleOrg}
          />
        )}
        <div className="mobile-nav-shower-icon">
          <MenuIcon
            sx={{ color: "white", fontSize: "3rem" }}
            onClick={(e) => {
              e.preventDefault();
              setMobileNavActive(true);
            }}
          />
        </div>
        <div
          className="mobile-navbar"
          ref={mobileRef}
          style={{ right: mobileNavActive ? `0` : `-2000px` }}
        >
          <div className="mobile-navbar-inside">
            <div className="top-cross-mobile-navbar">
              <svg
                onClick={(e) => {
                  e.preventDefault();
                  setMobileNavActive(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="main-navbar-mobile-tablet">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20.0001 8.00001L14.0001 2.74001C13.4501 2.24805 12.738 1.97607 12.0001 1.97607C11.2622 1.97607 10.5501 2.24805 10.0001 2.74001L4.00009 8.00001C3.68246 8.28408 3.42899 8.63256 3.25657 9.02225C3.08414 9.41194 2.99671 9.83389 3.00009 10.26V19C3.00009 19.7957 3.31617 20.5587 3.87877 21.1213C4.44138 21.6839 5.20445 22 6.00009 22H18.0001C18.7957 22 19.5588 21.6839 20.1214 21.1213C20.684 20.5587 21.0001 19.7957 21.0001 19V10.25C21.0021 9.82557 20.9139 9.40555 20.7416 9.01769C20.5692 8.62983 20.3165 8.28296 20.0001 8.00001ZM14.0001 20H10.0001V15C10.0001 14.7348 10.1055 14.4804 10.293 14.2929C10.4805 14.1054 10.7349 14 11.0001 14H13.0001C13.2653 14 13.5197 14.1054 13.7072 14.2929C13.8947 14.4804 14.0001 14.7348 14.0001 15V20ZM19.0001 19C19.0001 19.2652 18.8947 19.5196 18.7072 19.7071C18.5197 19.8946 18.2653 20 18.0001 20H16.0001V15C16.0001 14.2044 15.684 13.4413 15.1214 12.8787C14.5588 12.3161 13.7957 12 13.0001 12H11.0001C10.2044 12 9.44138 12.3161 8.87877 12.8787C8.31616 13.4413 8.00009 14.2044 8.00009 15V20H6.00009C5.73488 20 5.48052 19.8946 5.29299 19.7071C5.10545 19.5196 5.00009 19.2652 5.00009 19V10.25C5.00027 10.108 5.03069 9.9677 5.08931 9.83839C5.14794 9.70907 5.23343 9.59372 5.3401 9.50001L11.3401 4.25001C11.5226 4.08969 11.7572 4.00127 12.0001 4.00127C12.243 4.00127 12.4776 4.08969 12.6601 4.25001L18.6601 9.50001C18.7668 9.59372 18.8523 9.70907 18.9109 9.83839C18.9695 9.9677 18.9999 10.108 19.0001 10.25V19Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Home</h4>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      // setMiddleNav(true);
                      dispatch(addToState("projectList"));
                      setWhichTabisActive("projectList");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M15.99 3.78748L11.49 2.28748H11.4375C11.4026 2.28397 11.3674 2.28397 11.3325 2.28748H11.16H11.0625H11.01L6.75 3.74998L2.49 2.28748C2.37721 2.25029 2.25721 2.24041 2.13985 2.25867C2.0225 2.27692 1.91116 2.32279 1.815 2.39248C1.71807 2.46149 1.63895 2.55258 1.58418 2.65821C1.52941 2.76384 1.50055 2.88099 1.5 2.99998V13.5C1.4996 13.6572 1.54862 13.8106 1.64013 13.9385C1.73165 14.0663 1.86104 14.1622 2.01 14.2125L6.51 15.7125C6.66109 15.7617 6.82392 15.7617 6.975 15.7125L11.25 14.2875L15.51 15.75C15.5896 15.7608 15.6704 15.7608 15.75 15.75C15.9068 15.7522 16.0599 15.702 16.185 15.6075C16.2819 15.5385 16.3611 15.4474 16.4158 15.3417C16.4706 15.2361 16.4995 15.119 16.5 15V4.49998C16.5004 4.34275 16.4514 4.18936 16.3599 4.06151C16.2684 3.93365 16.139 3.83779 15.99 3.78748ZM6 13.9575L3 12.96V4.04248L6 5.03998V13.9575ZM10.5 12.96L7.5 13.9575V5.03998L10.5 4.04248V12.96ZM15 13.9575L12 12.96V4.04248L15 5.03998V13.9575Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Projects</h4>
                  </a>
                </li>
                {/* <li className="">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      const ele = document.getElementById("drop-mobile-one");
                      if (ele.style.display === "none") {
                        ele.style.display = "flex";
                      } else {
                        ele.style.display = "none";
                      }
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
                        d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM16 11H13V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V11H8C7.73479 11 7.48043 11.1054 7.2929 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.2929 12.7071C7.48043 12.8946 7.73479 13 8 13H11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Add</h4>
                  </a>
                </li>
                <div className="dropdown" id="drop-mobile-one">
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM16 11H13V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V11H8C7.73479 11 7.48043 11.1054 7.2929 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.2929 12.7071C7.48043 12.8946 7.73479 13 8 13H11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z"
                          fill="white"
                        />
                      </svg>
                      <h4>Add</h4>
                    </a>
                  </li>
                </div> */}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.7104 20.29L18.0004 16.61C19.4405 14.8144 20.1379 12.5353 19.9492 10.2413C19.7605 7.94733 18.7001 5.81281 16.9859 4.27667C15.2718 2.74053 13.0342 1.91954 10.7333 1.9825C8.43243 2.04546 6.24311 2.98759 4.61553 4.61517C2.98795 6.24275 2.04582 8.43207 1.98286 10.7329C1.9199 13.0338 2.7409 15.2714 4.27704 16.9855C5.81318 18.6997 7.94769 19.7601 10.2417 19.9488C12.5357 20.1375 14.8148 19.4401 16.6104 18L20.2904 21.68C20.3834 21.7738 20.494 21.8482 20.6158 21.8989C20.7377 21.9497 20.8684 21.9758 21.0004 21.9758C21.1324 21.9758 21.2631 21.9497 21.385 21.8989C21.5068 21.8482 21.6174 21.7738 21.7104 21.68C21.8906 21.4936 21.9914 21.2444 21.9914 20.985C21.9914 20.7257 21.8906 20.4765 21.7104 20.29ZM11.0004 18C9.61592 18 8.26255 17.5895 7.1114 16.8203C5.96026 16.0511 5.06305 14.9579 4.53324 13.6788C4.00342 12.3997 3.8648 10.9923 4.1349 9.63439C4.40499 8.27653 5.07168 7.02925 6.05065 6.05028C7.02961 5.07131 8.27689 4.40463 9.63476 4.13453C10.9926 3.86443 12.4001 4.00306 13.6792 4.53287C14.9583 5.06268 16.0515 5.95989 16.8207 7.11103C17.5899 8.26218 18.0004 9.61556 18.0004 11C18.0004 12.8565 17.2629 14.637 15.9501 15.9498C14.6374 17.2625 12.8569 18 11.0004 18Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Search</h4>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4V4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Calendar</h4>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      const ele = document.getElementById("drop-mobile-two");
                      if (ele.style.display === "none") {
                        ele.style.display = "flex";
                      } else {
                        ele.style.display = "none";
                      }
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
                        d="M10 13H3C2.73478 13 2.48043 13.1054 2.29289 13.2929C2.10536 13.4804 2 13.7348 2 14V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H10C10.2652 22 10.5196 21.8946 10.7071 21.7071C10.8946 21.5196 11 21.2652 11 21V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13ZM9 20H4V15H9V20ZM21 2H14C13.7348 2 13.4804 2.10536 13.2929 2.29289C13.1054 2.48043 13 2.73478 13 3V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11H21C21.2652 11 21.5196 10.8946 21.7071 10.7071C21.8946 10.5196 22 10.2652 22 10V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2V2ZM20 9H15V4H20V9ZM21 13H14C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14V21C13 21.2652 13.1054 21.5196 13.2929 21.7071C13.4804 21.8946 13.7348 22 14 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V14C22 13.7348 21.8946 13.4804 21.7071 13.2929C21.5196 13.1054 21.2652 13 21 13ZM20 20H15V15H20V20ZM10 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V10C2 10.2652 2.10536 10.5196 2.29289 10.7071C2.48043 10.8946 2.73478 11 3 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V3C11 2.73478 10.8946 2.48043 10.7071 2.29289C10.5196 2.10536 10.2652 2 10 2V2ZM9 9H4V4H9V9Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Registries</h4>
                  </a>
                </li>
                <div className="dropdown" id="drop-mobile-two">
                  {/* <li>
                    <a href="">
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
                      <h4>Samples</h4>
                    </a>
                  </li> */}
                  {/* <li>
                    <a href="">
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
                    </a>
                  </li>
                  <li>
                    <a href="">
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
                    </a>
                  </li> */}
                </div>
                <li>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setMiddleNav(false);
                      setWhichTabisActive("reportsAndDashboard");
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
                        d="M18 18C17.7348 18 17.4804 18.1054 17.2929 18.2929C17.1054 18.4804 17 18.7348 17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4H11V7C11 7.79565 11.3161 8.55871 11.8787 9.12132C12.4413 9.68393 13.2044 10 14 10H17V11C17 11.2652 17.1054 11.5196 17.2929 11.7071C17.4804 11.8946 17.7348 12 18 12C18.2652 12 18.5196 11.8946 18.7071 11.7071C18.8946 11.5196 19 11.2652 19 11V9C19 9 19 9 19 8.94C18.9896 8.84813 18.9695 8.75763 18.94 8.67C18.9442 8.64015 18.9442 8.60985 18.94 8.58C18.8919 8.47718 18.8278 8.38267 18.75 8.3L12.75 2.3C12.6673 2.22222 12.5728 2.15808 12.47 2.11H12.37C12.2757 2.05943 12.1747 2.0224 12.07 2H6C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19C19 18.7348 18.8946 18.4804 18.7071 18.2929C18.5196 18.1054 18.2652 18 18 18ZM13 5.41L15.59 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7V5.41ZM20 14H17.5C17.3684 13.9992 17.2379 14.0245 17.1161 14.0742C16.9943 14.124 16.8834 14.1973 16.79 14.29L15.55 15.54L12.75 12.34C12.6599 12.2368 12.5496 12.1532 12.4259 12.0944C12.3022 12.0356 12.1677 12.0029 12.0309 11.9982C11.894 11.9935 11.7576 12.017 11.6301 12.0672C11.5027 12.1174 11.3869 12.1932 11.29 12.29L9.59 14H8C7.73478 14 7.48043 14.1054 7.29289 14.2929C7.10536 14.4804 7 14.7348 7 15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16H10C10.1316 16.0008 10.2621 15.9755 10.3839 15.9258C10.5057 15.876 10.6166 15.8027 10.71 15.71L12 14.46L14.8 17.66C14.8903 17.763 15.0008 17.8463 15.1247 17.9048C15.2486 17.9632 15.3831 17.9957 15.52 18V18C15.6516 18.0008 15.7821 17.9755 15.9039 17.9258C16.0257 17.876 16.1366 17.8027 16.23 17.71L17.91 16H20C20.2652 16 20.5196 15.8946 20.7071 15.7071C20.8946 15.5196 21 15.2652 21 15C21 14.7348 20.8946 14.4804 20.7071 14.2929C20.5196 14.1054 20.2652 14 20 14Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Reports & Dashboards</h4>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    onClick={async (e) => {
                      e.preventDefault();
                      setMiddleNav(false);
                      setWhichTabisActive("profile");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.71 12.7101C16.6904 11.9388 17.406 10.881 17.7572 9.68407C18.1085 8.48709 18.0779 7.21039 17.6698 6.03159C17.2617 4.85279 16.4963 3.83052 15.4801 3.10698C14.4639 2.38344 13.2474 1.99463 12 1.99463C10.7525 1.99463 9.53611 2.38344 8.51993 3.10698C7.50374 3.83052 6.73834 4.85279 6.33021 6.03159C5.92208 7.21039 5.89151 8.48709 6.24276 9.68407C6.59401 10.881 7.3096 11.9388 8.29 12.7101C6.61007 13.3832 5.14428 14.4995 4.04889 15.94C2.95349 17.3806 2.26956 19.0914 2.07 20.8901C2.05555 21.0214 2.06711 21.1543 2.10402 21.2812C2.14093 21.408 2.20246 21.5264 2.28511 21.6294C2.45202 21.8376 2.69478 21.971 2.96 22.0001C3.22521 22.0293 3.49116 21.9519 3.69932 21.785C3.90749 21.6181 4.04082 21.3753 4.07 21.1101C4.28958 19.1553 5.22168 17.3499 6.68822 16.0389C8.15475 14.7279 10.0529 14.0032 12.02 14.0032C13.9871 14.0032 15.8852 14.7279 17.3518 16.0389C18.8183 17.3499 19.7504 19.1553 19.97 21.1101C19.9972 21.3558 20.1144 21.5828 20.2991 21.7471C20.4838 21.9115 20.7228 22.0016 20.97 22.0001H21.08C21.3421 21.97 21.5817 21.8374 21.7466 21.6314C21.9114 21.4253 21.9881 21.1625 21.96 20.9001C21.7595 19.0963 21.0719 17.3811 19.9708 15.9383C18.8698 14.4955 17.3969 13.3796 15.71 12.7101ZM12 12.0001C11.2089 12.0001 10.4355 11.7655 9.77772 11.326C9.11992 10.8865 8.60723 10.2618 8.30448 9.53086C8.00173 8.79995 7.92251 7.99569 8.07686 7.21976C8.2312 6.44384 8.61216 5.73111 9.17157 5.1717C9.73098 4.61229 10.4437 4.23132 11.2196 4.07698C11.9956 3.92264 12.7998 4.00186 13.5307 4.30461C14.2616 4.60736 14.8863 5.12005 15.3259 5.77784C15.7654 6.43564 16 7.209 16 8.00012C16 9.06099 15.5786 10.0784 14.8284 10.8286C14.0783 11.5787 13.0609 12.0001 12 12.0001Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Account</h4>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    onClick={async (e) => {
                      e.preventDefault();
                      logoutHandler();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3.33334 4C3.51015 4 3.67972 4.07024 3.80475 4.19526C3.92977 4.32029 4.00001 4.48986 4.00001 4.66667V7.33333C4.00001 7.51014 4.07025 7.67971 4.19527 7.80474C4.32029 7.92976 4.48986 8 4.66667 8H11.06L10.1933 7.14C10.0678 7.01446 9.99728 6.8442 9.99728 6.66667C9.99728 6.48913 10.0678 6.31887 10.1933 6.19333C10.3189 6.0678 10.4891 5.99727 10.6667 5.99727C10.8442 5.99727 11.0145 6.0678 11.14 6.19333L13.14 8.19333C13.2007 8.25674 13.2483 8.3315 13.28 8.41333C13.3467 8.57564 13.3467 8.75769 13.28 8.92C13.2483 9.00183 13.2007 9.0766 13.14 9.14L11.14 11.14C11.078 11.2025 11.0043 11.2521 10.9231 11.2859C10.8418 11.3198 10.7547 11.3372 10.6667 11.3372C10.5787 11.3372 10.4915 11.3198 10.4103 11.2859C10.3291 11.2521 10.2553 11.2025 10.1933 11.14C10.1309 11.078 10.0813 11.0043 10.0474 10.9231C10.0136 10.8418 9.99614 10.7547 9.99614 10.6667C9.99614 10.5787 10.0136 10.4915 10.0474 10.4103C10.0813 10.329 10.1309 10.2553 10.1933 10.1933L11.06 9.33333H4.66667C4.13624 9.33333 3.62753 9.12262 3.25246 8.74755C2.87739 8.37247 2.66667 7.86377 2.66667 7.33333V4.66667C2.66667 4.48986 2.73691 4.32029 2.86194 4.19526C2.98696 4.07024 3.15653 4 3.33334 4Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Logout</h4>
                  </a>
                </li>
                {/* <li>
                  <a href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19.8999 12.66C19.7396 12.4775 19.6512 12.2429 19.6512 12C19.6512 11.7571 19.7396 11.5225 19.8999 11.34L21.1799 9.89999C21.3209 9.74266 21.4085 9.54469 21.4301 9.33449C21.4516 9.1243 21.4061 8.91267 21.2999 8.72999L19.2999 5.26999C19.1948 5.08751 19.0348 4.94286 18.8426 4.85667C18.6505 4.77048 18.4361 4.74714 18.2299 4.78999L16.3499 5.16999C16.1107 5.21942 15.8616 5.17958 15.6498 5.05799C15.4379 4.9364 15.2779 4.74147 15.1999 4.50999L14.5899 2.67999C14.5228 2.48137 14.395 2.30885 14.2245 2.18683C14.0541 2.06481 13.8495 1.99945 13.6399 1.99999H9.6399C9.42183 1.9886 9.20603 2.04891 9.02546 2.1717C8.84489 2.29449 8.70948 2.47301 8.6399 2.67999L8.0799 4.50999C8.0019 4.74147 7.84187 4.9364 7.63001 5.05799C7.41815 5.17958 7.16911 5.21942 6.9299 5.16999L4.9999 4.78999C4.80445 4.76237 4.6052 4.79321 4.42724 4.87863C4.24929 4.96404 4.1006 5.10021 3.9999 5.26999L1.9999 8.72999C1.89106 8.91064 1.84212 9.12107 1.86008 9.33121C1.87804 9.54135 1.96198 9.74043 2.0999 9.89999L3.3699 11.34C3.53022 11.5225 3.61863 11.7571 3.61863 12C3.61863 12.2429 3.53022 12.4775 3.3699 12.66L2.0999 14.1C1.96198 14.2595 1.87804 14.4586 1.86008 14.6688C1.84212 14.8789 1.89106 15.0893 1.9999 15.27L3.9999 18.73C4.10499 18.9125 4.26502 19.0571 4.45715 19.1433C4.64928 19.2295 4.86372 19.2528 5.0699 19.21L6.9499 18.83C7.18911 18.7806 7.43815 18.8204 7.65001 18.942C7.86187 19.0636 8.0219 19.2585 8.0999 19.49L8.7099 21.32C8.77948 21.527 8.91489 21.7055 9.09546 21.8283C9.27603 21.9511 9.49183 22.0114 9.7099 22H13.7099C13.9195 22.0005 14.1241 21.9352 14.2945 21.8131C14.465 21.6911 14.5928 21.5186 14.6599 21.32L15.2699 19.49C15.3479 19.2585 15.5079 19.0636 15.7198 18.942C15.9316 18.8204 16.1807 18.7806 16.4199 18.83L18.2999 19.21C18.5061 19.2528 18.7205 19.2295 18.9126 19.1433C19.1048 19.0571 19.2648 18.9125 19.3699 18.73L21.3699 15.27C21.4761 15.0873 21.5216 14.8757 21.5001 14.6655C21.4785 14.4553 21.3909 14.2573 21.2499 14.1L19.8999 12.66ZM18.4099 14L19.2099 14.9L17.9299 17.12L16.7499 16.88C16.0297 16.7328 15.2805 16.8551 14.6445 17.2238C14.0085 17.5925 13.53 18.1818 13.2999 18.88L12.9199 20H10.3599L9.9999 18.86C9.76975 18.1618 9.29128 17.5725 8.6553 17.2038C8.01932 16.8351 7.27012 16.7128 6.5499 16.86L5.3699 17.1L4.0699 14.89L4.8699 13.99C5.36185 13.44 5.63383 12.7279 5.63383 11.99C5.63383 11.2521 5.36185 10.54 4.8699 9.98999L4.0699 9.08999L5.3499 6.88999L6.5299 7.12999C7.25012 7.27721 7.99932 7.15487 8.6353 6.78619C9.27128 6.4175 9.74975 5.82815 9.9799 5.12999L10.3599 3.99999H12.9199L13.2999 5.13999C13.53 5.83815 14.0085 6.4275 14.6445 6.79619C15.2805 7.16487 16.0297 7.28721 16.7499 7.13999L17.9299 6.89999L19.2099 9.11999L18.4099 10.02C17.9235 10.5687 17.6549 11.2767 17.6549 12.01C17.6549 12.7433 17.9235 13.4512 18.4099 14ZM11.6399 7.99999C10.8488 7.99999 10.0754 8.23458 9.41761 8.67411C8.75982 9.11363 8.24713 9.73835 7.94438 10.4693C7.64163 11.2002 7.56241 12.0044 7.71675 12.7803C7.8711 13.5563 8.25206 14.269 8.81147 14.8284C9.37088 15.3878 10.0836 15.7688 10.8595 15.9231C11.6355 16.0775 12.4397 15.9983 13.1706 15.6955C13.9015 15.3928 14.5262 14.8801 14.9658 14.2223C15.4053 13.5645 15.6399 12.7911 15.6399 12C15.6399 10.9391 15.2185 9.9217 14.4683 9.17156C13.7182 8.42141 12.7008 7.99999 11.6399 7.99999ZM11.6399 14C11.2443 14 10.8577 13.8827 10.5288 13.6629C10.1999 13.4432 9.94351 13.1308 9.79214 12.7654C9.64076 12.3999 9.60116 11.9978 9.67833 11.6098C9.7555 11.2218 9.94598 10.8655 10.2257 10.5858C10.5054 10.3061 10.8618 10.1156 11.2497 10.0384C11.6377 9.96125 12.0398 10.0009 12.4053 10.1522C12.7707 10.3036 13.0831 10.5599 13.3028 10.8888C13.5226 11.2177 13.6399 11.6044 13.6399 12C13.6399 12.5304 13.4292 13.0391 13.0541 13.4142C12.679 13.7893 12.1703 14 11.6399 14Z"
                        fill="white"
                      />
                    </svg>
                    <h4>Settings</h4>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="main-content-in-editor">
          {middleNav && (
            <MiddleNav
              id={id}
              setId={setId}
              addTab={addTab}
              setModal={setModal}
              setActiveProject={setActiveProject}
              setActiveTab={setActiveTab}
              removeTab={removeTab}
              setHomeActive={setHomeActive}
              setProfileActive={setProfileActive}
              setMiddleNav={setMiddleNav}
              setNewCollab={setNewCollab}
              newCollab={newCollab}
              setTabId={setTabId}
              newTask={newTask}
              newSample={newSample}
              taskModal={taskModal}
              setTaskModal={setTaskModal}
              taskContent={taskContent}
              setTaskContent={setTaskContent}
              setSampleContent={setSampleContent}
              setSampleModal={setSampleModal}
              setProjectListActive={setProjectListActive}
              setProjectInsideActive={setProjectInsideActive}
              setProjectInsideActiveId={setProjectInsideActiveId}
              setCalendarActive={setCalendarActive}
              setSampleListActive={setSampleListActive}
              projectUpdatedProfilers={projectUpdatedProfilers}
              setProjectUpdatedProfilers={setProjectUpdatedProfilers}
              setTaskUpdateController={setTaskUpdateController}
              taskUpdateController={taskUpdateController}
              projectSettings={projectSettings}
              setProjectSettings={setProjectSettings}
              setWhichTabisActive={setWhichTabisActive}
              setUpdatedUserCollabRole={setUpdatedUserCollabRole}
              updateUserCollabRole={updateUserCollabRole}
              projectInsideActive={projectInsideActive}
              projectInsideActiveId={projectInsideActiveId}
              newEntry={newEntry}
              setNewEntry={setNewEntry}
              entryUpdate={entryUpdate}
              setEntryUpdate={setEntryUpdate}
            />
          )}
          <div
            className="main-structure"
            ref={mainDiv}
            // style={{
            //   backgroundColor:
            //     whichTabisActive === "tabs" ? "#b0c4de" : "#ececec",
            // }}
          >
            {whichTabisActive === "home" && (
              <div className="main-inside calendar-main-inside">
                {" "}
                <Home
                  setTaskModal={setTaskModal}
                  setTaskContent={setTaskContent}
                  setCreateNewTaskModal={setCreateNewTaskModal}
                  setTaskUpdateController={setTaskUpdateController}
                  taskUpdateController={taskUpdateController}
                />
              </div>
            )}
            {whichTabisActive === "admin" && <AdminPannel />}
            {whichTabisActive === "search" && (
              <SearchPage
                setSampleContent={setSampleContent}
                setSampleModal={setSampleModal}
                setWhichTabisActive={setWhichTabisActive}
                setProjectInsideActiveId={setProjectInsideActiveId}
                setProjectInsideActive={setProjectInsideActive}
                setProtocolContent={setProtocolContent}
                setProtocolModal={setProtocolModal}
                setSopContent={setSopContent}
                setSopModal={setSopModal}
              />
            )}
            {whichTabisActive === "calendar" && (
              <CalendarTemp
                setTaskModal={setTaskModal}
                setTaskContent={setTaskContent}
              />
            )}
            {whichTabisActive === "templates" && <TemplateSettings />}
            {whichTabisActive === "profile" && (
              <div className="main-inside">
                <ProfilePage />
              </div>
            )}
            {whichTabisActive === "orgList" && (
              <ListOrganizations
                newOrg={newOrg}
                setUpdatedUserCollabRoleOrg={setUpdatedUserCollabRoleOrg}
                UpdatedUserCollabRoleOrg={UpdatedUserCollabRoleOrg}
                setProtocolContent={setProtocolContent}
                setProtocolModal={setProtocolModal}
                setSopContent={setSopContent}
                setSopModal={setSopModal}
              />
            )}

            {whichTabisActive === "projectList" && (
              <ListProjects
                setProjectListActive={setProjectListActive}
                setActiveProject={setProjectActive}
                setActiveProjectId={setActiveProjectId}
                setTaskModal={setTaskModal}
                taskContent={taskContent}
                setTaskContent={setTaskContent}
                setSampleContent={setSampleContent}
                setSampleModal={setSampleModal}
                setHomeActive={setHomeActive}
                setProfileActive={setProfileActive}
                setTabId={setTabId}
                projectInsideActive={projectInsideActive}
                setProjectInsideActive={setProjectInsideActive}
                projectInsideActiveId={projectInsideActiveId}
                setProjectInsideActiveId={setProjectInsideActiveId}
                setCalendarActive={setCalendarActive}
                setSampleListActive={setSampleListActive}
                setProjectSettings={setProjectSettings}
                setWhichTabisActive={setWhichTabisActive}
                setEntryModal={setEntryModal}
                projectSettings={projectSettings}
                setNewCollab={setNewCollab}
                setProjectUpdatedProfilers={setProjectUpdatedProfilers}
                projectUpdatedProfilers={projectUpdatedProfilers}
                newEntry={newEntry}
                newTask={newTask}
                newCollab={newCollab}
                setCreateNewTaskModal={setCreateNewTaskModal}
                setUpdatedUserCollabRole={setUpdatedUserCollabRole}
                updateUserCollabRole={updateUserCollabRole}
                setSelectedProjectNow={setSelectedProjectNow}
                setCreateNewSampleModal={setCreateNewSampleModal}
                taskUpdateController={taskUpdateController}
                setTaskUpdateController={setTaskUpdateController}
                setEntryUpdate={setEntryUpdate}
                setModal={setModal}
              />
            )}
            {whichTabisActive === "sampleList" && (
              <ListSamplesAll
                setSampleContent={setSampleContent}
                setSampleModal={setSampleModal}
                newSample={newSample}
                setNewSample={setNewSample}
                setCreateNewSampleModal={setCreateNewSampleModal}
                setSampleUpdate={setSampleUpdate}
                sampleUpdate={sampleUpdate}
              />
            )}
            {whichTabisActive === "reportsAndDashboard" && (
              <ReportsAndDashboard setWhichTabisActive={setWhichTabisActive} />
            )}
            {whichTabisActive === "listProtocols" && (
              <ListProtocolsAll
                setProtocolContent={setProtocolContent}
                setProtocolModal={setProtocolModal}
                setCreateNewProtocol={setCreateNewProtocol}
                newProtocol={newProtocol}
                setNewProtocol={setNewProtocol}
              />
            )}
            {whichTabisActive === "listSops" && (
              <ListSopsAll
                setNewSop={setNewSop}
                setSopModal={setSopModal}
                setCreateNewSop={setCreateNewSop}
                newSop={newSop}
                setSopContent={setSopContent}
              />
            )}
            {/* {whichTabisActive === "tabs" && tabDetails.length === 0 && (
              <div className="main-inside">
                {" "}
               
                Nothing here yet.
              </div>
            )} */}
            {whichTabisActive === "tabs" && (
              <div className="main-inside">
                {tabDetails.length === 0 ? (
                  <div className="main-inside-nothing-here">
                    <img src="./assets/6.svg" alt="" />
                    <span>
                      Nothing opened yet. Browse through the explored to open
                      entries
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="tabs-header">
                      {tabDetails.length > 0 &&
                        tabDetails.map((tab) => (
                          <TabsHeader
                            tab={tab.doc}
                            active={tab.doc._id == tabID ? true : false}
                            setTabId={setTabId}
                            removeTab={removeTab}
                          />
                        ))}
                    </div>
                    <div className="tabs-content">
                      {tabDetails.length > 0 &&
                        tabDetails.map((tab) =>
                          tab.doc.createdAt >= todaysDate ||
                          tab.doc.converted ? (
                            tab.userType == "Admin" ||
                            tab.userType == "Write" ||
                            tab.userType == "owner" ? (
                              <TextEditorTwo
                                tab={tab.doc}
                                active={tab.doc._id == tabID ? true : false}
                                project={tab.project}
                                userType={tab.userType}
                                setProjectSettings={setProjectSettings}
                                setNewCollab={setNewCollab}
                                setProjectUpdatedProfilers={
                                  setProjectUpdatedProfilers
                                }
                                setUpdatedUserCollabRole={
                                  setUpdatedUserCollabRole
                                }
                                setEntryUpdate={setEntryUpdate}
                                setWhichTabisActive={setWhichTabisActive}
                                setSampleContent={setSampleContent}
                                setSampleModal={setSampleModal}
                              />
                            ) : (
                              <TextEditorTwoRead
                                tab={tab.doc}
                                active={tab.doc._id == tabID ? true : false}
                                project={tab.project}
                                userType={tab.userType}
                                setProjectSettings={setProjectSettings}
                                setNewCollab={setNewCollab}
                                setProjectUpdatedProfilers={
                                  setProjectUpdatedProfilers
                                }
                                setUpdatedUserCollabRole={
                                  setUpdatedUserCollabRole
                                }
                                setEntryUpdate={setEntryUpdate}
                                setWhichTabisActive={setWhichTabisActive}
                                setSampleContent={setSampleContent}
                                setSampleModal={setSampleModal}
                              />
                            )
                          ) : tab.userType == "Admin" ||
                            tab.userType == "Write" ||
                            tab.userType == "owner" ? (
                            <TextEditorRead
                              tab={tab.doc}
                              active={tab.doc._id == tabID ? true : false}
                              project={tab.project}
                              userType={tab.userType}
                              setProjectSettings={setProjectSettings}
                              setNewCollab={setNewCollab}
                              setProjectUpdatedProfilers={
                                setProjectUpdatedProfilers
                              }
                              setUpdatedUserCollabRole={
                                setUpdatedUserCollabRole
                              }
                              setEntryUpdate={setEntryUpdate}
                              setWhichTabisActive={setWhichTabisActive}
                              setSampleContent={setSampleContent}
                              setSampleModal={setSampleModal}
                            />
                          ) : (
                            <div className={`editor-checker`} key={tab.id}>
                              <TextEditorRead
                                tab={tab.doc}
                                active={tab.doc._id == tabID ? true : false}
                                project={tab.project}
                                userType={tab.userType}
                              />
                            </div>
                          )
                        )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {whichTabisActive != "reportsAndDashboard" && <Footer />}
      </div>
    </div>
  );
}

export default EditorComponent;
