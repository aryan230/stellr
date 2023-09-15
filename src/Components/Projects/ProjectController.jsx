import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjectDetails } from "../../redux/actions/projectActions";
import { addToState } from "../../redux/actions/stateActions";

function ProjectController({
  order,
  setMiddleNav,
  setId,
  type,
  setProjectListActive,
  setSampleListActive,
  setProjectInsideActive,
  setProjectInsideActiveId,
  setWhichTabisActive,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;
  return (
    <button
      className="sl-element"
      onClick={async (e) => {
        await dispatch(addToState(`projectList#${order._id}`));
        setWhichTabisActive("projectList");
        setProjectInsideActiveId(order._id);
        setProjectInsideActive(true);
        setProjectListActive(true);
      }}
    >
      <div className="mnc-element-inside">
        <div className="mnc-element-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M14.213 3.36662L10.213 2.03329H10.1663C10.1353 2.03017 10.104 2.03017 10.073 2.03329H9.91968H9.83301H9.78634L5.99968 3.33329L2.21301 2.03329C2.11275 2.00023 2.00608 1.99145 1.90177 2.00768C1.79745 2.0239 1.69849 2.06467 1.61301 2.12662C1.52685 2.18797 1.45652 2.26893 1.40783 2.36283C1.35915 2.45672 1.3335 2.56086 1.33301 2.66662V12C1.33265 12.1397 1.37622 12.2761 1.45757 12.3897C1.53892 12.5034 1.65393 12.5886 1.78634 12.6333L5.78634 13.9666C5.92064 14.0104 6.06538 14.0104 6.19968 13.9666V13.9666L9.99968 12.7L13.7863 14C13.8571 14.0096 13.9289 14.0096 13.9997 14C14.1391 14.0019 14.2751 13.9573 14.3863 13.8733C14.4725 13.8119 14.5428 13.731 14.5915 13.6371C14.6402 13.5432 14.6659 13.4391 14.6663 13.3333V3.99996C14.6667 3.86019 14.6231 3.72385 14.5418 3.6102C14.4604 3.49655 14.3454 3.41135 14.213 3.36662V3.36662ZM5.33301 12.4066L2.66634 11.52V3.59329L5.33301 4.47996V12.4066ZM9.33301 11.52L6.66634 12.4066V4.47996L9.33301 3.59329V11.52ZM13.333 12.4066L10.6663 11.52V3.59329L13.333 4.47996V12.4066Z"
              fill="url(#paint0_linear_200_344)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_200_344"
                x1="7.99968"
                y1="1.99976"
                x2="7.99968"
                y2="14.0072"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#5D00D2" />
                <stop offset="1" stop-color="#C781FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="entity-name-right">
            <p>{order.name}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ProjectController;
