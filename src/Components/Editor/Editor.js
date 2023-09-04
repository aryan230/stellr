// Here Import react with useEffect
import React, { useEffect, useState } from "react";

// Here EditorJS with some plugins
import { createReactEditorJS } from "react-editor-js";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
// Here mention module
// import MentionTool from "editorjs-mention-tool";
// import "editorjs-mention-tool/src/styles.css";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Drawer } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ImageTool from "@editorjs/image";
import NestedList from "@editorjs/nested-list";
import Embed from "@editorjs/embed";
import AttachesTool from "@editorjs/attaches";
import { getStorage, ref } from "firebase/storage";
import { Toaster, toast } from "react-hot-toast";
import { SimpleImage } from "./Tools/SimpleImage";
import Tribute from "tributejs";
import MentionTool from "./Tools/Mentions";
import { createEntryTemplate } from "../../redux/actions/entryTemplatesActions";
import { addLogs } from "../Functions/addLogs";
import Loader from "../../css/utils/Loader";

const Table = require("editorjs-table");
const Marker = require("@editorjs/marker");
const Warning = require("@editorjs/warning");
const Checklist = require("@editorjs/checklist");
const LinkTool = require("@editorjs/link");
const Delimiter = require("@editorjs/delimiter");
const CodeTool = require("@editorjs/code");
const RawTool = require("@editorjs/raw");
const InlineCode = require("@editorjs/inline-code");

