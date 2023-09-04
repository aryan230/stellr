import {
  ENTRY_TEMPLATE_CREATE_FAIL,
  ENTRY_TEMPLATE_CREATE_REQUEST,
  ENTRY_TEMPLATE_CREATE_SUCESS,
  ENTRY_TEMPLATE_LIST_MY_FAIL,
  ENTRY_TEMPLATE_LIST_MY_REQUEST,
  ENTRY_TEMPLATE_LIST_MY_SUCESS,
} from "../constants/entryTemplateConstants";
import URL from "./../../Data/data.json";
import axios from "axios";
export const createEntryTemplate = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENTRY_TEMPLATE_CREATE_REQUEST,
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
      `${URL[0]}api/entry/templates`,
      project,
      config
    );

    dispatch({
      type: ENTRY_TEMPLATE_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTRY_TEMPLATE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyTemplates = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENTRY_TEMPLATE_LIST_MY_REQUEST,
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
      `${URL[0]}api/entry/templates/mytemplates`,
      config
    );

    dispatch({
      type: ENTRY_TEMPLATE_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTRY_TEMPLATE_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
