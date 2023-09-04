import React, { useEffect, useState } from "react";
import EditorComponent from "../Components/EditorComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../redux/actions/userActions";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../redux/actions/organizationActions";
import axios from "axios";
import URL from "./../Data/data.json";

function Editor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [newAccountName, setNewAccountName] = useState();
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorLoadingDetails,
    sucess: sucessLoadingDetails,
    user,
  } = userDetails;

  const orgListMy = useSelector((state) => state.orgListMy);
  const { loading: loading, error: error, sucess: sucess, orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (sucessLoadingDetails) {
        if (!user.name) {
          navigate("/account/setup");
        } else {
          if (sucess && sucessCollab) {
            console.log(orgs);
            if (orgs.length === 0 && orgsCollab.length === 0) {
              navigate("/organization/setup");
            }
          }
        }
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    sucessLoadingDetails,
    sucess,
    sucessCollab,
  ]);

  useEffect(() => {
    dispatch(listMyOrgs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);
  useEffect(() => {
    dispatch(listMyCollabOrgs());
  }, [dispatch]);

  useEffect(() => {
    var data = JSON.stringify({
      date: 1234,
    });

    var config = {
      method: "post",
      url: `${URL[0]}api/users/status`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return <EditorComponent />;
}

export default Editor;
