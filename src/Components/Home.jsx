import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  listMyCollabTasks,
  listMyTasksPersonal,
} from "../redux/actions/taskActions";
import TaskEntries from "./Entries/TaskEntries";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Helmet } from "react-helmet";
import _ from "lodash";
import DashHome from "./ReportsAndDashboard/DashHome";

const localizer = momentLocalizer(moment);

function Home({
  setTaskModal,
  setTaskContent,
  setCreateNewTaskModal,
  setTaskUpdateController,
  taskUpdateController,
}) {
  const dispatch = useDispatch();
  const [events, setEvents] = useState();
  const [todaysDate, setTodaysDate] = useState();
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getTodaysDate = () => {
    var date_not_formatted = new Date(Date.now());

    var formatted_string = date_not_formatted.getFullYear() + "-";

    if (date_not_formatted.getMonth() < 9) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getMonth() + 1;
    formatted_string += "-";

    if (date_not_formatted.getDate() < 10) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getDate();
    setTodaysDate(formatted_string);
  };

  useEffect(() => {
    if (!todaysDate) {
      getTodaysDate();
    }
  }, [todaysDate]);
  const getEventProp = (event, start, end, isSelected) => {
    if (event.typeEvent === "normal") {
      var backgroundColor = "#" + event.hexColor;
      var style = {
        backgroundColor: "#6c63ff",
        borderRadius: "0px",
        opacity: 1,
        color: "white",
        border: "0px",
        display: "block",
      };
      return {
        style: style,
      };
    } else {
      var backgroundColor = "#" + event.hexColor;
      var style = {
        backgroundColor: "#6200d2",
        borderRadius: "0px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      };
      return {
        style: style,
      };
    }
  };

  const taskListMyPersonal = useSelector((state) => state.taskListMyPersonal);
  const {
    tasksList,
    loading: loadingTasks,
    error: errorTasks,
  } = taskListMyPersonal;
  const taskListMyCollab = useSelector((state) => state.taskListMyCollab);
  const {
    tasks,
    loading: loadingTasksCollab,
    error: errorTasksCollab,
  } = taskListMyCollab;

  console.log(tasks && tasks);

  const handleSelected = (event) => {
    const docTwo =
      tasksList &&
      tasks &&
      tasksList.concat(tasks).find((e) => e._id == event._id);

    const doc = {
      subject: event.title,
      due_date: event.end.toISOString().split("T")[0],
      assigned: event.assigned,
      createdAt: event.start.toISOString().split("T")[0],
      status: event.status,
      priority: event.priority,
      project: event.project,
      user: event.user,
      _id: event._id,
    };
    setTaskContent(docTwo);
    setTaskModal(true);
  };

  useEffect(() => {
    dispatch(listMyTasksPersonal());
    dispatch(listMyCollabTasks());
  }, [dispatch]);

  useEffect(() => {
    if (taskUpdateController) {
      dispatch(listMyTasksPersonal());
      dispatch(listMyCollabTasks());
      setTaskUpdateController(false);
    }
  }, [taskUpdateController]);

  let newArr = tasks && tasksList && _.unionBy(tasks, tasksList, "_id");

  return (
    <div className="calender-main">
      {" "}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Electronic Lab Notebook App for Bio-Pharma | ELN Software</title>
        <meta
          name="description"
          content="Stellr ELN: Capture, organize, and collaborate. Streamline lab tasks, data entry, and team communication for efficient biotech R&D. Try Now!"
        />
      </Helmet>
      <div className="calender-holder">
        <Calendar
          views={{ month: true, week: false, day: false, agenda: false }}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={
            newArr &&
            newArr.map(
              ({
                subject: title,
                due_date: start,
                due_date: end,
                ...rest
              }) => ({
                title,
                start: new Date(start),
                end: new Date(end),
                allDay: true,
                typeEvent: "normal",
                ...rest,
              })
            )
          }
          eventPropGetter={getEventProp}
          style={{ height: "100%" }}
          onSelectEvent={handleSelected}
        />
      </div>
      <div className="calender-tasks">
        <div className="calender-task-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="31"
            viewBox="0 0 25 31"
            fill="none"
          >
            <path
              d="M24.0065 11.9271C23.8853 11.6866 23.6999 11.4843 23.4708 11.3428C23.2417 11.2012 22.9779 11.1258 22.7086 11.125H15.4169V2.37501C15.4325 2.05518 15.3425 1.73908 15.1606 1.47551C14.9788 1.21195 14.7152 1.01556 14.4106 0.916679C14.1178 0.820346 13.8021 0.819263 13.5086 0.913586C13.2152 1.00791 12.9591 1.19279 12.7773 1.44168L1.11064 17.4833C0.964467 17.6946 0.876694 17.9407 0.856207 18.1968C0.83572 18.4529 0.883247 18.7099 0.993975 18.9417C1.09594 19.2067 1.27308 19.4362 1.50365 19.602C1.73421 19.7678 2.00817 19.8627 2.29189 19.875H9.58356V28.625C9.58378 28.9325 9.68122 29.2321 9.86195 29.481C10.0427 29.7298 10.2974 29.9151 10.5898 30.0104C10.7363 30.0558 10.8885 30.0804 11.0419 30.0833C11.272 30.0839 11.499 30.0301 11.7043 29.9262C11.9096 29.8222 12.0874 29.6712 12.2231 29.4854L23.8898 13.4438C24.0469 13.2262 24.141 12.9694 24.1616 12.7018C24.1821 12.4342 24.1285 12.1662 24.0065 11.9271V11.9271ZM12.5002 24.1333V18.4167C12.5002 18.0299 12.3466 17.659 12.0731 17.3855C11.7996 17.112 11.4287 16.9583 11.0419 16.9583H5.20856L12.5002 6.86668V12.5833C12.5002 12.9701 12.6539 13.3411 12.9274 13.6145C13.2009 13.888 13.5718 14.0417 13.9586 14.0417H19.7919L12.5002 24.1333Z"
              fill="url(#paint0_linear_242_328)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_242_328"
                x1="12.5087"
                y1="0.843628"
                x2="12.5087"
                y2="30.0833"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#5D00D2" />
                <stop offset="1" stop-color="#C984FF" />
              </linearGradient>
            </defs>
          </svg>
          <h1>Tasks</h1>
        </div>
        <div className="calender-task-bottom">
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Tasks
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={handleChange}
              fullWidth
              label="Select Tasks"
              value={age}
            >
              <MenuItem value={10}>Today's Tasks</MenuItem>
              <MenuItem value={20}>Upcoming Tasks</MenuItem>
              <MenuItem value={30}>My Tasks</MenuItem>
              <MenuItem value={40}> Overdue Tasks</MenuItem>
            </Select>
          </FormControl>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateNewTaskModal(true);
            }}
            className="p-0 w-10 h-10 absolute bottom-10 bg-indigo-600 rounded-full hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          >
            <svg
              viewBox="0 0 20 20"
              enableBackground="new 0 0 20 20"
              className="w-6 h-6 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                              C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                              C15.952,9,16,9.447,16,10z"
              />
            </svg>
          </button>

          {age && age === 10 && (
            <div className="calender-todays-task">
              {newArr &&
                newArr.map(
                  (doc) =>
                    doc.due_date === todaysDate && (
                      <TaskEntries
                        doc={doc}
                        setTaskModal={setTaskModal}
                        setTaskContent={setTaskContent}
                        taskFrom={true}
                      />
                    )
                )}
              {newArr &&
                newArr.findIndex((o) => o.due_date === todaysDate) == -1 && (
                  <div className="no-task-container">
                    <img src="./assets/task.svg" alt="" />
                    <h1>No tasks pending for today.</h1>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCreateNewTaskModal(true);
                      }}
                    >
                      Create new task
                    </a>
                  </div>
                )}
            </div>
          )}
          {age && age === 20 && (
            <div className="calender-todays-task">
              {newArr &&
                newArr.map(
                  (doc) =>
                    doc.due_date > todaysDate && (
                      <TaskEntries
                        doc={doc}
                        setTaskModal={setTaskModal}
                        setTaskContent={setTaskContent}
                        taskFrom={true}
                      />
                    )
                )}
            </div>
          )}
          {age && age === 30 && (
            <div className="calender-todays-task">
              {tasksList &&
                tasksList.map((doc, index) => (
                  <TaskEntries
                    doc={doc}
                    index={index}
                    setTaskModal={setTaskModal}
                    setTaskContent={setTaskContent}
                    taskFrom={true}
                  />
                ))}
            </div>
          )}
          {age && age === 40 && (
            <div className="calender-todays-task">
              {newArr &&
                newArr.map(
                  (doc) =>
                    doc.due_date < todaysDate && (
                      <TaskEntries
                        doc={doc}
                        setTaskModal={setTaskModal}
                        setTaskContent={setTaskContent}
                        taskFrom={true}
                      />
                    )
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
