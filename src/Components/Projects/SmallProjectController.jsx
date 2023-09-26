import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjectDetails } from "../../redux/actions/projectActions";
import { addToState } from "../../redux/actions/stateActions";
function SmallProjectController({
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
  const date1 = new Date(order.createdAt);
  const date2 = new Date();

  const timeDifference = date2 - date1;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;

  return (
    <li>
      <a
        href="#"
        onClick={async (e) => {
          await dispatch(addToState(`projectList#${order._id}`));
          // setWhichTabisActive("projectList");
          setProjectInsideActiveId(order._id);
          setProjectInsideActive(true);
          setProjectListActive(true);
        }}
        className="relative flex flex-row items-center min-h-[2.75rem] max-h-fit focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4 w-[10%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M10.66 2.52503L7.66 1.52503H7.625C7.60173 1.52269 7.57828 1.52269 7.555 1.52503H7.44H7.375H7.34L4.5 2.50003L1.66 1.52503C1.58481 1.50023 1.5048 1.49365 1.42657 1.50582C1.34834 1.51799 1.27411 1.54856 1.21 1.59503C1.14538 1.64104 1.09263 1.70176 1.05612 1.77218C1.0196 1.8426 1.00037 1.9207 1 2.00003V9.00003C0.999731 9.10485 1.03241 9.20711 1.09342 9.29234C1.15443 9.37758 1.24069 9.44148 1.34 9.47503L4.34 10.475C4.44073 10.5079 4.54928 10.5079 4.65 10.475V10.475L7.5 9.52503L10.34 10.5C10.3931 10.5072 10.4469 10.5072 10.5 10.5C10.6045 10.5015 10.7066 10.4681 10.79 10.405C10.8546 10.359 10.9074 10.2983 10.9439 10.2279C10.9804 10.1575 10.9996 10.0794 11 10V3.00003C11.0003 2.89521 10.9676 2.79295 10.9066 2.70771C10.8456 2.62248 10.7593 2.55857 10.66 2.52503V2.52503ZM4 9.30503L2 8.64003V2.69503L4 3.36003V9.30503ZM7 8.64003L5 9.30503V3.36003L7 2.69503V8.64003ZM10 9.30503L8 8.64003V2.69503L10 3.36003V9.30503Z"
              fill="url(#paint0_linear_301_380)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_301_380"
                x1="6"
                y1="1.49988"
                x2="6"
                y2="10.5054"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#5D00D2" />
                <stop offset="1" stop-color="#C781FF" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="ml-2 text-sm tracking-wide py-2 w-[70%]">
          {order.name}
        </span>
        {daysDifference < 10 && (
          <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full  w-[20%] text-center">
            new
          </span>
        )}
      </a>
    </li>
  );
}

export default SmallProjectController;
