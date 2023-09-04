import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { listMyTemplates } from "../../redux/actions/entryTemplatesActions";
import { createEntry } from "../../redux/actions/entryActions";
import { ENTRY_CREATE_RESET } from "../../redux/constants/entryConstants";
import { addToCart } from "../../redux/actions/cartActions";
import { addEntryLogs } from "../Functions/addEntryLogs";
import { userRoleExtract } from "../Functions/userRoleFunction";
import _ from "lodash";
function CreateEntry({
  setEntryModal,
  projects,
  setMiddleNav,
  setId,
  projectsCollab,
  setWhichTabisActive,
  setTabId,
  setNewEntry,
  selectedProjectNow,
  projectsOrg,
  orgs,
  orgsCollab,
}) {
  let arr = [];
  if (projectsCollab && projectsCollab.length > 0) {
    projectsCollab.map((proj) => {
      if (proj.collaborators.find((o) => o.userType == "Admin")) {
        arr.push(proj);
      }
    });
  }
  const [mainRole, setMainRole] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const orgProjectsChecker = async () => {
    const findOrg =
      orgs && orgs.length > 0
        ? orgs[0].collaborators.find((e) => e.user == userInfo._id)
        : orgsCollab && orgsCollab.length > 0
        ? orgsCollab[0].collaborators.find((e) => e.user == userInfo._id)
        : null;

    if (findOrg) {
      console.log(findOrg);
      const mainRole = await userRoleExtract(findOrg.userType);
      setMainRole(mainRole);
    } else {
      console.log("owner");
      const mainRole = "owner";
      setMainRole(mainRole);
    }
  };
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [project, setProject] = useState(
    selectedProjectNow
      ? selectedProjectNow._id
      : projects && projects.length > 0
      ? projects[0]._id
      : {}
  );
  const [template, setTemplate] = useState();
  const optionsValue = [
    {
      value: "Blank Template",
      label: "Blank Template",
    },
  ];

  const entryCreate = useSelector((state) => state.entryCreate);
  const {
    entry,
    loading: loadingEntry,
    error: errorEntry,
    sucess,
  } = entryCreate;

  const entryTemplateListMy = useSelector((state) => state.entryTemplateListMy);
  const {
    templates,
    loading: loadingTasks,
    error: errorTasks,
  } = entryTemplateListMy;
  const templateOptions =
    templates &&
    templates.map(({ _id: value, name: label, ...rest }) => ({
      value,
      label,
      ...rest,
    }));

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(project);
    //Blank Template
    if (template.label === "Blank Template") {
      const entryObject = {
        projectId: project,
        name: name,
        data: [
          {
            user: userInfo._id,
            block: "",
            date: Date.now(),
          },
        ],
      };
      console.log(entryObject);
      await dispatch(createEntry(entryObject));
      await dispatch({ type: ENTRY_CREATE_RESET });
    } else {
      const entryObject = {
        projectId: project,
        name: name,
        data: [
          {
            user: userInfo._id,
            block: JSON.parse(template.blocks),
            date: Date.now(),
          },
        ],
      };
      console.log(entryObject);
      await dispatch(createEntry(entryObject));
      await dispatch({ type: ENTRY_CREATE_RESET });
    }
  };

  const entrySucessTrue = async () => {
    const logObject = {
      entryId: entry._id,
      user: userInfo._id,
      userName: userInfo.name,
      userEmail: userInfo.email,
      message: `Opened The Entry With Name ${entry.name}  and id ${entry._id}`,
    };
    await addEntryLogs(logObject);
    await dispatch(
      addToCart({
        doc: entry,
        project,
        userType: "owner",
      })
    );
    setTabId(entry._id);
    setWhichTabisActive("tabs");
  };
  useEffect(() => {
    if (sucess) {
      setNewEntry(true);
      setEntryModal(false);
      entrySucessTrue();
    }
  }, [sucess]);

  useEffect(() => {
    dispatch(listMyTemplates());
  }, [dispatch]);

  useEffect(() => {
    if (!mainRole) {
      orgProjectsChecker();
    }
  }, [mainRole]);

  let newArr =
    projects &&
    projectsCollab &&
    projectsOrg &&
    _.unionBy(projects, projectsCollab, projectsOrg, "_id");

  return (
    <div className="modal">
      <div className="modal-inside">
        <div className="top-modal">
          <button
            onClick={() => {
              setEntryModal(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <path
                d="M28.2838 15.7712L22.6269 21.4281L16.9701 15.7712C16.72 15.5212 16.3809 15.3807 16.0273 15.3807C15.6737 15.3807 15.3345 15.5212 15.0845 15.7712C14.8344 16.0213 14.6939 16.3604 14.6939 16.714C14.6939 17.0676 14.8344 17.4068 15.0845 17.6568L20.7413 23.3137L15.0845 28.9705C14.8344 29.2206 14.6939 29.5597 14.6939 29.9134C14.6939 30.267 14.8344 30.6061 15.0845 30.8562C15.3345 31.1062 15.6737 31.2467 16.0273 31.2467C16.3809 31.2467 16.72 31.1062 16.9701 30.8562L22.6269 25.1993L28.2838 30.8562C28.5338 31.1062 28.873 31.2467 29.2266 31.2467C29.5802 31.2467 29.9194 31.1062 30.1694 30.8562C30.4195 30.6061 30.5599 30.267 30.5599 29.9134C30.5599 29.5597 30.4195 29.2206 30.1694 28.9705L24.5126 23.3137L30.1694 17.6568C30.4195 17.4068 30.5599 17.0676 30.5599 16.714C30.5599 16.3604 30.4195 16.0213 30.1694 15.7712C29.9194 15.5212 29.5802 15.3807 29.2266 15.3807C28.873 15.3807 28.5338 15.5212 28.2838 15.7712Z"
                fill="#8F8585"
              />
            </svg>
          </button>
        </div>
        {projects.concat(arr).length ? (
          <>
            <h1>Create New Entry</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter a name for your entry"
                onChange={(e) => setName(e.target.value)}
                required
              />
              {mainRole && (
                <select
                  defaultValue={project}
                  onChange={(e) => setProject(e.target.value)}
                  required
                >
                  {mainRole === "Admin" || mainRole === "owner"
                    ? newArr.map((proj) => (
                        <option value={proj._id} key={proj._id} id={proj._id}>
                          {proj.name}
                        </option>
                      ))
                    : projects.concat(arr).map((proj) => (
                        <option value={proj._id} key={proj._id} id={proj._id}>
                          {proj.name}
                        </option>
                      ))}
                </select>
              )}

              <h4>
                <span>Choose template</span>
              </h4>
              <Select
                options={optionsValue.concat(templateOptions)}
                onChange={(e) => setTemplate(e)}
                placeholder="Select Template"
                required
              />
              <div className="margin-maker"></div>
              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <>
            {" "}
            <h1> No Projects Available.</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateEntry;
