import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import { Helmet } from "react-helmet";

function AccountSetup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { sucess, loading: userUpdateLoading } = userUpdateProfile;

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile({ name }));
    await dispatch({ type: USER_UPDATE_PROFILE_RESET });
  };
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorLoadingDetails,
    sucess: sucessLoadingDetails,
    user,
  } = userDetails;

  useEffect(() => {
    if (user.name) {
      navigate(`/`);
    }
    if (sucess) {
      dispatch(getUserDetails("profile"));
    }
  }, [userInfo, sucess, user]);
  return (
    <div className="main-account-settings">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Account | Bio-Pharma ELN System</title>
        <meta
          name="description"
          content="Stellr ELN: Capture, organize, and collaborate. Streamline lab tasks, data entry, and team communication for efficient biotech R&D. Try Now!"
        />
      </Helmet>
      <div className="first-time-modal">
        <div className="first-time-modal-inside">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M41.6663 43.75V39.5833C41.6663 37.3732 40.7884 35.2536 39.2256 33.6908C37.6628 32.128 35.5431 31.25 33.333 31.25H16.6663C14.4562 31.25 12.3366 32.128 10.7738 33.6908C9.21098 35.2536 8.33301 37.3732 8.33301 39.5833V43.75"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.0003 22.9167C29.6027 22.9167 33.3337 19.1857 33.3337 14.5833C33.3337 9.98096 29.6027 6.25 25.0003 6.25C20.398 6.25 16.667 9.98096 16.667 14.5833C16.667 19.1857 20.398 22.9167 25.0003 22.9167Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1>Just a few steps to get you onboard stellr.</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSetup;
