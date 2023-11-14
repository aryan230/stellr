import { Bell, InfoIcon, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import axios from "axios";
import URL from "./../../Data/data.json";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { encryptData } from "../Functions/Link/Encrypt";
import moment from "moment";
import { XIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Notification() {
  const [data, setData] = useState();
  const [socket, setSocket] = useState(null);

  const audioPlayer = useRef(null);
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  function playAudio() {
    audioPlayer.current.play();
  }

  const updateNotificationToRead = async () => {
    if (userInfo) {
      var config = {
        method: "put",
        url: `${URL[0]}api/notification/1`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const getNotifications = async () => {
    var config = {
      method: "get",
      url: `${URL[0]}api/notification/1`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function(response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userInfo) {
      if (!data) {
        getNotifications();
      }
    }
  }, [data, userInfo]);

  //sockets
  useEffect(() => {
    const s = io(URL[0].substring(0, URL[0].length - 1), {
      maxHttpBufferSize: 1e8,
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket && userInfo) {
      socket.emit("join-room", userInfo._id);
    }
  }, [socket, userInfo]);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (message) => {
        playAudio();
        toast.custom((t) => (
          <div
            className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>{JSON.parse(message.data).subject}</div>
          </div>
        ));

        setData((data) => [...data, message]);
      });
    }
  }, [socket]);

  // useEffect(() => {
  //   if (socket == null) return;
  //   socket.once("load-notifications", ({ notifications }) => {
  //     setData(notifications);
  //   });
  //   socket.emit("get-notifications", {
  //     userId: userInfo._id,
  //   });
  // }, [socket]);

  // let sendChanges = async () => {
  //   if (socket) {
  //     socket.emit("send-notifications", {
  //       test: "test",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (socket == null) return;
  //   const handler = (delta) => {
  //     console.log(delta);
  //   };
  //   socket.on("receive-notifications", handler);

  //   return () => {
  //     socket.off("receive-notifications", handler);
  //   };
  // }, [socket]);

  return (
    <Menu
      as="div"
      className="fixed top-5 right-10 inline-block text-left z-[999]"
    >
      <audio ref={audioPlayer} src="./assets/not.mp3" />

      <div>
        <Menu.Button
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={(e) => {
            const newData = data.map((d) => {
              return {
                ...d,
                read: true,
              };
            });
            setData(newData);
            updateNotificationToRead();
          }}
        >
          <div className="rounded-full flex items-center justify-center">
            {data &&
              data.length > 0 &&
              data.filter((i) => !i.read).length > 0 && (
                <p className="absolute -top-1 -right-1 w-5 h-5 font-sans bg-indigo-700 rounded-full p-3 text-white text-md items-center flex justify-center">
                  {data.filter((i) => !i.read).length}
                </p>
              )}

            <Bell size={18} />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="notification-box">
            {data &&
              data.length > 0 &&
              data
                .sort(function(a, b) {
                  return (
                    new Date(JSON.parse(b.data).date) -
                    new Date(JSON.parse(a.data).date)
                  );
                })
                .map((n) => (
                  <div className=" w-full font-sans bg-white shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <InfoIcon
                            className="h-6 w-6 text-indigo-700"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                          <p className="text-sm font-medium text-gray-900">
                            {JSON.parse(n.data).subject}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {JSON.parse(n.data).date &&
                              moment(JSON.parse(n.data).date).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  // <div
                  //   className="flex items-center p-4 text-sm text-gray-800 border-gray-300 rounded-lg bg-gray-50"
                  //   role="alert"
                  // >
                  //   <svg
                  //     className="flex-shrink-0 inline w-4 h-4 mr-3"
                  //     aria-hidden="true"
                  //     xmlns="http://www.w3.org/2000/svg"
                  //     fill="currentColor"
                  //     viewBox="0 0 20 20"
                  //   >
                  //     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  //   </svg>
                  //   <span className="sr-only">Info</span>
                  //   <div>{JSON.parse(n.data).subject}</div>
                  //   <div>
                  //     {JSON.parse(n.data).date &&
                  //       moment(JSON.parse(n.data).date).fromNow()}
                  //   </div>
                  // </div>
                ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    // <div className="fixed top-5 right-8 z-[9999999999]">
    //   {" "}
    //   <div className="relative bg-white rounded-full p-3 flex items-center justify-center drop-shadow-md">
    //     <p className="absolute w-5 h-5 -top-1 -right-1 bg-indigo-700 rounded-full p-2 text-white text-md items-center flex justify-center">
    //       2
    //     </p>
    //     <Bell size={18} />
    //   </div>

    // </div>
  );
}

export { Notification };
