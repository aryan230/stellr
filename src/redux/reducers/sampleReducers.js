import {
  SAMPLE_CREATE_FAIL,
  SAMPLE_CREATE_REQUEST,
  SAMPLE_CREATE_RESET,
  SAMPLE_CREATE_SUCESS,
  SAMPLE_LIST_MY_FAIL,
  SAMPLE_LIST_MY_REQUEST,
  SAMPLE_LIST_MY_RESET,
  SAMPLE_LIST_MY_SUCESS,
} from "../constants/sampleConstants";

export const sampleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SAMPLE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SAMPLE_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        sample: action.payload,
      };
    case SAMPLE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SAMPLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const sampleListMyReducer = (state = { samples: [] }, action) => {
  switch (action.type) {
    case SAMPLE_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case SAMPLE_LIST_MY_SUCESS:
      return {
        loading: false,
        samples: action.payload,
      };
    case SAMPLE_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SAMPLE_LIST_MY_RESET:
      return {
        samples: [],
      };
    default:
      return state;
  }
};
