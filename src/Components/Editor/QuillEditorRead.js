import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import mention from "quill-mention";
import { Toaster } from "react-hot-toast";
import { Box, Drawer } from "@mui/material";
import { io } from "socket.io-client";
import { ImageHandler, VideoHandler, AttachmentHandler } from "quill-upload";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import ImageUploader from "quill-image-uploader";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import URL from "./../../Data/data.json";
import { v4 as uuidv4 } from "uuid";
import { SSBlot } from "./Tools/SpreadSheetContainer";
import SpreadSheet from "../Modals/SpreadSheet";
import { FileBlot } from "./Tools/FilePicker";
import { ImageBlot } from "./Tools/ImageContainer";
import DrawerInformation from "./Drawer/DrawerInformation";
import DrawerHistory from "./Drawer/DrawerHistory";
import { createEntryTemplate } from "../../redux/actions/entryTemplatesActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Book } from "lucide-react";
import { convertEntry } from "../Functions/convertEntry";
import { removeFromCart } from "../../redux/actions/cartActions";
import MainLoaderWithText from "../Loaders/MainLoaderWithText";

// Quill.register("modules/imageUploader", ImageUploader);

function TextEditorRead({
  tab,
  active,
  project,
  userType,
  setEntryUpdate,
  setWhichTabisActive,
}) {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const [dataRead, setDataRead] = useState("");
  const [value, setValue] = useState(dataRead ? dataRead : "");
  const [quill, setQuill] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSpreadSheetOpen, setIsSpreadSheetOpen] = useState(false);
  const [drawerInformations, setDrawerInformations] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState();
  const [file, setFile] = useState();
  const [clicked, setClicked] = useState(false);
  const fileRef = useRef();
  const fileRefImage = useRef();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  console.log(tab);
  const [userCollabs, setUserCollabs] = useState(
    project.collaborators && project.collaborators.length > 0
      ? project.collaborators.map(
          ({ user: id, userName: value, user: slug }) => ({
            id,
            value,
            slug: `/v/${slug}`,
          })
        )
      : []
  );

  const atValues = userCollabs;
  const hashValues = [
    { id: 3, value: "Fredrik Sundqvist 2" },
    { id: 4, value: "Patrik Sjölin 2" },
  ];
  const quillRef = useRef();
  const SAVE_INTERVAL_MS = 2000;
  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: ["", "times-new-roman", "arial", "inter"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["clean"],
    ["video"],
    ["img"],
    ["fileUploadAttach"],
    ["igAttach"],
  ];

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");

    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      readOnly: true,
      modules: {
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
        // imageUploader: {
        //   upload: (file) => {
        //     // return new Promise((resolve, reject) => {
        //     //   setTimeout(() => {
        //     //     resolve(
        //     //       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
        //     //     );
        //     //   }, 3500);
        //     // });
        //     return new Promise((resolve, reject) => {
        //       const imageRef = ref(storage, `images/${file.name + uuid()}`);
        //       uploadBytes(imageRef, file).then((snapshot) => {
        //         getDownloadURL(snapshot.ref).then((url) => {
        //           console.log(url);
        //           resolve(url);
        //         });
        //       });
        //     });
        //   },
        // },

        // imageHandler: {
        //   upload: (file) => {
        //     return new Promise((resolve, reject) => {
        //       const imageRef = ref(storage, `images/${file.name + uuid()}`);
        //       uploadBytes(imageRef, file).then((snapshot) => {
        //         getDownloadURL(snapshot.ref).then((url) => {
        //           resolve(url);
        //         });
        //       });
        //     });
        //     // return a Promise that resolves in a link to the uploaded image resolve(data.imageUrl)
        //   },
        // },
        // videoHandler: {
        //   upload: (file) => {
        //     // return a Promise that resolves in a link to the uploaded image
        //     return new Promise((resolve, reject) => {
        //       // ajax().then((data) => resolve(data.videoUrl));
        //     });
        //   },
        // },
        // attachmentHandler: {
        //   upload: (file) => {
        //     return new Promise((resolve, reject) => {
        //       const imageRef = ref(storage, `files/${file.name + uuid()}`);
        //       uploadBytes(imageRef, file).then((snapshot) => {
        //         getDownloadURL(snapshot.ref).then((url) => {
        //           console.log(url);
        //           resolve(url);
        //         });
        //       });
        //     });
        //   },
        // },

        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["@", "#"],
          source: function(searchTerm, renderList, mentionChar) {
            let values;

            if (mentionChar === "@") {
              values = atValues;
            } else {
              values = hashValues;
            }

            if (searchTerm.length === 0) {
              renderList(values, searchTerm);
            } else {
              const matches = [];
              for (let i = 0; i < values.length; i++)
                if (
                  ~values[i].value
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase())
                )
                  matches.push(values[i]);
              renderList(matches, searchTerm);
            }
          },
        },
      },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  const [mainLoader, setMainLoader] = useState(false);
  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    const newData = JSON.stringify(dataRead);
    const data = {
      name: tab.name,
      description: tab.name,
      blocks: newData,
    };
    await dispatch(createEntryTemplate(data));
    // console.log(localStorage.getItem("tab"));
    // console.log(localStorage.getItem("project"));
  };

  // function imageHandler() {
  //   var range = this.quill.getSelection();
  //   var value = prompt("What is the image URL");
  //   this.quill.insertEmbed(range.index, "image", value);
  // }
  // useEffect(() => {
  //   if (quill == null) return;
  //   if (document.querySelector(".ql-img")) {
  //     document.querySelector(
  //       ".ql-img"
  //     ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  //     <path d="M15.75 1.5H2.25C2.05109 1.5 1.86032 1.57902 1.71967 1.71967C1.57902 1.86032 1.5 2.05109 1.5 2.25V15.75C1.5 15.9489 1.57902 16.1397 1.71967 16.2803C1.86032 16.421 2.05109 16.5 2.25 16.5H15.75C15.9489 16.5 16.1397 16.421 16.2803 16.2803C16.421 16.1397 16.5 15.9489 16.5 15.75V2.25C16.5 2.05109 16.421 1.86032 16.2803 1.71967C16.1397 1.57902 15.9489 1.5 15.75 1.5V1.5ZM6 15H3V12H6V15ZM6 10.5H3V7.5H6V10.5ZM6 6H3V3H6V6ZM10.5 15H7.5V12H10.5V15ZM10.5 10.5H7.5V7.5H10.5V10.5ZM10.5 6H7.5V3H10.5V6ZM15 15H12V12H15V15ZM15 10.5H12V7.5H15V10.5ZM15 6H12V3H15V6Z" fill="black"/>
  //   </svg>`;
  //     document.querySelector(".ql-img").addEventListener("click", () => {
  //       let range = quill.getSelection(true);
  //       quill.insertText(range.index, "\n", Quill.sources.USER);
  //       quill.insertEmbed(
  //         range.index + 1,
  //         "button",
  //         {
  //           dataId: uuidv4(),
  //           id: "spreadsheet-opener",
  //         },
  //         Quill.sources.USER
  //       );
  //       quill.setSelection(range.index + 2, Quill.sources.SILENT);
  //     });
  //   }
  //   if (document.querySelector(".ql-fileUploadAttach")) {
  //     document.querySelector(
  //       ".ql-fileUploadAttach"
  //     ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  //     <path d="M7.50085 13.1625L6.17335 14.4525C5.82526 14.8006 5.35314 14.9962 4.86085 14.9962C4.36857 14.9962 3.89645 14.8006 3.54835 14.4525C3.20026 14.1044 3.0047 13.6323 3.0047 13.14C3.0047 12.6477 3.20026 12.1756 3.54835 11.8275L6.95335 8.41501C7.28756 8.07972 7.73787 7.88572 8.21111 7.87315C8.68436 7.86059 9.14433 8.03042 9.49585 8.34751L9.58585 8.42251C9.72808 8.56175 9.91979 8.63879 10.1188 8.63668C10.3178 8.63457 10.5079 8.55348 10.6471 8.41126C10.7863 8.26904 10.8634 8.07733 10.8613 7.8783C10.8592 7.67928 10.7781 7.48925 10.6359 7.35001C10.5935 7.29528 10.5485 7.24271 10.5009 7.19251C9.86062 6.63549 9.0326 6.34265 8.18453 6.37328C7.33646 6.40392 6.53173 6.75575 5.93335 7.35751L2.48335 10.77C1.89712 11.4081 1.58007 12.248 1.59841 13.1143C1.61675 13.9806 1.96906 14.8064 2.58178 15.4191C3.19449 16.0318 4.02023 16.3841 4.88654 16.4025C5.75285 16.4208 6.59276 16.1037 7.23085 15.5175L8.52835 14.25C8.65647 14.1102 8.72689 13.9272 8.72546 13.7376C8.72403 13.548 8.65085 13.366 8.52064 13.2281C8.39043 13.0903 8.21286 13.0069 8.02365 12.9948C7.83445 12.9826 7.64765 13.0425 7.50085 13.1625V13.1625ZM15.5184 2.48251C14.8874 1.85552 14.0341 1.5036 13.1446 1.5036C12.2551 1.5036 11.4018 1.85552 10.7709 2.48251L9.47335 3.75001C9.34524 3.88977 9.27482 4.07287 9.27625 4.26246C9.27768 4.45205 9.35086 4.63406 9.48107 4.77187C9.61128 4.90969 9.78885 4.99307 9.97805 5.00525C10.1673 5.01743 10.3541 4.95749 10.5009 4.83751L11.7984 3.54751C12.1465 3.19941 12.6186 3.00385 13.1109 3.00385C13.6031 3.00385 14.0753 3.19941 14.4234 3.54751C14.7714 3.89561 14.967 4.36773 14.967 4.86001C14.967 5.35229 14.7714 5.82441 14.4234 6.17251L11.0184 9.58501C10.6841 9.9203 10.2338 10.1143 9.76059 10.1269C9.28735 10.1394 8.82738 9.9696 8.47585 9.65251L8.38585 9.57751C8.24363 9.43827 8.05192 9.36123 7.8529 9.36334C7.65388 9.36545 7.46384 9.44654 7.3246 9.58876C7.18537 9.73098 7.10833 9.92269 7.11044 10.1217C7.11255 10.3207 7.19363 10.5108 7.33585 10.65C7.39033 10.7057 7.44792 10.7583 7.50835 10.8075C8.14936 11.3628 8.97702 11.6546 9.82458 11.624C10.6721 11.5934 11.4766 11.2427 12.0759 10.6425L15.4884 7.23001C16.1194 6.60307 16.4767 5.75193 16.4823 4.86245C16.4879 3.97296 16.1414 3.11738 15.5184 2.48251V2.48251Z" fill="black"/>
  //   </svg>`;
  //     document
  //       .querySelector(".ql-fileUploadAttach")
  //       .addEventListener("click", async () => {
  //         if (!clicked) {
  //           setClicked(true);
  //           fileRef.current.click();
  //         }
  //       });
  //   }
  //   if (document.querySelector(".ql-igAttach")) {
  //     document.querySelector(
  //       ".ql-igAttach"
  //     ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  //     <path d="M14.25 3H3.75C3.15326 3 2.58097 3.23705 2.15901 3.65901C1.73705 4.08097 1.5 4.65326 1.5 5.25V12.75C1.5 13.3467 1.73705 13.919 2.15901 14.341C2.58097 14.7629 3.15326 15 3.75 15H14.25C14.8467 15 15.419 14.7629 15.841 14.341C16.2629 13.919 16.5 13.3467 16.5 12.75V5.25C16.5 4.65326 16.2629 4.08097 15.841 3.65901C15.419 3.23705 14.8467 3 14.25 3V3ZM3.75 13.5C3.55109 13.5 3.36032 13.421 3.21967 13.2803C3.07902 13.1397 3 12.9489 3 12.75V10.935L5.475 8.4675C5.6152 8.33008 5.80369 8.25311 6 8.25311C6.19631 8.25311 6.3848 8.33008 6.525 8.4675L11.5575 13.5H3.75ZM15 12.75C15 12.9489 14.921 13.1397 14.7803 13.2803C14.6397 13.421 14.4489 13.5 14.25 13.5H13.6725L10.815 10.6275L11.475 9.9675C11.6152 9.83008 11.8037 9.75311 12 9.75311C12.1963 9.75311 12.3848 9.83008 12.525 9.9675L15 12.435V12.75ZM15 10.32L13.59 8.9175C13.1625 8.50683 12.5928 8.27747 12 8.27747C11.4072 8.27747 10.8375 8.50683 10.41 8.9175L9.75 9.5775L7.59 7.4175C7.16254 7.00683 6.59277 6.77747 6 6.77747C5.40723 6.77747 4.83746 7.00683 4.41 7.4175L3 8.82V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H14.25C14.4489 4.5 14.6397 4.57902 14.7803 4.71967C14.921 4.86032 15 5.05109 15 5.25V10.32Z" fill="black"/>
  //   </svg>`;
  //     document
  //       .querySelector(".ql-igAttach")
  //       .addEventListener("click", async () => {
  //         if (!clicked) {
  //           setClicked(true);
  //           fileRefImage.current.click();
  //         }
  //       });
  //   }
  // }, [
  //   document.querySelector(".ql-img"),
  //   document.querySelector(".ql-fileUploadAttach"),
  //   document.querySelector(".ql-igAttach"),
  //   quill,
  // ]);

  const fileHandler = async (e) => {
    let fileData = e.target.files[0];
    const imageRef = ref(storage, `files/${fileData.name + uuid()}`);
    uploadBytes(imageRef, fileData).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setClicked(false);
        console.log(url);
        let range = quill.getSelection(true);
        quill.insertText(range.index, "\n", Quill.sources.USER);
        quill.insertEmbed(
          range.index + 1,
          "attach",
          {
            title: fileData.name,
            href: url,
            id: "file-opener",
          },
          Quill.sources.USER
        );
        quill.setSelection(range.index + 2, Quill.sources.SILENT);
      });
    });
  };

  const fileImageHandler = async (e) => {
    let fileData = e.target.files[0];
    const imageRef = ref(storage, `files/${fileData.name + uuid()}`);
    uploadBytes(imageRef, fileData).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setClicked(false);
        let range = quill.getSelection(true);
        quill.insertText(range.index, "\n", Quill.sources.USER);
        quill.insertEmbed(
          range.index + 1,
          "ig",
          {
            src: url,
            id: "img",
          },
          Quill.sources.USER
        );
        quill.setSelection(range.index + 2, Quill.sources.SILENT);
      });
    });
  };

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source != "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    const s = io(URL[0].substring(0, URL[0].length - 1));
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quillRef.current == null) return;
    if (!dataRead) {
      socket.once("load-document", ({ document }) => {
        setDataRead(document);
      });
      socket.emit("get-document", {
        documentId: tab._id,
        user: userInfo,
      });
    }
  }, [socket, dataRead]);

  // useEffect(() => {
  //   if (socket == null || quill == null) return;
  //   const interval = setInterval(() => {
  //     console.log(quill.getContents());
  //     socket.emit("save-document", {
  //       data: quill.getContents(),
  //       user: userInfo._id,
  //     });
  //   }, SAVE_INTERVAL_MS);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [socket, quill]);
  // useEffect(() => {
  //   if (quill == null) return;
  //   const handler = async () => {
  //     document.querySelector(".ql-editor").addEventListener("click", (e) => {
  //       if (e.target.id === "spreadsheet-opener") {
  //         setSpreadsheetId(e.target.getAttribute("dataId"));
  //         setIsSpreadSheetOpen(true);
  //       }
  //     });
  //   };

  //   quill.on("text-change", handler);
  // }, [quill]);
  return (
    <div
      className={`editor-holder-reactjs-new ${active &&
        "active"} read-only-container-editor`}
    >
      {mainLoader && <MainLoaderWithText text="Converting your entry" />}
      <nav className="bg-white border-gray-200 border-b-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <Book size={24} color="#4d00aa" className="mr-3" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {tab.name}
              <span className="bg-gray-100 ml-2 text-gray-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded">
                Archived
              </span>
            </span>
          </a>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                setMainLoader(true);
                const html = quillRef.current.getEditor().root.innerHTML;
                let data = [
                  {
                    user: userInfo._id,
                    block: html,
                    date: Date.now(),
                  },
                ];
                let finalData = {
                  userInfo,
                  id: tab._id,
                  data: data,
                };
                await convertEntry(finalData);
                setMainLoader(false);
                await dispatch(removeFromCart(tab._id));
                setEntryUpdate(true);
                setWhichTabisActive("projectList");
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
            >
              Convert to Latest Version
            </button>
          </div>
        </div>
      </nav>
      {/* <div className="read-only-container-blur">
      
      </div> */}
      <div
        class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
        role="alert"
      >
        <span class="font-medium">Warning!</span>The current version of this
        entry is deprecated; please convert it to the latest version before
        making any edits.
      </div>
      {isSpreadSheetOpen && (
        <SpreadSheet
          id={spreadsheetId}
          setIsSpreadSheetOpen={setIsSpreadSheetOpen}
        />
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerHistory quill={quill} tab={tab} project={project} />
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={drawerInformations}
        onClose={() => setDrawerInformations(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerInformation quill={quill} tab={tab} project={project} />
        </Box>
      </Drawer>
      <Toaster position="top-center" reverseOrder={true} />{" "}
      <div className={`container-editor-quill`}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          readOnly
          value={dataRead}
          onChange={setValue}
        />
      </div>
    </div>
  );
}

export default TextEditorRead;
