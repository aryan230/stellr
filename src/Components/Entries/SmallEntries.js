import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addLogs } from "../Functions/addLogs";
import { addEntryLogs } from "../Functions/addEntryLogs";
import { userRoleExtract } from "../Functions/userRoleFunction";
import { addToState } from "../../redux/actions/stateActions";
import {
  BadgeCheck,
  Book,
  File,
  FileSpreadsheet,
  FileText,
  Lock,
  Settings,
  Settings2,
  SlidersHorizontal,
  Table2,
} from "lucide-react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
  setSpreadsheetData,
  setIsSpreadSheetOpen,
}) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          if (doc.type === "Lab Sheet") {
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
              await addEntryLogs(logObject);
              setSpreadsheetData({
                id: doc._id,
                name: doc.name,
              });
              setIsSpreadSheetOpen(true);
            }
          } else {
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
          }
        }}
        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4">
          {doc.type === "Lab Sheet" ? (
            <Table2 size={16} color="#0f9d58" strokeWidth={1.5} />
          ) : (
            <FileText size={16} color="#2563eb" strokeWidth={1.5} />
          )}
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">{doc.name}</span>

        {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide rounded-full">
          <SlidersHorizontal size={16} color="#5e00d1" />
        </span> */}
      </a>
    </li>
  );
}

export default SmallEntries;
