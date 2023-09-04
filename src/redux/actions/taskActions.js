import axios from "axios";
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCESS,
  TASK_GET_COLLAB_FAIL,
  TASK_GET_COLLAB_REQUEST,
  TASK_GET_COLLAB_SUCESS,
  TASK_LIST_MY_FAIL,
  TASK_LIST_MY_PERSONAL_FAIL,
  TASK_LIST_MY_PERSONAL_REQUEST,
  TASK_LIST_MY_PERSONAL_SUCESS,
  TASK_LIST_MY_REQUEST,
  TASK_LIST_MY_SUCESS,
  TASK_UPDATE_PROFILE_FAIL,
  TASK_UPDATE_PROFILE_REQUEST,
  TASK_UPDATE_PROFILE_SUCESS,
} from "../constants/taskConstants";
import URL from "./../../Data/data.json";

export const createTask = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${URL[0]}api/tasks`, project, config);

    dispatch({
      type: TASK_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyTasks = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/tasks/${id}`, config);

    dispatch({
      type: TASK_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTask = (id, task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_UPDATE_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`${URL[0]}api/tasks/${id}`, task, config);

    dispatch({
      type: TASK_UPDATE_PROFILE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyTasksPersonal = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_LIST_MY_PERSONAL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/tasks`, config);

    dispatch({
      type: TASK_LIST_MY_PERSONAL_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_LIST_MY_PERSONAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyCollabTasks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_GET_COLLAB_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${URL[0]}api/tasks/collab/64b4c81fa387a895b208e778`,
      config
    );

    dispatch({
      type: TASK_GET_COLLAB_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_GET_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
