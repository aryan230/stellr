import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userAdminMetricsReducer,
  userDetailsReducer,
  userLoginReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./redux/reducers/userReducers";
import {
  projectCollabCreateReducer,
  projectCreateReducer,
  projectDetailsReducer,
  projectUpdateCollabReducer,
  projectUpdateProfileReducer,
  projectsListMyCollabReducer,
  projectsListMyOrgReducer,
  projectsListMyReducer,
} from "./redux/reducers/projectReducers";
import { cartReducer } from "./redux/reducers/cartReducers";
import {
  taskCreateReducer,
  taskListMyPersonalReducer,
  taskListMyReducer,
  taskUpdateReducer,
  tasksListMyCollabReducer,
} from "./redux/reducers/taskReducers";
import {
  sampleCreateReducer,
  sampleListMyReducer,
} from "./redux/reducers/sampleReducers";
import {
  entryTemplateCreateReducer,
  entryTemplatesListMyReducer,
} from "./redux/reducers/entryTemplateReducers";
import {
  entriesListMyReducer,
  entryCreateReducer,
} from "./redux/reducers/entryReducers";
import {
  orgCreateReducer,
  orgsListMyCollabReducer,
  orgsListMyReducer,
} from "./redux/reducers/organizationReducers";
import {
  protocolCreateReducer,
  protocolListMyReducer,
} from "./redux/reducers/protocolReducers";
import {
  sopCreateReducer,
  sopListMyReducer,
} from "./redux/reducers/sopReducers";
import { stateReducer } from "./redux/reducers/stateReducers";

const reducer = combineReducers({
  cart: cartReducer,
  state: stateReducer,
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  userAdminMetrics: userAdminMetricsReducer,
  projectCreate: projectCreateReducer,
  projectListMy: projectsListMyReducer,
  projectDetails: projectDetailsReducer,
  projectCollabCreate: projectCollabCreateReducer,
  projecListMyCollab: projectsListMyCollabReducer,
  projectListMyOrg: projectsListMyOrgReducer,
  projectUpdateCollab: projectUpdateCollabReducer,
  projectUpdateProfile: projectUpdateProfileReducer,
  taskCreate: taskCreateReducer,
  taskListMy: taskListMyReducer,
  taskListMyPersonal: taskListMyPersonalReducer,
  taskListMyCollab: tasksListMyCollabReducer,
  taskUpdate: taskUpdateReducer,
  sampleCreate: sampleCreateReducer,
  sampleListMy: sampleListMyReducer,
  entryTemplateCreate: entryTemplateCreateReducer,
  entryTemplateListMy: entryTemplatesListMyReducer,
  entryCreate: entryCreateReducer,
  entriesListMy: entriesListMyReducer,
  orgCreate: orgCreateReducer,
  orgListMy: orgsListMyReducer,
  orgListMyCollab: orgsListMyCollabReducer,
  protocolCreate: protocolCreateReducer,
  protocolListMy: protocolListMyReducer,
  sopCreate: sopCreateReducer,
  sopListMy: sopListMyReducer,
});

const userInfoFromStorage = localStorage.getItem("userStellr")
  ? JSON.parse(localStorage.getItem("userStellr"))
  : null;

const stateInfoFromStorage = localStorage.getItem("stateDetails")
  ? JSON.parse(localStorage.getItem("stateDetails"))
  : null;

const cartInfoStorage = localStorage.getItem("tabDetails")
  ? JSON.parse(localStorage.getItem("tabDetails"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: { tabDetails: cartInfoStorage },
  state: { stateDetails: stateInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
