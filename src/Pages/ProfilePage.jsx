import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  updateUserName,
  updateUserProfile,
} from "../redux/actions/userActions";
import {
  USER_NAME_UPDATE,
  USER_UPDATE_PROFILE_RESET,
} from "../redux/constants/userConstants";
import { Box, Drawer, FormControlLabel, Switch } from "@mui/material";
import DrawerProfile from "./DrawerProfile/DrawerProfile";
import { Helmet } from "react-helmet";
import NewProfilePage from "./NewProfile";
import ChangePassword from "./Modals/ChangePassword";
import toast, { Toaster } from "react-hot-toast";
import ContactAdmin from "./Modals/ContactAdmin";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [name, setName] = useState();
  const [nameInside, setNameInside] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [title, setTitle] = useState(user && user.title);
  const [company, setCompany] = useState(user && user.company);
  const [loader, setLoader] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [contactAdmin, setContactAdmin] = useState(false);
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

  const submitHandlerProfile = async (e) => {
    e.preventDefault();
    setLoader(true);
    await dispatch(updateUserProfile({ name: nameInside, title, company }));
    await dispatch({ type: USER_UPDATE_PROFILE_RESET });
    toast.success("Updated Sucessfully");
    setIsDrawerOpen(false);
    setLoader(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile({ name }));
    await dispatch({ type: USER_UPDATE_PROFILE_RESET });
  };

  console.log(userInfo);
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
        loadingUserDetails ? (
          <div className="loader-div-main-stellr">
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="profile-inside">
            {changePasswordModal && (
              <ChangePassword setChangePasswordModal={setChangePasswordModal} />
            )}
            {contactAdmin && <ContactAdmin setContactAdmin={setContactAdmin} />}
            <Toaster position="top-center" reverseOrder={true} />
            <div className="flex-1 xl:overflow-y-auto h-[100%] w-full">
              <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                <h1 className="text-3xl font-extrabold text-indigo-800">
                  Account
                </h1>

                <form
                  className="mt-6 space-y-8 divide-y divide-y-blue-gray-200"
                  onSubmit={submitHandlerProfile}
                >
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6">
                      <h2 className="text-xl font-medium text-blue-gray-900">
                        Profile
                      </h2>
                      <p className="mt-1 text-sm text-blue-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>
                    <div className="sm:col-span-6">
                      <div className="mt-1 flex items-center">
                        <img
                          className="inline-block h-12 w-12 rounded-full"
                          src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div className="">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="default-input"
                          value={nameInside}
                          onChange={(e) => {
                            setNameInside(e.target.value);
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div className="">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          disabled
                          value={email}
                          id="default-input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div className="">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Title/Role
                        </label>
                        <input
                          type="text"
                          id="default-input"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div className="">
                        <label
                          htmlFor="default-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="default-input"
                          value={company}
                          onChange={(e) => {
                            setCompany(e.target.value);
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                    </div>

                    {/* <div className="sm:col-span-6">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-blue-gray-300 bg-blue-gray-50 text-blue-gray-500 sm:text-sm">
                        getstellr.io/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        defaultValue="lisamarie"
                        className="flex-1 block w-full min-w-0 border-blue-gray-300 rounded-none rounded-r-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div> */}

                    {/* <div className="sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="block w-full border border-blue-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-3 text-sm text-blue-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-blue-gray-900"
                    >
                      URL
                    </label>
                    <input
                      type="text"
                      name="url"
                      id="url"
                      className="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div> */}
                  </div>

                  <div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6">
                      <h2 className="text-xl font-medium text-blue-gray-900">
                        Security Information
                      </h2>
                      <p className="mt-1 text-sm text-blue-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    {user && user.password && (
                      <div className="sm:col-span-6">
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setChangePasswordModal(true);
                          }}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Change Password
                        </a>
                      </div>
                    )}

                    <div className="sm:col-span-6">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setContactAdmin(true);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Change Email
                      </a>
                    </div>
                    <div className="sm:col-span-6">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setContactAdmin(true);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Set Recovery Email
                      </a>
                    </div>
                    <p className="text-sm text-blue-gray-500 sm:col-span-6">
                      This account was created on{" "}
                      {new Date(user.createdAt).toDateString()} at{" "}
                      {new Date(user.createdAt).toTimeString()}.
                    </p>
                  </div>

                  <div className="pt-8 flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="profile-content-scrollbar">
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
                    
                  </h2>
                </div>
              </form>
            </div>
          </div> */}
          </div>
        )
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
