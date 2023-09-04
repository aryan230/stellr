import {
  ENTRY_TEMPLATE_CREATE_FAIL,
  ENTRY_TEMPLATE_CREATE_REQUEST,
  ENTRY_TEMPLATE_CREATE_RESET,
  ENTRY_TEMPLATE_CREATE_SUCESS,
  ENTRY_TEMPLATE_LIST_MY_FAIL,
  ENTRY_TEMPLATE_LIST_MY_REQUEST,
  ENTRY_TEMPLATE_LIST_MY_RESET,
  ENTRY_TEMPLATE_LIST_MY_SUCESS,
} from "../constants/entryTemplateConstants";

export const entryTemplateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRY_TEMPLATE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ENTRY_TEMPLATE_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        template: action.payload,
      };
    case ENTRY_TEMPLATE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ENTRY_TEMPLATE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const entryTemplatesListMyReducer = (
  state = { templates: [] },
  action
) => {
  switch (action.type) {
    case ENTRY_TEMPLATE_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ENTRY_TEMPLATE_LIST_MY_SUCESS:
      return {
        loading: false,
        templates: action.payload,
      };
    case ENTRY_TEMPLATE_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ENTRY_TEMPLATE_LIST_MY_RESET:
      return {
        templates: [],
      };
    default:
      return state;
  }
};
