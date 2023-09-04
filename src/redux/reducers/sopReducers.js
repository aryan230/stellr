import {
  SOP_CREATE_FAIL,
  SOP_CREATE_REQUEST,
  SOP_CREATE_RESET,
  SOP_CREATE_SUCESS,
  SOP_LIST_MY_FAIL,
  SOP_LIST_MY_REQUEST,
  SOP_LIST_MY_RESET,
  SOP_LIST_MY_SUCESS,
} from "../constants/sopConstants";

export const sopCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SOP_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SOP_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        sop: action.payload,
      };
    case SOP_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SOP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const sopListMyReducer = (state = { sops: [] }, action) => {
  switch (action.type) {
    case SOP_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case SOP_LIST_MY_SUCESS:
      return {
        loading: false,
        sops: action.payload,
      };
    case SOP_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SOP_LIST_MY_RESET:
      return {
        sops: [],
      };
    default:
      return state;
  }
};