const CustomEditor = ({ tab, active, project, userType }) => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [userCollabs, setUserCollabs] = useState(
    project.collaborators && project.collaborators.length > 0
      ? project.collaborators.map(
          ({ user: id, userName: name, user: slug }) => ({
            id,
            name,
            slug: `/v/${slug}`,
          })
        )
      : []
  );
  const [blockValue, setBlockValue] = useState({
    time: new Date().getTime(),
    blocks: tab.block,
  });
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { projectDetails, shippingAdress } = cart;

  //update task
  const updateArray = async (savedData) => {
    const docRef = doc(db, "entries", tab.project);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let data = docSnap.data().data;
      const findIndex = data.findIndex((a) => a.id == tab.id);
      data[findIndex].block = savedData.blocks;
      await updateDoc(docRef, {
        data,
      }).then(() => {
        // addLogs(
        //   tab.project,
        //   userInfo.name,
        //   userInfo._id,
        //   `Updated the Entry With Name ${tab.name}  and id ${tab.id}`
        // );
        toast.success("Entry saved successfully");
      });
    } else {
      toast.error("No such document!");
    }
  };

  //Fetch Blocks
  const fetchFirestoreData = async () => {
    const unsub = onSnapshot(
      doc(db, "entries", localStorage.getItem("project")),
      (doc) => {
        if (doc.data()) {
          const dataValue = doc.data().data;
          const find = dataValue.find(
            (a) => a.id == localStorage.getItem("tab")
          );
          console.log(find);
          setBlockValue({
            time: new Date().getTime(),
            blocks: find.block,
          });
        } else {
          setBlockValue({
            time: new Date().getTime(),
            blocks: [],
          });
        }
      }
    );
  };

  // useEffect(() => {
  //   fetchFirestoreData();
  // }, [localStorage.getItem("tab")]);

  const editorCore = React.useRef(null);
  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor!",
          level: 1,
        },
      },
    ],
  };

  const uploadFileToFirebase = async () => {};

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);
  const handleSaveTemplate = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(tab);
    const newData = JSON.stringify(savedData.blocks);
    const data = {
      name: tab.name,
      description: tab.name,
      blocks: newData,
    };
    await dispatch(createEntryTemplate(data));
    // console.log(localStorage.getItem("tab"));
    // console.log(localStorage.getItem("project"));
  }, []);
  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(savedData);
    // console.log(localStorage.getItem("tab"));
    // console.log(localStorage.getItem("project"));
    updateArray(savedData);
  }, []);

  const ReactEditorJS = createReactEditorJS(); // Initialize editor

  const EDITOR_JS_TOOLS = {
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    header: Header,
    // mention: Mention,
    image: SimpleImage,
    list: {
      class: NestedList,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },
    delimiter: Delimiter,
    code: CodeTool,
    warning: Warning,
    raw: RawTool,
    attaches: {
      class: AttachesTool,
      config: {
        uploader: {
          async uploadByFile(file) {
            const formData = new FormData();
            console.log(file);
            formData.append("files", file);
            fetch("http://localhost:3002/api/upload", {
              method: "POST",
              body: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
              .then((res) => console.log(res))
              .catch((err) => ("Error occured", err));
          },
        },
      },
    },
    inlineCode: {
      class: InlineCode,
      shortcut: "CMD+SHIFT+M",
    },
    Marker: {
      class: Marker,
      shortcut: "CMD+SHIFT+M",
    },
  };

  const DATA_SET = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Stellr editor.",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Start writing content to edit.",
          level: 2,
        },
      },
    ],
  };
  useEffect(() => {
    // Here create new MentionTool with $ accessor key to use it as variable layout
    new MentionTool({
      holder: tab.id, // This is the editor Holder ( see below )
      accessKey: "$", // Access key ( $ or @ )
      allUsers: userCollabs,
      baseUrl: "",
      searchAPIUrl: "",
    });

    // Here create new MentionTool with @ accessor key to use it as mention layout
    new MentionTool({
      holder: tab.id, // This is the editor Holder ( see below )
      accessKey: "@", // Access key ( $ or @ )
      allUsers: userCollabs,
      baseUrl: "",
      searchAPIUrl: "",
    });
  }, []);
  const handleChange = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    if (savedData.blocks.slice(-1)[0].type === "paragraph") {
      if (savedData.blocks.slice(-1)[0].data.text.charAt(0) === "@") {
        console.log(savedData.blocks.slice(-1)[0]);
      }
    }
  }, []);
  const entryTemplateCreate = useSelector((state) => state.entryTemplateCreate);
  const {
    template,
    sucess,
    error,
    loading: orderCreateLoading,
  } = entryTemplateCreate;
  useEffect(() => {
    if (sucess) {
      toast.success("Saved as Template Sucessfully.");
    }
  }, [sucess]);

  return (
    <div className={`editor-holder-reactjs ${active && "active"}`}>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <span className="edit-profile-drawer-heading">Edit Profile</span>
        </Box>
      </Drawer>
      <Toaster position="top-center" reverseOrder={true} />{" "}
      <div className="top-div-editor-holder">
        <div className="top-div-holder-editor-inside">
          <ul>
            <li>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                Save{" "}
              </a>
            </li>
            <li>
              <a href="">
                More Settings
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M11.8074 7.52667C11.7455 7.46418 11.6717 7.41459 11.5905 7.38074C11.5093 7.34689 11.4221 7.32947 11.3341 7.32947C11.2461 7.32947 11.159 7.34689 11.0777 7.38074C10.9965 7.41459 10.9227 7.46418 10.8608 7.52667L8.66744 9.72667V4.66667C8.66744 4.48986 8.5972 4.32029 8.47218 4.19526C8.34715 4.07024 8.17759 4 8.00077 4C7.82396 4 7.65439 4.07024 7.52937 4.19526C7.40435 4.32029 7.33411 4.48986 7.33411 4.66667V9.72667L5.14077 7.52667C5.01524 7.40113 4.84498 7.33061 4.66744 7.33061C4.48991 7.33061 4.31964 7.40113 4.19411 7.52667C4.06857 7.6522 3.99805 7.82247 3.99805 8C3.99805 8.17753 4.06857 8.3478 4.19411 8.47333L7.52744 11.8067C7.59084 11.8674 7.66561 11.9149 7.74744 11.9467C7.82724 11.9819 7.91353 12.0002 8.00077 12.0002C8.08802 12.0002 8.17431 11.9819 8.25411 11.9467C8.33594 11.9149 8.41071 11.8674 8.47411 11.8067L11.8074 8.47333C11.8699 8.41136 11.9195 8.33762 11.9534 8.25638C11.9872 8.17515 12.0046 8.08801 12.0046 8C12.0046 7.91199 11.9872 7.82486 11.9534 7.74362C11.9195 7.66238 11.8699 7.58864 11.8074 7.52667Z"
                    fill="black"
                  />
                </svg>
              </a>
              <div className="drop-down-content">
                <div className="middle-navbar-container">
                  <div className="mnc-element">
                    <div className="mnc-element-inside">
                      <div className="mnc-element-left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M13.8067 6.19333L9.80667 2.19333C9.74523 2.13337 9.6728 2.08583 9.59333 2.05333C9.51068 2.01974 9.42254 2.00167 9.33333 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V6.66667C14.0005 6.57893 13.9837 6.49195 13.9505 6.41073C13.9173 6.3295 13.8685 6.25563 13.8067 6.19333ZM6 3.33333H8.66667V4.66667H6V3.33333ZM10 12.6667H6V10.6667C6 10.4899 6.07024 10.3203 6.19526 10.1953C6.32029 10.0702 6.48986 10 6.66667 10H9.33333C9.51014 10 9.67971 10.0702 9.80474 10.1953C9.92976 10.3203 10 10.4899 10 10.6667V12.6667ZM12.6667 12C12.6667 12.1768 12.5964 12.3464 12.4714 12.4714C12.3464 12.5964 12.1768 12.6667 12 12.6667H11.3333V10.6667C11.3333 10.1362 11.1226 9.62753 10.7475 9.25245C10.3725 8.87738 9.86377 8.66667 9.33333 8.66667H6.66667C6.13623 8.66667 5.62753 8.87738 5.25245 9.25245C4.87738 9.62753 4.66667 10.1362 4.66667 10.6667V12.6667H4C3.82319 12.6667 3.65362 12.5964 3.5286 12.4714C3.40357 12.3464 3.33333 12.1768 3.33333 12V4C3.33333 3.82319 3.40357 3.65362 3.5286 3.5286C3.65362 3.40357 3.82319 3.33333 4 3.33333H4.66667V5.33333C4.66667 5.51014 4.7369 5.67971 4.86193 5.80474C4.98695 5.92976 5.15652 6 5.33333 6H9.33333C9.51014 6 9.67971 5.92976 9.80474 5.80474C9.92976 5.67971 10 5.51014 10 5.33333V4.27333L12.6667 6.94V12Z"
                            fill="black"
                          />
                        </svg>
                        <p>Save as Template</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mnc-element"
                    onClick={() => {
                      setIsDrawerOpen(true);
                    }}
                  >
                    <div className="mnc-element-inside">
                      <div className="mnc-element-left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M8.25 1.5C6.76664 1.5 5.3166 1.93987 4.08323 2.76398C2.84986 3.58809 1.88856 4.75943 1.32091 6.12987C0.75325 7.50032 0.604725 9.00832 0.894114 10.4632C1.1835 11.918 1.89781 13.2544 2.9467 14.3033C3.9956 15.3522 5.33197 16.0665 6.78683 16.3559C8.24168 16.6453 9.74968 16.4968 11.1201 15.9291C12.4906 15.3614 13.6619 14.4001 14.486 13.1668C15.3101 11.9334 15.75 10.4834 15.75 9C15.75 8.01509 15.556 7.03982 15.1791 6.12987C14.8022 5.21993 14.2497 4.39314 13.5533 3.6967C12.8569 3.00026 12.0301 2.44781 11.1201 2.0709C10.2102 1.69399 9.23492 1.5 8.25 1.5V1.5ZM8.25 15C7.06332 15 5.90328 14.6481 4.91658 13.9888C3.92989 13.3295 3.16085 12.3925 2.70673 11.2961C2.2526 10.1997 2.13378 8.99334 2.36529 7.82946C2.5968 6.66557 3.16825 5.59647 4.00736 4.75736C4.84648 3.91824 5.91558 3.3468 7.07946 3.11529C8.24335 2.88378 9.44975 3.0026 10.5461 3.45672C11.6425 3.91085 12.5795 4.67988 13.2388 5.66658C13.8981 6.65327 14.25 7.81331 14.25 9C14.25 10.5913 13.6179 12.1174 12.4926 13.2426C11.3674 14.3679 9.8413 15 8.25 15V15ZM10.575 9.4725L9 8.565V5.25C9 5.05109 8.92099 4.86032 8.78033 4.71967C8.63968 4.57902 8.44892 4.5 8.25 4.5C8.05109 4.5 7.86033 4.57902 7.71967 4.71967C7.57902 4.86032 7.5 5.05109 7.5 5.25V9C7.5 9 7.5 9.06 7.5 9.09C7.50444 9.14168 7.5171 9.19231 7.5375 9.24C7.55295 9.2845 7.57306 9.32724 7.5975 9.3675C7.61803 9.41013 7.64318 9.45037 7.6725 9.4875L7.7925 9.585L7.86 9.6525L9.81 10.7775C9.92431 10.8423 10.0536 10.8759 10.185 10.875C10.3511 10.8762 10.5128 10.8222 10.6449 10.7215C10.777 10.6208 10.8719 10.4792 10.9148 10.3187C10.9577 10.1583 10.9461 9.98819 10.8819 9.83503C10.8177 9.68188 10.7045 9.55437 10.56 9.4725H10.575Z"
                            fill="#242424"
                          />
                        </svg>
                        <p>History</p>
                      </div>
                    </div>
                  </button>
                  <div className="mnc-element">
                    <div className="mnc-element-inside">
                      <div className="mnc-element-left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9 8.25C8.80109 8.25 8.61033 8.32902 8.46967 8.46967C8.32902 8.61032 8.25 8.80109 8.25 9V12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61033 12.671 8.80109 12.75 9 12.75C9.19892 12.75 9.38968 12.671 9.53033 12.5303C9.67099 12.3897 9.75 12.1989 9.75 12V9C9.75 8.80109 9.67099 8.61032 9.53033 8.46967C9.38968 8.32902 9.19892 8.25 9 8.25ZM9.285 5.31C9.10241 5.23499 8.8976 5.23499 8.715 5.31C8.62294 5.3457 8.53883 5.39922 8.4675 5.4675C8.40126 5.5404 8.34798 5.62411 8.31 5.715C8.26802 5.80401 8.24747 5.90162 8.25 6C8.24943 6.0987 8.26835 6.19655 8.30568 6.28793C8.343 6.37931 8.39799 6.46242 8.4675 6.5325C8.5404 6.59875 8.62411 6.65202 8.715 6.69C8.82863 6.73668 8.95198 6.75474 9.07421 6.74258C9.19645 6.73043 9.31383 6.68844 9.41604 6.6203C9.51825 6.55216 9.60215 6.45996 9.66039 6.3518C9.71862 6.24364 9.74939 6.12284 9.75 6C9.74724 5.80142 9.66955 5.61123 9.5325 5.4675C9.46118 5.39922 9.37707 5.3457 9.285 5.31ZM9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5V1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15V15Z"
                            fill="#242424"
                          />
                        </svg>
                        <p>Information</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M8.25 1.5C6.76664 1.5 5.3166 1.93987 4.08323 2.76398C2.84986 3.58809 1.88856 4.75943 1.32091 6.12987C0.75325 7.50032 0.604725 9.00832 0.894114 10.4632C1.1835 11.918 1.89781 13.2544 2.9467 14.3033C3.9956 15.3522 5.33197 16.0665 6.78683 16.3559C8.24168 16.6453 9.74968 16.4968 11.1201 15.9291C12.4906 15.3614 13.6619 14.4001 14.486 13.1668C15.3101 11.9334 15.75 10.4834 15.75 9C15.75 8.01509 15.556 7.03982 15.1791 6.12987C14.8022 5.21993 14.2497 4.39314 13.5533 3.6967C12.8569 3.00026 12.0301 2.44781 11.1201 2.0709C10.2102 1.69399 9.23492 1.5 8.25 1.5V1.5ZM8.25 15C7.06332 15 5.90328 14.6481 4.91658 13.9888C3.92989 13.3295 3.16085 12.3925 2.70673 11.2961C2.2526 10.1997 2.13378 8.99334 2.36529 7.82946C2.5968 6.66557 3.16825 5.59647 4.00736 4.75736C4.84648 3.91824 5.91558 3.3468 7.07946 3.11529C8.24335 2.88378 9.44975 3.0026 10.5461 3.45672C11.6425 3.91085 12.5795 4.67988 13.2388 5.66658C13.8981 6.65327 14.25 7.81331 14.25 9C14.25 10.5913 13.6179 12.1174 12.4926 13.2426C11.3674 14.3679 9.8413 15 8.25 15V15ZM10.575 9.4725L9 8.565V5.25C9 5.05109 8.92099 4.86032 8.78033 4.71967C8.63968 4.57902 8.44892 4.5 8.25 4.5C8.05109 4.5 7.86033 4.57902 7.71967 4.71967C7.57902 4.86032 7.5 5.05109 7.5 5.25V9C7.5 9 7.5 9.06 7.5 9.09C7.50444 9.14168 7.5171 9.19231 7.5375 9.24C7.55295 9.2845 7.57306 9.32724 7.5975 9.3675C7.61803 9.41013 7.64318 9.45037 7.6725 9.4875L7.7925 9.585L7.86 9.6525L9.81 10.7775C9.92431 10.8423 10.0536 10.8759 10.185 10.875C10.3511 10.8762 10.5128 10.8222 10.6449 10.7215C10.777 10.6208 10.8719 10.4792 10.9148 10.3187C10.9577 10.1583 10.9461 9.98819 10.8819 9.83503C10.8177 9.68188 10.7045 9.55437 10.56 9.4725H10.575Z"
              fill="#242424"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 8.25C8.80109 8.25 8.61033 8.32902 8.46967 8.46967C8.32902 8.61032 8.25 8.80109 8.25 9V12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61033 12.671 8.80109 12.75 9 12.75C9.19892 12.75 9.38968 12.671 9.53033 12.5303C9.67099 12.3897 9.75 12.1989 9.75 12V9C9.75 8.80109 9.67099 8.61032 9.53033 8.46967C9.38968 8.32902 9.19892 8.25 9 8.25ZM9.285 5.31C9.10241 5.23499 8.8976 5.23499 8.715 5.31C8.62294 5.3457 8.53883 5.39922 8.4675 5.4675C8.40126 5.5404 8.34798 5.62411 8.31 5.715C8.26802 5.80401 8.24747 5.90162 8.25 6C8.24943 6.0987 8.26835 6.19655 8.30568 6.28793C8.343 6.37931 8.39799 6.46242 8.4675 6.5325C8.5404 6.59875 8.62411 6.65202 8.715 6.69C8.82863 6.73668 8.95198 6.75474 9.07421 6.74258C9.19645 6.73043 9.31383 6.68844 9.41604 6.6203C9.51825 6.55216 9.60215 6.45996 9.66039 6.3518C9.71862 6.24364 9.74939 6.12284 9.75 6C9.74724 5.80142 9.66955 5.61123 9.5325 5.4675C9.46118 5.39922 9.37707 5.3457 9.285 5.31ZM9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5V1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15V15Z"
              fill="#242424"
            />
          </svg>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
            color="secondary"
          >
            Save
          </Button>
          <Button
            onClick={handleSaveTemplate}
            variant="contained"
            startIcon={<SaveIcon />}
            color="secondary"
            className="btn"
          >
            Save as Template
          </Button> */}
        </div>
      </div>
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        placeholder={`Write something here...`}
        holder={`${tab.id}`}
        data={blockValue}
        defaultValue={blockValue}
        // onChange={() => {
        //   handleChange();
        // }}
      ></ReactEditorJS>
    </div>
  );
};

// Return the CustomEditor to use by other components.

export default CustomEditor;
