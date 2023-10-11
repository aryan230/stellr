import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjectDetails } from "../../redux/actions/projectActions";
import { addToState } from "../../redux/actions/stateActions";
import { Folders, Map } from "lucide-react";
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
          <Folders size={16} color="#5D00D2" />
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
