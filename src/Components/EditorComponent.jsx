import React, { useEffect, useRef, useState } from "react";
import MiddleNav from "./MiddleNav";
import SideNav from "./SideNav";
import Loader from "../css/utils/Loader";
import { useParams } from "react-router-dom";
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
import { getUserDetails } from "../redux/actions/userActions";
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
function EditorComponent() {
  const mainDiv = useRef();
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (localStorage.getItem("showBanner")) {
      setShowBanner(false);
    }
  }, []);

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

  return (
    <div className="main-container">
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
            />
          )}
          <div className="main-structure" ref={mainDiv}>
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
            {whichTabisActive === "tabs" && (
              <div className="main-inside">
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
                      tab.userType == "Admin" ||
                      tab.userType == "Write" ||
                      tab.userType == "owner" ? (
                        <div className={`editor-checker`} key={tab.id}>
                          <TextEditor
                            tab={tab.doc}
                            active={tab.doc._id == tabID ? true : false}
                            project={tab.project}
                            userType={tab.userType}
                            setProjectSettings={setProjectSettings}
                            setNewCollab={setNewCollab}
                            setProjectUpdatedProfilers={
                              setProjectUpdatedProfilers
                            }
                            setUpdatedUserCollabRole={setUpdatedUserCollabRole}
                            setEntryUpdate={setEntryUpdate}
                            setWhichTabisActive={setWhichTabisActive}
                            setSampleContent={setSampleContent}
                            setSampleModal={setSampleModal}
                          />
                        </div>
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
