import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_RESET,
  TASK_CREATE_SUCESS,
  TASK_GET_COLLAB_FAIL,
  TASK_GET_COLLAB_REQUEST,
  TASK_GET_COLLAB_RESET,
  TASK_GET_COLLAB_SUCESS,
  TASK_LIST_MY_FAIL,
  TASK_LIST_MY_PERSONAL_FAIL,
  TASK_LIST_MY_PERSONAL_REQUEST,
  TASK_LIST_MY_PERSONAL_RESET,
  TASK_LIST_MY_PERSONAL_SUCESS,
  TASK_LIST_MY_REQUEST,
  TASK_LIST_MY_RESET,
  TASK_LIST_MY_SUCESS,
  TASK_UPDATE_PROFILE_FAIL,
  TASK_UPDATE_PROFILE_REQUEST,
  TASK_UPDATE_PROFILE_RESET,
  TASK_UPDATE_PROFILE_SUCESS,
} from "../constants/taskConstants";

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return {
        loading: true,
      };
    case TASK_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        task: action.payload,
      };
    case TASK_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskListMyReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case TASK_LIST_MY_SUCESS:
      return {
        loading: false,
        tasks: action.payload,
      };
    case TASK_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_LIST_MY_RESET:
      return {
        tasks: [],
      };
    default:
      return state;
  }
};

export const taskListMyPersonalReducer = (
  state = { tasksList: [] },
  action
) => {
  switch (action.type) {
    case TASK_LIST_MY_PERSONAL_REQUEST:
      return {
        loading: true,
      };
    case TASK_LIST_MY_PERSONAL_SUCESS:
      return {
        loading: false,
        tasksList: action.payload,
      };
    case TASK_LIST_MY_PERSONAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_LIST_MY_PERSONAL_RESET:
      return {
        tasksList: [],
      };
    default:
      return state;
  }
};

export const tasksListMyCollabReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_GET_COLLAB_REQUEST:
      return {
        loading: true,
      };
    case TASK_GET_COLLAB_SUCESS:
      return {
        loading: false,
        tasks: action.payload,
      };
    case TASK_GET_COLLAB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_GET_COLLAB_RESET:
      return {
        tasks: [],
      };
    default:
      return state;
  }
};

export const taskUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case TASK_UPDATE_PROFILE_SUCESS:
      return {
        loading: false,
        task: action.payload,
        sucess: true,
      };
    case TASK_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_UPDATE_PROFILE_RESET:
      return {
        task: [],
      };
    default:
      return state;
  }
};
