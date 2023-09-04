import axios from "axios";
import URL from "./../../Data/data.json";
import {
  ORG_CREATE_FAIL,
  ORG_CREATE_REQUEST,
  ORG_CREATE_SUCESS,
  ORG_GET_COLLAB_FAIL,
  ORG_GET_COLLAB_REQUEST,
  ORG_GET_COLLAB_SUCESS,
  ORG_LIST_MY_FAIL,
  ORG_LIST_MY_REQUEST,
  ORG_LIST_MY_SUCESS,
} from "../constants/organizationConstants";

export const createOrg = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORG_CREATE_REQUEST,
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
    const { data } = await axios.post(`${URL[0]}api/organs`, project, config);

    dispatch({
      type: ORG_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrgs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORG_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/organs/myorgs`, config);

    dispatch({
      type: ORG_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORG_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyCollabOrgs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORG_GET_COLLAB_REQUEST,
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
      `${URL[0]}api/organs/collab/64b4c81fa387a895b208e778`,
      config
    );

    dispatch({
      type: ORG_GET_COLLAB_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORG_GET_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
