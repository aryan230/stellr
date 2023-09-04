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
import { listMySamples } from "../redux/actions/sampleActions";
import { Helmet } from "react-helmet";
const localizer = momentLocalizer(moment);

function CalendarTemp({ setTaskModal, setTaskContent }) {
  const dispatch = useDispatch();
  const [events, setEvents] = useState();

  const getEventProp = (event, start, end, isSelected) => {
    if (event.typeEvent === "normal") {
    } else {
      var backgroundColor = "#" + event.hexColor;
      var style = {
        backgroundColor: "#6200d2",
        borderRadius: "5px",
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
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;

  const projectListMy = useSelector((state) => state.projectListMy);
  const {
    projects,
    loading: loadingOrders,
    error: errorOrders,
  } = projectListMy;
  const projecListMyCollab = useSelector((state) => state.projecListMyCollab);
  const {
    projects: projectsCollab,
    loading: projectCollabLoading,
    error: errorCollabLoading,
  } = projecListMyCollab;

  const handleSelected = (event) => {
    if (event.typeEvent === "project") return;
    const doc = {
      subject: event.title,
      due_date: event.end.toISOString().split("T")[0],
      status: event.status,
      assigned: event.assigned,
      createdAt: event.end.toISOString().split("T")[0],
      priority: event.priority,
      project: event.project,
      user: event.user,
      _id: event._id,
    };
    setTaskContent(doc);
    setTaskModal(true);
  };

  useEffect(() => {
    dispatch(listMyTasksPersonal());
    dispatch(listMyCollabTasks());
    dispatch(listMySamples(userInfo._id));
  }, [dispatch]);
  return (
    <div className="calender-main-proper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Research Calendar Management | Bio-Pharma Lab Notebook App
        </title>
        <meta
          name="description"
          content="Efficiently manage research timelines and scheduling with our Bio-Pharma Lab Notebook app's integrated calendar feature. Stay organized and on track."
        />
      </Helmet>
      <Calendar
        views={{ month: true, week: false, day: false, agenda: false }}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={
          tasksList &&
          tasks &&
          projects &&
          tasksList
            .map(
              ({
                subject: title,
                createdAt: start,
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
            .concat(
              tasks.map(
                ({
                  subject: title,
                  createdAt: start,
                  due_date: end,
                  ...rest
                }) => ({
                  title,
                  start: new Date(start),
                  end: new Date(end),
                  allDay: true,
                  typeEvent: "collab",
                  ...rest,
                })
              )
            )
        }
        eventPropGetter={getEventProp}
        style={{ height: "100%" }}
        onSelectEvent={handleSelected}
      />
    </div>
  );
}

export default CalendarTemp;
