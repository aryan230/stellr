import {
  STATE_ADD_ITEM,
  STATE_REMOVE_ITEM,
  STATE_RESET,
} from "../constants/stateConstants";

export const stateReducer = (state = { stateDetails: [] }, action) => {
  switch (action.type) {
    case STATE_ADD_ITEM:
      const tab = action.payload;
      return {
        stateDetails: action.payload,
      };
    //   const existTab = state.tabDetails.find((x) => x.doc._id == tab.doc._id);
    //   if (existTab) {
    //     return {
    //       ...state,
    //       tabDetails: [...state.tabDetails],
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       tabDetails: [...state.tabDetails, tab],
    //     };
    //   }
    case STATE_REMOVE_ITEM:
      return {
        ...state,
        stateDetails: state.stateDetails.filter(
          (x) => x.doc._id !== action.payload
        ),
      };
    case STATE_RESET:
      return { ...state, stateDetails: [] };
    default:
      return state;
  }
};
