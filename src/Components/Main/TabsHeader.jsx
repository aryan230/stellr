import React from "react";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

function TabsHeader({ tab, active, setTabId, removeTab }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { tabDetails } = cart;

  const removeTabPannel = async () => {
    await dispatch(removeFromCart(tab._id));
    const newTab = tabDetails.filter((x) => x.doc._id !== tab._id);
    if (newTab.length > 0) {
      setTabId(newTab[0].doc._id);
    }
  };
  return (
    <button
      className={`tab-header-element ${active && "active"}`}
      onClick={(e) => {
        setTabId(tab._id);

        // localStorage.setItem("tab", tab.id);
        // localStorage.setItem("project", tab.projectId);
      }}
    >
      <h3>{tab.name}.stellr</h3>
      <svg
        onClick={() => {
          removeTabPannel();
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
      >
        <path
          d="M14.1424 7.54245L11.314 10.3709L8.48553 7.54245C8.36051 7.41743 8.19094 7.34719 8.01413 7.34719C7.83731 7.34719 7.66774 7.41743 7.54272 7.54245C7.4177 7.66748 7.34746 7.83705 7.34746 8.01386C7.34746 8.19067 7.4177 8.36024 7.54272 8.48526L10.3711 11.3137L7.54272 14.1421C7.4177 14.2671 7.34746 14.4367 7.34746 14.6135C7.34746 14.7903 7.4177 14.9599 7.54272 15.0849C7.66774 15.21 7.83731 15.2802 8.01413 15.2802C8.19094 15.2802 8.36051 15.21 8.48553 15.0849L11.314 12.2565L14.1424 15.0849C14.2674 15.21 14.437 15.2802 14.6138 15.2802C14.7906 15.2802 14.9602 15.21 15.0852 15.0849C15.2102 14.9599 15.2805 14.7903 15.2805 14.6135C15.2805 14.4367 15.2102 14.2671 15.0852 14.1421L12.2568 11.3137L15.0852 8.48526C15.2102 8.36024 15.2805 8.19067 15.2805 8.01386C15.2805 7.83705 15.2102 7.66748 15.0852 7.54245C14.9602 7.41743 14.7906 7.34719 14.6138 7.34719C14.437 7.34719 14.2674 7.41743 14.1424 7.54245Z"
          fill="#8F8585"
        />
      </svg>
    </button>
  );
}

export default TabsHeader;
