import React, { useEffect, useRef, useState } from "react";
import SideNav from "../SideNav";
import MiddleNav from "../MiddleNav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjectDetails } from "../../redux/actions/projectActions";

function ProjectComp({ id }) {
  const [middleNav, setMiddleNav] = useState(false);
  const mainDiv = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (middleNav) {
      mainDiv.current.style.width = "80%";
    } else {
      mainDiv.current.style.width = "100%";
    }
  }, [middleNav]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!project) {
      dispatch(getProjectDetails(id));
    }
  }, [dispatch, project]);
  return (
    <div className="main-container">
      <SideNav setMiddleNav={setMiddleNav} />
      <div className="main-content">
        <MiddleNav project={project && project} />
        <div className="main-structure" ref={mainDiv}>
          <div className="main-inside">
            {/* <h1>No Projects to show here.</h1>
        <a href="">Create new project</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectComp;
