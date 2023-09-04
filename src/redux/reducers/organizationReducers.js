import {
  ORG_CREATE_FAIL,
  ORG_CREATE_REQUEST,
  ORG_CREATE_RESET,
  ORG_CREATE_SUCESS,
  ORG_GET_COLLAB_FAIL,
  ORG_GET_COLLAB_REQUEST,
  ORG_GET_COLLAB_RESET,
  ORG_GET_COLLAB_SUCESS,
  ORG_LIST_MY_FAIL,
  ORG_LIST_MY_REQUEST,
  ORG_LIST_MY_RESET,
  ORG_LIST_MY_SUCESS,
} from "../constants/organizationConstants";

export const orgCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORG_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORG_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        org: action.payload,
      };
    case ORG_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orgsListMyReducer = (state = { orgs: [] }, action) => {
  switch (action.type) {
    case ORG_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORG_LIST_MY_SUCESS:
      return {
        loading: false,
        orgs: action.payload,
        sucess: true,
      };
    case ORG_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORG_LIST_MY_RESET:
      return {
        orgs: [],
      };
    default:
      return state;
  }
};

export const orgsListMyCollabReducer = (state = { orgs: [] }, action) => {
  switch (action.type) {
    case ORG_GET_COLLAB_REQUEST:
      return {
        loading: true,
      };
    case ORG_GET_COLLAB_SUCESS:
      return {
        loading: false,
        orgs: action.payload,
        sucess: true,
      };
    case ORG_GET_COLLAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORG_GET_COLLAB_RESET:
      return {
        orgs: [],
      };
    default:
      return state;
  }
};
