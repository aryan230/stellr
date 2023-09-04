import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Output from "editorjs-react-renderer";

const UndisclosedEditor = ({ tab, active, project, userType }) => {
  const dispatch = useDispatch();
  const [data, setBlockValue] = useState({
    time: new Date().getTime(),
    blocks: tab.block,
  });

  return (
    <div className={`editor-holder-reactjs ${active && "active"} undisclosed`}>
      <div className="undisclosed-top-level-button">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_221_208)">
              <path
                d="M0.666016 7.99996C0.666016 7.99996 3.33268 2.66663 7.99935 2.66663C12.666 2.66663 15.3327 7.99996 15.3327 7.99996C15.3327 7.99996 12.666 13.3333 7.99935 13.3333C3.33268 13.3333 0.666016 7.99996 0.666016 7.99996Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_221_208">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          View Only
        </button>
      </div>
      <Output data={data} />
    </div>
  );
};

// Return the CustomEditor to use by other components.

export default UndisclosedEditor;
