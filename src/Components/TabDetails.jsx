import React from "react";
import TextEditor from "./Editor/QuillEditor";
import TextEditorRead from "./Editor/QuillEditorRead";

function TabDetails({
  tab,
  tabID,
  setProjectSettings,
  setNewCollab,
  setProjectUpdatedProfilers,
  setUpdatedUserCollabRole,
  setEntryUpdate,
  setWhichTabisActive,
}) {
  tab.userType === "Admin" ||
  tab.userType === "Write" ||
  tab.userType === "owner" ? (
    <div className={`editor-checker`} key={tab.id}>
      <TextEditor
        tab={tab.doc}
        active={tab.doc._id == tabID ? true : false}
        project={tab.project}
        userType={tab.userType}
        setProjectSettings={setProjectSettings}
        setNewCollab={setNewCollab}
        setProjectUpdatedProfilers={setProjectUpdatedProfilers}
        setUpdatedUserCollabRole={setUpdatedUserCollabRole}
        setEntryUpdate={setEntryUpdate}
        setWhichTabisActive={setWhichTabisActive}
      />
    </div>
  ) : (
    <div className={`editor-checker`} key={tab.id}>
      <TextEditorRead
        tab={tab.doc}
        active={tab.doc._id == tabID ? true : false}
        project={tab.project}
        userType={tab.userType}
      />
    </div>
  );
}

// tab.userType === "Admin" ||
// tab.userType === "Write" ||
// tab.userType === "owner" ? (
//   <div className={`editor-checker`} key={tab.id}>
//     <TextEditor
//       tab={tab.doc}
//       active={tab.doc._id == tabID ? true : false}
//       project={tab.project}
//       userType={tab.userType}
//       setProjectSettings={setProjectSettings}
//       setNewCollab={setNewCollab}
//       setProjectUpdatedProfilers={
//         setProjectUpdatedProfilers
//       }
//       setUpdatedUserCollabRole={setUpdatedUserCollabRole}
//       setEntryUpdate={setEntryUpdate}
//       setWhichTabisActive={setWhichTabisActive}
//     />
//   </div>
// ) : (
//   <div className={`editor-checker`} key={tab.id}>
//     <TextEditorRead
//       tab={tab.doc}
//       active={tab.doc._id == tabID ? true : false}
//       project={tab.project}
//       userType={tab.userType}
//     />
//   </div>
// )
export default TabDetails;
