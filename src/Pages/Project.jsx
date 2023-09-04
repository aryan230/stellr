import React, { useEffect } from "react";
import ProjectComp from "../Components/Project/ProjectComp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Project() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { id } = useParams();
  const { userInfo } = userLogin;
  console.log(id);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);
  return <ProjectComp id={id} />;
}

export default Project;
