import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import { Box, Drawer, FormControlLabel, Switch } from "@mui/material";
import DrawerProfile from "./DrawerProfile/DrawerProfile";
import { Helmet } from "react-helmet";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [checked, setChecked] = useState(true);
  const label = { inputProps: { "aria-label": "Size switch demo" } };

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorLoadingDetails,
    sucess: sucessLoadingDetails,
    user,
  } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { sucess, loading: userUpdateLoading } = userUpdateProfile;
  console.log(user);

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`);
    } else {
      dispatch(getUserDetails("profile"));
    }
    if (sucess) {
      dispatch(getUserDetails("profile"));
    }
  }, [userInfo, sucess]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(updateUserProfile({ name }));
    await dispatch({ type: USER_UPDATE_PROFILE_RESET });
  };

  return (
    <div className="profile-component">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Account | Bio-Pharma ELN System</title>
        <meta
          name="description"
          content="Access and manage your bio-pharma research data conveniently through your account in the ELN system. Stay in control of your work."
        />
      </Helmet>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerProfile user={user} setIsDrawerOpen={setIsDrawerOpen} />
        </Box>
      </Drawer>
      {user && user.name ? (
        <div className="profile-inside">
          <div className="profile-header">
            <div className="profile-header-left">
              <img
                src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
                alt=""
              />
              <div className="phl-content">
                <h1>{user.name}</h1>
                <a href="">app.getstellr.io/v/{user._id}</a>
              </div>
            </div>
            <div className="profile-header-right">
              {/* <button>Change Password</button> */}
              <button
                onClick={(e) => {
                  setIsDrawerOpen(true);
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="profile-inside-content">
            <h1>Account Details</h1>
            <p>Update your email address and name here</p>
          </div>
          <div className="inside-content-profile">
            <form action="">
              <div className="label-input">
                {" "}
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={user.name}
                  placeholder="Enter a name for your entry"
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled
                />
              </div>
              <div className="label-input">
                {" "}
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  value={user.email}
                  placeholder="Enter a name for your entry"
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled
                />
              </div>
            </form>
          </div>
          <div className="profile-inside-content">
            <h1>Privacy Settings</h1>
            <p>Update your privacy settings here.</p>
          </div>
          <div className="inside-content-profile">
            <form action="">
              <div className="switch-label">
                <h2>
                  Coming Soon
                  {/* <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  /> */}
                </h2>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="profile-inside-setup">
          <div className="profile-setup-inside">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M24.5002 10.5C24.1949 10.8116 24.0238 11.2304 24.0238 11.6667C24.0238 12.1029 24.1949 12.5218 24.5002 12.8333L27.1669 15.5C27.4785 15.8054 27.8973 15.9764 28.3336 15.9764C28.7698 15.9764 29.1887 15.8054 29.5002 15.5L35.7836 9.21667C36.6216 11.0687 36.8754 13.1321 36.511 15.1319C36.1466 17.1318 35.1814 18.9731 33.744 20.4105C32.3067 21.8479 30.4653 22.8131 28.4655 23.1774C26.4656 23.5418 24.4022 23.2881 22.5502 22.45L11.0336 33.9667C10.3705 34.6297 9.47126 35.0022 8.53358 35.0022C7.5959 35.0022 6.69662 34.6297 6.03358 33.9667C5.37054 33.3036 4.99805 32.4044 4.99805 31.4667C4.99805 30.529 5.37054 29.6297 6.03358 28.9667L17.5502 17.45C16.7122 15.598 16.4584 13.5346 16.8228 11.5348C17.1872 9.53491 18.1524 7.6936 19.5898 6.25621C21.0272 4.81882 22.8685 3.85362 24.8683 3.48924C26.8682 3.12487 28.9316 3.37861 30.7836 4.21667L24.5169 10.4833L24.5002 10.5Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h1>Setup your account.</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
