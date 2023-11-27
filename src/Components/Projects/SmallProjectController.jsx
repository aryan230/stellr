import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjectDetails } from "../../redux/actions/projectActions";
import { addToState } from "../../redux/actions/stateActions";
import { Folders, Map } from "lucide-react";
import DropdownBasic from "../../UI/Dropdown/DropdownBasic";
import { DotsVerticalIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    // <li
    //   key={order.name}
    //   className="col-span-1 flex shadow-sm rounded-md font-body hover:scale-95 border-b cursor-pointer transition-all duration-300"
    //   onClick={async (e) => {
    //     await dispatch(addToState(`projectList#${order._id}`));
    //     // setWhichTabisActive("projectList");
    //     setProjectInsideActiveId(order._id);
    //     setProjectInsideActive(true);
    //     setProjectListActive(true);
    //   }}
    // >
    //   <div
    //     className={classNames(
    //       "flex-shrink-0 flex items-center justify-center w-12 text-indigo-600 text-sm"
    //     )}
    //   >
    //     <Folders size={15} color="#5D00D2" />
    //   </div>
    //   <div className="flex-1 flex items-center justify-between border-gray-200 bg-white rounded-r-md truncate">
    //     <div className="flex-1 px-1 py-2 text-sm truncate">
    //       <a
    //         href="#"
    //         onClick={(e) => {
    //           e.preventDefault();
    //         }}
    //         className="text-gray-900 hover:text-gray-600"
    //       >
    //         {order.name}
    //       </a>
    //       <p className="text-gray-500">{order.collaborators.length} Members</p>
    //     </div>
    //   </div>
    // </li>

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
        className={`relative shadow-sm flex flex-row items-center min-h-[2.75rem] max-h-fit focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 font-body`}
      >
        <span className="inline-flex justify-center items-center ml-3 w-[10%]">
          <Folders size={15} color="#5D00D2" />
        </span>
        <span className="ml-2 text-sm tracking-wide py-2 w-[70%]">
          {order.name}
        </span>

        {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide rounded-full  w-[20%] text-center">
          Download
        </span> */}
      </a>
    </li>
  );
}

export default SmallProjectController;
