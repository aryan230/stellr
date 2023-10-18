import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addLogs } from "../Functions/addLogs";
import { addEntryLogs } from "../Functions/addEntryLogs";
import { userRoleExtract } from "../Functions/userRoleFunction";
import { addToState } from "../../redux/actions/stateActions";
import { FileText, Table2 } from "lucide-react";

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
  setSpreadsheetData,
  setIsSpreadSheetOpen,
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
    >
      <div className="mnc-element-inside">
        <div className="mnc-element-left">
          {doc.type === "Lab Sheet" ? (
            <Table2 size={16} color="#0f9d58" />
          ) : (
            <FileText size={16} color="#2563eb" />
          )}
          <p>{doc.name}</p>
        </div>
        <span>ENT-{String(index + 1).padStart(4, "0")}</span>
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
