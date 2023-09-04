import {
  ENTRY_CREATE_FAIL,
  ENTRY_CREATE_REQUEST,
  ENTRY_CREATE_RESET,
  ENTRY_CREATE_SUCESS,
  ENTRY_LIST_MY_FAIL,
  ENTRY_LIST_MY_REQUEST,
  ENTRY_LIST_MY_RESET,
  ENTRY_LIST_MY_SUCESS,
} from "../constants/entryConstants";

export const entryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ENTRY_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        entry: action.payload,
      };
    case ENTRY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ENTRY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const entriesListMyReducer = (state = { entries: [] }, action) => {
  switch (action.type) {
    case ENTRY_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ENTRY_LIST_MY_SUCESS:
      return {
        loading: false,
        entries: action.payload,
      };
    case ENTRY_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ENTRY_LIST_MY_RESET:
      return {
        entries: [],
      };
    default:
      return state;
  }
};
