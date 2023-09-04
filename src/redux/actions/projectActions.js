import axios from "axios";
import {
  PROJECT_CREATE_COLLAB_REQUEST,
  PROJECT_CREATE_COLLAB_SUCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCESS,
  PROJECT_GET_COLLAB_FAIL,
  PROJECT_GET_COLLAB_REQUEST,
  PROJECT_GET_COLLAB_SUCESS,
  PROJECT_GET_ORG_FAIL,
  PROJECT_GET_ORG_REQUEST,
  PROJECT_GET_ORG_SUCESS,
  PROJECT_LIST_MY_FAIL,
  PROJECT_LIST_MY_REQUEST,
  PROJECT_LIST_MY_SUCESS,
  PROJECT_UPDATE_COLLAB_FAIL,
  PROJECT_UPDATE_COLLAB_REQUEST,
  PROJECT_UPDATE_COLLAB_SUCESS,
  PROJECT_UPDATE_PROFILE_FAIL,
  PROJECT_UPDATE_PROFILE_REQUEST,
  PROJECT_UPDATE_PROFILE_SUCESS,
} from "../constants/projectConstants";
import URL from "./../../Data/data.json";

export const createProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_CREATE_REQUEST,
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
    const { data } = await axios.post(`${URL[0]}api/projects`, project, config);

    dispatch({
      type: PROJECT_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCollabProject = (inputData) => async (
  dispatch,
  getState
) => {
  console.log(inputData);
  try {
    dispatch({
      type: PROJECT_CREATE_COLLAB_REQUEST,
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
    const { data } = await axios.post(
      `${URL[0]}api/projects/collab`,
      inputData,
      config
    );

    dispatch({
      type: PROJECT_CREATE_COLLAB_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCollabProject = (inputData) => async (
  dispatch,
  getState
) => {
  console.log(inputData);
  try {
    dispatch({
      type: PROJECT_UPDATE_COLLAB_REQUEST,
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
    const { data } = await axios.post(
      `${URL[0]}api/projects/collab/update`,
      inputData,
      config
    );

    dispatch({
      type: PROJECT_UPDATE_COLLAB_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_LIST_MY_REQUEST,
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
      `${URL[0]}api/projects/myprojects`,
      config
    );

    dispatch({
      type: PROJECT_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProjectProfile = (id, project) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${URL[0]}api/projects/${id}`,
      project,
      config
    );

    dispatch({
      type: PROJECT_UPDATE_PROFILE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyCollabProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_GET_COLLAB_REQUEST,
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
      `${URL[0]}api/projects/collab/64b4c81fa387a895b208e778`,
      config
    );

    dispatch({
      type: PROJECT_GET_COLLAB_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_GET_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrgProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_GET_ORG_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/projects/org/234`, config);

    dispatch({
      type: PROJECT_GET_ORG_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_GET_ORG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProjectDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/projects/${id}`, config);

    dispatch({
      type: PROJECT_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
