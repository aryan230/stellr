import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addLogs } from "../Functions/addLogs";
import { addEntryLogs } from "../Functions/addEntryLogs";
import { userRoleExtract } from "../Functions/userRoleFunction";
import { addToState } from "../../redux/actions/stateActions";
function SmallEntries({
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
    <li>
      <a
        href="#"
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
        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.3337 5.96004C13.3267 5.8988 13.3133 5.83846 13.2937 5.78004V5.72004C13.2616 5.65149 13.2188 5.58848 13.167 5.53337L9.16699 1.53337C9.11188 1.48152 9.04887 1.43876 8.98033 1.40671H8.92033C8.8526 1.36787 8.77781 1.34294 8.70033 1.33337H4.66699C4.13656 1.33337 3.62785 1.54409 3.25278 1.91916C2.87771 2.29423 2.66699 2.80294 2.66699 3.33337V12.6667C2.66699 13.1971 2.87771 13.7058 3.25278 14.0809C3.62785 14.456 4.13656 14.6667 4.66699 14.6667H11.3337C11.8641 14.6667 12.3728 14.456 12.7479 14.0809C13.1229 13.7058 13.3337 13.1971 13.3337 12.6667V6.00004C13.3337 6.00004 13.3337 6.00004 13.3337 5.96004ZM9.33366 3.60671L11.0603 5.33337H10.0003C9.82351 5.33337 9.65395 5.26314 9.52892 5.13811C9.4039 5.01309 9.33366 4.84352 9.33366 4.66671V3.60671ZM12.0003 12.6667C12.0003 12.8435 11.9301 13.0131 11.8051 13.1381C11.68 13.2631 11.5105 13.3334 11.3337 13.3334H4.66699C4.49018 13.3334 4.32061 13.2631 4.19559 13.1381C4.07056 13.0131 4.00033 12.8435 4.00033 12.6667V3.33337C4.00033 3.15656 4.07056 2.98699 4.19559 2.86197C4.32061 2.73695 4.49018 2.66671 4.66699 2.66671H8.00033V4.66671C8.00033 5.19714 8.21104 5.70585 8.58611 6.08092C8.96118 6.45599 9.46989 6.66671 10.0003 6.66671H12.0003V12.6667Z"
              fill="black"
            />
          </svg>
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">{doc.name}</span>
        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
          New
        </span>
      </a>
    </li>
  );
}

export default SmallEntries;
