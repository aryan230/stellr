import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectProfile } from "../../redux/actions/projectActions";
import { PROJECT_UPDATE_PROFILE_RESET } from "../../redux/constants/projectConstants";
import { addProjectLogs } from "../Functions/addProjectLogs";

function DrawerEditProject({
  project,
  setIsDrawerOpen,
  setProjectUpdatedProfilers,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(project.name);
  const [des, setDes] = useState(project.description);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectUpdateProfile = useSelector(
    (state) => state.projectUpdateProfile
  );
  const { project: projectUpdated, sucess } = projectUpdateProfile;

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      updateProjectProfile(project._id, {
        id: project._id,
        name,
        description: des,
      })
    );
    console.log(userInfo);
    const logObject = {
      entryId: project._id,
      user: userInfo._id,
      userName: userInfo.name,
      userEmail: userInfo.email,
      message:
        project.name != name && project.description != des
          ? `Updated the name and description of the project.`
          : project.name != name
          ? `Updated the name of the project`
          : project.description != des
          ? `Updated the description of the project`
          : `Updated the project`,
    };
    await addProjectLogs(logObject);
    await dispatch({ type: PROJECT_UPDATE_PROFILE_RESET });
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (sucess) {
      setProjectUpdatedProfilers(true);
    }
  }, [sucess]);
  return (
    <div className="drawer-info">
      <div className="drawer-info-inside">
        <div className="drawer-info-top">
          <div className="topper-drawer-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M7.00065 6.33331C6.82384 6.33331 6.65427 6.40355 6.52925 6.52857C6.40423 6.6536 6.33399 6.82317 6.33399 6.99998V9.66665C6.33399 9.84346 6.40423 10.013 6.52925 10.1381C6.65427 10.2631 6.82384 10.3333 7.00065 10.3333C7.17747 10.3333 7.34703 10.2631 7.47206 10.1381C7.59708 10.013 7.66732 9.84346 7.66732 9.66665V6.99998C7.66732 6.82317 7.59708 6.6536 7.47206 6.52857C7.34703 6.40355 7.17747 6.33331 7.00065 6.33331ZM7.25399 3.71998C7.09168 3.6533 6.90963 3.6533 6.74732 3.71998C6.66549 3.75171 6.59072 3.79929 6.52732 3.85998C6.46843 3.92478 6.42108 3.99919 6.38732 4.07998C6.35 4.1591 6.33173 4.24586 6.33399 4.33331C6.33348 4.42105 6.3503 4.50803 6.38347 4.58925C6.41665 4.67048 6.46553 4.74435 6.52732 4.80665C6.59212 4.86553 6.66653 4.91288 6.74732 4.94665C6.84832 4.98814 6.95796 5.00419 7.06662 4.99339C7.17527 4.98258 7.27961 4.94526 7.37046 4.88469C7.46131 4.82412 7.5359 4.74217 7.58766 4.64603C7.63942 4.54989 7.66678 4.4425 7.66732 4.33331C7.66487 4.1568 7.59581 3.98774 7.47399 3.85998C7.41059 3.79929 7.33582 3.75171 7.25399 3.71998ZM7.00065 0.333313C5.68211 0.333313 4.39318 0.724306 3.29685 1.45685C2.20052 2.18939 1.34604 3.23058 0.841457 4.44876C0.336873 5.66693 0.204851 7.00737 0.462086 8.30058C0.71932 9.59379 1.35426 10.7817 2.28661 11.714C3.21896 12.6464 4.40685 13.2813 5.70005 13.5385C6.99326 13.7958 8.3337 13.6638 9.55188 13.1592C10.7701 12.6546 11.8112 11.8001 12.5438 10.7038C13.2763 9.60745 13.6673 8.31852 13.6673 6.99998C13.6673 6.1245 13.4949 5.25759 13.1599 4.44876C12.8248 3.63992 12.3338 2.90499 11.7147 2.28593C11.0956 1.66688 10.3607 1.17581 9.55188 0.840783C8.74304 0.505751 7.87613 0.333313 7.00065 0.333313V0.333313ZM7.00065 12.3333C5.94582 12.3333 4.91467 12.0205 4.03761 11.4345C3.16055 10.8484 2.47696 10.0155 2.0733 9.04096C1.66963 8.06642 1.56401 6.99406 1.7698 5.9595C1.97559 4.92493 2.48354 3.97462 3.22942 3.22874C3.9753 2.48286 4.92561 1.97491 5.96017 1.76912C6.99474 1.56334 8.06709 1.66895 9.04163 2.07262C10.0162 2.47629 10.8491 3.15988 11.4352 4.03694C12.0212 4.914 12.334 5.94515 12.334 6.99998C12.334 8.41447 11.7721 9.77102 10.7719 10.7712C9.7717 11.7714 8.41514 12.3333 7.00065 12.3333V12.3333Z"
                fill="black"
              />
            </svg>
            <h2>Edit Project</h2>
          </div>
          <form onSubmit={submitHandler}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter a name for your entry"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="margin-maker"></div>
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={des}
              placeholder="Enter a name for your entry"
              onChange={(e) => setDes(e.target.value)}
            />
            <button className="delete" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.8067 6.19333L9.80667 2.19333C9.74523 2.13337 9.6728 2.08583 9.59333 2.05333C9.51068 2.01974 9.42254 2.00167 9.33333 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V6.66667C14.0005 6.57893 13.9837 6.49195 13.9505 6.41073C13.9173 6.3295 13.8685 6.25563 13.8067 6.19333ZM6 3.33333H8.66667V4.66667H6V3.33333ZM10 12.6667H6V10.6667C6 10.4899 6.07024 10.3203 6.19526 10.1953C6.32029 10.0702 6.48986 10 6.66667 10H9.33333C9.51014 10 9.67971 10.0702 9.80474 10.1953C9.92976 10.3203 10 10.4899 10 10.6667V12.6667ZM12.6667 12C12.6667 12.1768 12.5964 12.3464 12.4714 12.4714C12.3464 12.5964 12.1768 12.6667 12 12.6667H11.3333V10.6667C11.3333 10.1362 11.1226 9.62753 10.7475 9.25245C10.3725 8.87738 9.86377 8.66667 9.33333 8.66667H6.66667C6.13623 8.66667 5.62753 8.87738 5.25245 9.25245C4.87738 9.62753 4.66667 10.1362 4.66667 10.6667V12.6667H4C3.82319 12.6667 3.65362 12.5964 3.5286 12.4714C3.40357 12.3464 3.33333 12.1768 3.33333 12V4C3.33333 3.82319 3.40357 3.65362 3.5286 3.5286C3.65362 3.40357 3.82319 3.33333 4 3.33333H4.66667V5.33333C4.66667 5.51014 4.7369 5.67971 4.86193 5.80474C4.98695 5.92976 5.15652 6 5.33333 6H9.33333C9.51014 6 9.67971 5.92976 9.80474 5.80474C9.92976 5.67971 10 5.51014 10 5.33333V4.27333L12.6667 6.94V12Z"
                  fill="white"
                />
              </svg>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DrawerEditProject;
