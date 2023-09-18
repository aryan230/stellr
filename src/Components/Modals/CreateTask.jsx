import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/actions/taskActions";
import { TASK_CREATE_RESET } from "../../redux/constants/taskConstants";
import { userRoleExtract } from "../Functions/userRoleFunction";
import _ from "lodash";
import ReactQuill from "react-quill";

function CreateTask({
  setTaskModal,
  projects,
  projectsCollab,
  setNewTask,
  setWhichTabisActive,
  setMiddleNav,
  setProjectInsideActive,
  setProjectInsideActiveId,
  selectedProjectNow,
  orgs,
  orgsCollab,
  projectsOrg,
}) {
  let arr = [];
  if (projectsCollab.length > 0) {
    projectsCollab.map((proj) => {
      if (proj.collaborators.find((o) => o.userType == "Admin")) {
        arr.push(proj);
      }
    });
  }
  const [mainRole, setMainRole] = useState();

  console.log(selectedProjectNow);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState();
  const [project, setProject] = useState(
    selectedProjectNow
      ? { value: selectedProjectNow._id, label: selectedProjectNow.name }
      : projects && projects.length > 0
      ? projects[0]._id
      : {}
  );
  const [collabs, setCollabs] = useState();
  const [orgCollabsUsers, setOrgCollabs] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState();
  const [assigned, setAssigned] = useState();
  const [description, setDescription] = useState();
  const taskCreate = useSelector((state) => state.taskCreate);
  const { loading, error, sucess, task } = taskCreate;

  const priorityOptions = [
    {
      value: "High",
      label: "High",
    },
    {
      value: "Medium",
      label: "Medium",
    },
    {
      value: "Low",
      label: "Low",
    },
  ];
  const statusOptions = [
    {
      value: "Open",
      label: "Open",
    },
    {
      value: "Completed",
      label: "Completed",
    },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;

  const defaultUser = [
    {
      label: userInfo.name,
      value: userInfo._id,
    },
  ];

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
  const optionsValue = projects
    .concat(arr)
    .map(({ _id: value, name: label }) => ({
      value,
      label,
    }));
  useEffect(() => {
    if (project) {
      const find = projects.find((e) => e._id == project.value);
      if (find && find.collaborators) {
        if (find.collaborators.length > 0) {
          const findArr = find.collaborators.map(
            ({ user: value, userName: label }) => ({
              value,
              label,
            })
          );
          setCollabs(findArr);
        }
      }
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      const find = projectsOrg.find((e) => e._id == project.value);
      if (find) {
        const findOrg =
          orgs && orgs.length > 0
            ? orgs[0]
            : orgsCollab && orgsCollab.length > 0
            ? orgsCollab[0]
            : null;
        if (findOrg && findOrg.collaborators.length > 0) {
          const findArr = findOrg.collaborators.map(
            ({ user: value, userName: label }) => ({
              value,
              label,
            })
          );
          setOrgCollabs(findArr);
        }
      }
    }
  }, [project]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const taskObject = {
      projectId: project.value,
      subject,
      description,
      due_date: startDate,
      priority: priority.value,
      status: "Open",
      assigned: assigned
        ? assigned.length > 0
          ? assigned.map(({ value: user, label: userName }) => ({
              user,
              userName,
            }))
          : []
        : [],
    };

    await dispatch(createTask(taskObject));
    await dispatch({ type: TASK_CREATE_RESET });
  };

  useEffect(() => {
    if (sucess) {
      setNewTask(true);
      setMiddleNav(false);
      setProjectInsideActiveId(project.value);
      setProjectInsideActive(true);
      setWhichTabisActive("projectList");
      setTaskModal(false);
    }
  }, [sucess]);
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

  const allOptionsValue = newArr.map(({ _id: value, name: label }) => ({
    value,
    label,
  }));

  return (
    <div className="modal">
      <div className="modal-inside">
        <div className="top-modal">
          <button
            onClick={() => {
              setTaskModal(false);
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
        <>
          {" "}
          <h1>Create New Task</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter a subject for your task"
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <div className="label-input">
              <label htmlFor="">Enter Description</label>{" "}
              <ReactQuill
                theme="snow"
                value={description}
                onChange={(e) => {
                  setDescription(e);
                }}
              />
            </div>
            <div className="label-input">
              <label htmlFor="">Set due date</label>
              <input
                type="date"
                name=""
                min="2023-07-20"
                id=""
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required
              />
            </div>
            {(mainRole && mainRole === "Admin") || mainRole === "owner" ? (
              <Select
                value={project}
                options={allOptionsValue}
                onChange={(e) => setProject(e)}
                placeholder="Select Project"
                required
              />
            ) : (
              <Select
                value={project}
                options={optionsValue}
                onChange={(e) => setProject(e)}
                placeholder="Select Project"
                required
              />
            )}
            <div className="margin-maker"></div>
            <Select
              defaultValue={[
                {
                  label: userInfo.name,
                  value: userInfo._id,
                },
              ]}
              isMulti
              name="colors"
              options={_.unionBy(
                collabs,
                orgCollabsUsers,
                defaultUser,
                "value"
              )}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Assigned To"
              onChange={(e) => setAssigned(e)}
            />
            <div className="margin-maker"></div>
            <Select
              options={priorityOptions}
              onChange={(e) => setPriority(e)}
              placeholder="Select Priority"
              required
            />{" "}
            <div className="margin-maker"></div>
            {/* <Select
              options={statusOptions}
              onChange={(e) => setStatus(e)}
              placeholder="Select Status"
              required
            /> */}
            {/* <select
              defaultValue={project}
              onChange={(e) => setProject(e.target.value)}
              required
            >
              {projects.map((proj) => (
                <option value={proj._id} key={proj._id} id={proj._id}>
                  {proj.name}
                </option>
              ))}
            </select>
            <select
              defaultValue={project}
              onChange={(e) => setProject(e.target.value)}
              required
              multiple
            >
              {projects.map((proj) => (
                <option value={proj._id} key={proj._id} id={proj._id}>
                  {proj.name}
                </option>
              ))}
            </select> */}
            <button type="submit">Submit</button>
          </form>
        </>
      </div>
    </div>
  );
}

export default CreateTask;
