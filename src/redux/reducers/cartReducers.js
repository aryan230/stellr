import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_SHIPPING_ADRESS,
  CART_RESET,
  CART_SAVE_SHIPPING_ADRESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { tabDetails: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const tab = action.payload;
      console.log(state.tabDetails);
      // const existTab = state.tabDetails.find((x) => x.doc._id == tab.doc._id);
      return {
        tabDetails: [tab],
      };
    // if (existTab) {
    //   return {
    //     ...state,
    //     tabDetails: [...state.tabDetails],
    //   };
    // } else {
    //   return {
    //     ...state,
    //     tabDetails: [...state.tabDetails, tab],
    //   };
    // }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        tabDetails: state.tabDetails.filter(
          (x) => x.doc._id !== action.payload
        ),
      };
    case CART_RESET:
      return { ...state, tabDetails: [] };
    default:
      return state;
  }
};
