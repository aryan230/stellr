import {
  PROJECT_CREATE_COLLAB_FAIL,
  PROJECT_CREATE_COLLAB_REQUEST,
  PROJECT_CREATE_COLLAB_RESET,
  PROJECT_CREATE_COLLAB_SUCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_RESET,
  PROJECT_CREATE_SUCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCESS,
  PROJECT_GET_COLLAB_FAIL,
  PROJECT_GET_COLLAB_REQUEST,
  PROJECT_GET_COLLAB_RESET,
  PROJECT_GET_COLLAB_SUCESS,
  PROJECT_GET_ORG_FAIL,
  PROJECT_GET_ORG_REQUEST,
  PROJECT_GET_ORG_RESET,
  PROJECT_GET_ORG_SUCESS,
  PROJECT_LIST_MY_FAIL,
  PROJECT_LIST_MY_REQUEST,
  PROJECT_LIST_MY_RESET,
  PROJECT_LIST_MY_SUCESS,
  PROJECT_UPDATE_COLLAB_FAIL,
  PROJECT_UPDATE_COLLAB_REQUEST,
  PROJECT_UPDATE_COLLAB_RESET,
  PROJECT_UPDATE_COLLAB_SUCESS,
  PROJECT_UPDATE_PROFILE_FAIL,
  PROJECT_UPDATE_PROFILE_REQUEST,
  PROJECT_UPDATE_PROFILE_RESET,
  PROJECT_UPDATE_PROFILE_SUCESS,
} from "../constants/projectConstants";

export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        project: action.payload,
      };
    case PROJECT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROJECT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const projectCollabCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_COLLAB_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_CREATE_COLLAB_SUCESS:
      return {
        loading: false,
        sucess: true,
        project: action.payload,
      };
    case PROJECT_CREATE_COLLAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROJECT_CREATE_COLLAB_RESET:
      return {};
    default:
      return state;
  }
};

export const projectUpdateCollabReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_COLLAB_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_UPDATE_COLLAB_SUCESS:
      return {
        loading: false,
        sucess: true,
        project: action.payload,
      };
    case PROJECT_UPDATE_COLLAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROJECT_UPDATE_COLLAB_RESET:
      return {};
    default:
      return state;
  }
};

export const projectsListMyReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_LIST_MY_SUCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case PROJECT_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROJECT_LIST_MY_RESET:
      return {
        projects: [],
      };
    default:
      return state;
  }
};

export const projectUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_UPDATE_PROFILE_SUCESS:
      return {
        loading: false,
        project: action.payload,
        sucess: true,
      };
    case PROJECT_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROJECT_UPDATE_PROFILE_RESET:
      return {
        project: [],
      };
    default:
      return state;
  }
};

export const projectsListMyCollabReducer = (
  state = { projects: [] },
  action
) => {
  switch (action.type) {
    case PROJECT_GET_COLLAB_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_GET_COLLAB_SUCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case PROJECT_GET_COLLAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROJECT_GET_COLLAB_RESET:
      return {
        projects: [],
      };
    default:
      return state;
  }
};

export const projectsListMyOrgReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_GET_ORG_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_GET_ORG_SUCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case PROJECT_GET_ORG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROJECT_GET_ORG_RESET:
      return {
        projects: [],
      };
    default:
      return state;
  }
};

export const projectDetailsReducer = (
  state = { loading: true, items: [] },
  action
) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_DETAILS_SUCESS:
      return {
        loading: false,
        project: action.payload,
      };
    case PROJECT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
