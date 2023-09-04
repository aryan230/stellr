import {
  PROTOCOL_CREATE_FAIL,
  PROTOCOL_CREATE_REQUEST,
  PROTOCOL_CREATE_RESET,
  PROTOCOL_CREATE_SUCESS,
  PROTOCOL_LIST_MY_FAIL,
  PROTOCOL_LIST_MY_REQUEST,
  PROTOCOL_LIST_MY_RESET,
  PROTOCOL_LIST_MY_SUCESS,
} from "../constants/protocolConstants";

export const protocolCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROTOCOL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PROTOCOL_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        protocol: action.payload,
      };
    case PROTOCOL_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROTOCOL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const protocolListMyReducer = (state = { protocols: [] }, action) => {
  switch (action.type) {
    case PROTOCOL_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case PROTOCOL_LIST_MY_SUCESS:
      return {
        loading: false,
        protocols: action.payload,
      };
    case PROTOCOL_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PROTOCOL_LIST_MY_RESET:
      return {
        protocols: [],
      };
    default:
      return state;
  }
};
