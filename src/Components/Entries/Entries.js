import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addLogs } from "../Functions/addLogs";
import { addEntryLogs } from "../Functions/addEntryLogs";
import { userRoleExtract } from "../Functions/userRoleFunction";
import { addToState } from "../../redux/actions/stateActions";

function Entries({
  doc,
  projectId,
  setHomeActive,
  setProfileActive,
  setTabId,
  project,
  setProjectListActive,
  setCalendarActive,
  setSampleListActive,
  setWhichTabisActive,
  orgs,
  orgsCollab,
  index,
  entryType,
}) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const [userRole, setUserRole] = useState();
  const findOwner = project && project.user === userInfo._id && "owner";
  const findOrg =
    orgs && orgs.length > 0
      ? orgs[0].collaborators.find((e) => e.user == userInfo._id)
      : orgsCollab && orgsCollab.length > 0
      ? orgsCollab[0].collaborators.find((e) => e.user == userInfo._id)
      : null;
  const find =
    project && project.collaborators.find((e) => e.user == userInfo._id);

  const userType = findOwner
    ? findOwner
    : find
    ? find.userType
    : findOrg
    ? findOrg.userType
    : "no role found";
  const getUserRole = async (userRole) => {
    const newRole = await userRoleExtract(userRole);

    setUserRole(newRole);
  };
  useEffect(() => {
    if (userType) {
      if (!userRole) {
        getUserRole(userType);
      }
    }
  }, [userRole, userType]);

  return (
    <button
      className="sl-element"
      onClick={async (e) => {
        e.preventDefault();
        if (userRole) {
          const logObject = {
            entryId: doc._id,
            user: userInfo._id,
            userName: userInfo.name,
            userEmail: userInfo.email,
            message:
              userRole == "Admin" || userRole == "owner"
                ? `Updated The Entry With Name ${doc.name}  and id ${doc._id}`
                : `Opened The Entry With Name ${doc.name}  and id ${doc._id}`,
          };
          await dispatch(addToState(`tabs#${doc._id}`));
          await addEntryLogs(logObject);
          await dispatch(
            addToCart({
              doc,
              project,
              userType: userRole,
            })
          );
          setTabId(doc._id);
          setWhichTabisActive("tabs");
        }
      }}
    >
      <div className="mnc-element-inside">
        <div className="mnc-element-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.3332 5.95999C13.3262 5.89875 13.3128 5.83842 13.2932 5.77999V5.71999C13.2611 5.65145 13.2184 5.58844 13.1665 5.53333L9.1665 1.53333C9.11139 1.48147 9.04838 1.43872 8.97984 1.40666H8.91984C8.85211 1.36782 8.77732 1.34289 8.69984 1.33333H4.6665C4.13607 1.33333 3.62736 1.54404 3.25229 1.91911C2.87722 2.29419 2.6665 2.8029 2.6665 3.33333V12.6667C2.6665 13.1971 2.87722 13.7058 3.25229 14.0809C3.62736 14.4559 4.13607 14.6667 4.6665 14.6667H11.3332C11.8636 14.6667 12.3723 14.4559 12.7474 14.0809C13.1225 13.7058 13.3332 13.1971 13.3332 12.6667V5.99999C13.3332 5.99999 13.3332 5.99999 13.3332 5.95999ZM9.33317 3.60666L11.0598 5.33333H9.99984C9.82303 5.33333 9.65346 5.26309 9.52843 5.13807C9.40341 5.01304 9.33317 4.84347 9.33317 4.66666V3.60666ZM11.9998 12.6667C11.9998 12.8435 11.9296 13.013 11.8046 13.1381C11.6796 13.2631 11.51 13.3333 11.3332 13.3333H4.6665C4.48969 13.3333 4.32012 13.2631 4.1951 13.1381C4.07008 13.013 3.99984 12.8435 3.99984 12.6667V3.33333C3.99984 3.15652 4.07008 2.98695 4.1951 2.86192C4.32012 2.7369 4.48969 2.66666 4.6665 2.66666H7.99984V4.66666C7.99984 5.19709 8.21055 5.7058 8.58562 6.08087C8.9607 6.45595 9.4694 6.66666 9.99984 6.66666H11.9998V12.6667Z"
              fill="black"
            />
          </svg>
          <p>{doc.name}</p>
        </div>
        <span>ENT-000{index + 1}</span>
        <span>
          {new Date(doc.updatedAt).toLocaleString("en-GB").split(",")[0]},{" "}
          {new Date(doc.updatedAt).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span>
          {new Date(doc.createdAt).toLocaleString("en-GB").split(",")[0]},{" "}
          {new Date(doc.updatedAt).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </button>
  );
}

export default Entries;
