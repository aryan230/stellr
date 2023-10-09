import React, { useEffect, useRef, useState } from "react";
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
import { htmlToDelta } from "deltaconvert";
import mammoth from "mammoth/mammoth.browser";
import Quill from "quill";
import ReactQuill from "react-quill";

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
  const [creationType, setCreationType] = useState(false);
  const [file, setFile] = useState();
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
    templates
      .filter((t) => !t.deleted)
      .map(({ _id: value, name: label, ...rest }) => ({
        value,
        label,
        ...rest,
      }));
  const [quillHTML, setQuillHTML] = useState("");
  const quillRef = useRef(null);

  const submitHandlerImport = async (e) => {
    e.preventDefault();
    if (file) {
      const result = await convertDocxToHtml(file[0]);
      console.log(result);
      const quill = quillRef.current.getEditor();
      const delta = quill.clipboard.convert(result);
      // const finalResult = await htmlToDelta(result);
      // const finalResult = await quill.clipboard.convert(container);;
      // console.log(finalResult);
      const entryObject = {
        projectId: project,
        name: name,
        data: [
          {
            user: userInfo._id,
            block: delta,
            date: Date.now(),
          },
        ],
      };
      console.log(entryObject);
      await dispatch(createEntry(entryObject));
      await dispatch({ type: ENTRY_CREATE_RESET });
    }
  };

  const convertDocxToHtml = async (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const arrayBuffer = reader.result;

        try {
          const { value } = await mammoth.convertToHtml({ arrayBuffer });
          resolve(value);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

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
      {creationType ? (
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
              <h1>
                Create New Entry <span className="font-karla">(Import)</span>
              </h1>
              <form onSubmit={submitHandlerImport}>
                <input
                  type="text"
                  value={name}
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
                  <span>Import</span>
                </h4>

                <input
                  type="file"
                  accept=".docx"
                  onChange={(e) => {
                    setFile(e.target.files);
                    setName(e.target.files[0].name);
                  }}
                  required
                />
                <div className="margin-maker"></div>

                <div className="margin-maker"></div>
                <button type="submit">Submit</button>
                <div className="margin-maker"></div>
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  readOnly
                  value={quillHTML}
                  style={{
                    display: "none",
                  }}
                />
                {/* <a
                  href="#"
                  className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 14C20.7348 14 20.4804 14.1054 20.2929 14.2929C20.1054 14.4804 20 14.7348 20 15V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15C4 14.7348 3.89464 14.4804 3.70711 14.2929C3.51957 14.1054 3.26522 14 3 14C2.73478 14 2.48043 14.1054 2.29289 14.2929C2.10536 14.4804 2 14.7348 2 15V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V15C22 14.7348 21.8946 14.4804 21.7071 14.2929C21.5196 14.1054 21.2652 14 21 14ZM11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.7397 15.9729 11.8691 16.0002 12 16.0002C12.1309 16.0002 12.2603 15.9729 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L16.71 11.71C16.8983 11.5217 17.0041 11.2663 17.0041 11C17.0041 10.7337 16.8983 10.4783 16.71 10.29C16.5217 10.1017 16.2663 9.99591 16 9.99591C15.7337 9.99591 15.4783 10.1017 15.29 10.29L13 12.59V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V12.59L8.71 10.29C8.61676 10.1968 8.50607 10.1228 8.38425 10.0723C8.26243 10.0219 8.13186 9.99591 8 9.99591C7.86814 9.99591 7.73757 10.0219 7.61575 10.0723C7.49393 10.1228 7.38324 10.1968 7.29 10.29C7.19676 10.3832 7.1228 10.4939 7.07234 10.6158C7.02188 10.7376 6.99591 10.8681 6.99591 11C6.99591 11.1319 7.02188 11.2624 7.07234 11.3842C7.1228 11.5061 7.19676 11.6168 7.29 11.71L11.29 15.71Z"
                      fill="url(#paint0_linear_680_494)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_680_494"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#5D00D2" />
                        <stop offset="1" stop-color="#C781FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="w-full ml-5">Import an entry</span>
                </a> */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCreationType(false);
                  }}
                  className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    className="w-4 h-4 rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                  <span className="w-full ml-2"> back</span>
                </a>
              </form>
            </>
          ) : (
            <>
              {" "}
              <h1> No Projects Available.</h1>
            </>
          )}
        </div>
      ) : (
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

                <div className="margin-maker"></div>
                <button type="submit">Submit</button>
                <div className="margin-maker"></div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCreationType(true);
                  }}
                  className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 14C20.7348 14 20.4804 14.1054 20.2929 14.2929C20.1054 14.4804 20 14.7348 20 15V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15C4 14.7348 3.89464 14.4804 3.70711 14.2929C3.51957 14.1054 3.26522 14 3 14C2.73478 14 2.48043 14.1054 2.29289 14.2929C2.10536 14.4804 2 14.7348 2 15V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V15C22 14.7348 21.8946 14.4804 21.7071 14.2929C21.5196 14.1054 21.2652 14 21 14ZM11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.7397 15.9729 11.8691 16.0002 12 16.0002C12.1309 16.0002 12.2603 15.9729 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L16.71 11.71C16.8983 11.5217 17.0041 11.2663 17.0041 11C17.0041 10.7337 16.8983 10.4783 16.71 10.29C16.5217 10.1017 16.2663 9.99591 16 9.99591C15.7337 9.99591 15.4783 10.1017 15.29 10.29L13 12.59V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V12.59L8.71 10.29C8.61676 10.1968 8.50607 10.1228 8.38425 10.0723C8.26243 10.0219 8.13186 9.99591 8 9.99591C7.86814 9.99591 7.73757 10.0219 7.61575 10.0723C7.49393 10.1228 7.38324 10.1968 7.29 10.29C7.19676 10.3832 7.1228 10.4939 7.07234 10.6158C7.02188 10.7376 6.99591 10.8681 6.99591 11C6.99591 11.1319 7.02188 11.2624 7.07234 11.3842C7.1228 11.5061 7.19676 11.6168 7.29 11.71L11.29 15.71Z"
                      fill="url(#paint0_linear_680_494)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_680_494"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#5D00D2" />
                        <stop offset="1" stop-color="#C781FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="w-full ml-5">Import an entry</span>
                  {/* <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg> */}
                </a>
              </form>
            </>
          ) : (
            <>
              {" "}
              <h1> No Projects Available.</h1>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateEntry;
