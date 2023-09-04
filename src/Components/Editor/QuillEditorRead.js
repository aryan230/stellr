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

// Quill.register("modules/imageUploader", ImageUploader);

function TextEditorRead({ tab, active, project, userType }) {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const [dataRead, setDataRead] = useState();
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

  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    const newData = JSON.stringify(quill.getContents());
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
    if (socket == null) return;
    if (!dataRead) {
      socket.once("load-document", (document) => {
        setDataRead(document);
        // quill.setContents(document);
        // quill.enable();
      });
      socket.emit("get-document", tab._id);
    }
  }, [socket, dataRead]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      console.log(quill.getContents());
      socket.emit("save-document", {
        data: quill.getContents(),
        user: userInfo._id,
      });
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);
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
      className={`editor-holder-reactjs ${active &&
        "active"} read-only-container-editor`}
    >
      {/* <div className="read-only-container-blur">
      
      </div> */}
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
      {quill && (
        <Drawer
          anchor="right"
          open={drawerInformations}
          onClose={() => setDrawerInformations(false)}
        >
          <Box width="500px" p={2} role="presentation">
            <DrawerInformation quill={quill} tab={tab} project={project} />
          </Box>
        </Drawer>
      )}
      <Toaster position="top-center" reverseOrder={true} />{" "}
      <div className="top-div-editor-holder">
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={(e) => {
            fileHandler(e);
          }}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileRefImage}
          style={{ display: "none" }}
          onChange={(e) => {
            fileImageHandler(e);
          }}
        />
        <div className="top-div-holder-editor-inside">
          <ul>
            <li>
              <a href="#">
                View Only
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14.6133 7.73334C13.2667 4.60667 10.7333 2.66667 8 2.66667C5.26667 2.66667 2.73333 4.60667 1.38667 7.73334C1.34996 7.81745 1.33101 7.90823 1.33101 8.00001C1.33101 8.09178 1.34996 8.18256 1.38667 8.26667C2.73333 11.3933 5.26667 13.3333 8 13.3333C10.7333 13.3333 13.2667 11.3933 14.6133 8.26667C14.65 8.18256 14.669 8.09178 14.669 8.00001C14.669 7.90823 14.65 7.81745 14.6133 7.73334V7.73334ZM8 12C5.88667 12 3.88667 10.4733 2.73333 8.00001C3.88667 5.52667 5.88667 4.00001 8 4.00001C10.1133 4.00001 12.1133 5.52667 13.2667 8.00001C12.1133 10.4733 10.1133 12 8 12ZM8 5.33334C7.47258 5.33334 6.95701 5.48974 6.51848 5.78275C6.07995 6.07577 5.73815 6.49225 5.53632 6.97952C5.33449 7.46679 5.28168 8.00296 5.38457 8.52025C5.48746 9.03753 5.74144 9.51268 6.11438 9.88562C6.48732 10.2586 6.96247 10.5125 7.47976 10.6154C7.99704 10.7183 8.53322 10.6655 9.02049 10.4637C9.50776 10.2619 9.92423 9.92006 10.2173 9.48153C10.5103 9.04299 10.6667 8.52742 10.6667 8.00001C10.6667 7.29276 10.3857 6.61448 9.88562 6.11439C9.38552 5.61429 8.70724 5.33334 8 5.33334V5.33334ZM8 9.33334C7.73629 9.33334 7.4785 9.25514 7.25924 9.10863C7.03997 8.96212 6.86908 8.75388 6.76816 8.51025C6.66724 8.26661 6.64084 7.99853 6.69228 7.73988C6.74373 7.48124 6.87072 7.24367 7.05719 7.0572C7.24366 6.87073 7.48124 6.74374 7.73988 6.69229C7.99852 6.64084 8.26661 6.66725 8.51024 6.76817C8.75388 6.86908 8.96212 7.03998 9.10862 7.25925C9.25513 7.47851 9.33333 7.7363 9.33333 8.00001C9.33333 8.35363 9.19286 8.69277 8.94281 8.94281C8.69276 9.19286 8.35362 9.33334 8 9.33334Z"
                    fill="#4D4D4D"
                  />
                </svg>
              </a>
              {/* <div className="drop-down-content">
                <div className="middle-navbar-container">
                  <button onClick={handleSaveTemplate} className="mnc-element">
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
                  </button>
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
                  <button
                    onClick={() => {
                      setDrawerInformations(true);
                    }}
                    className="mnc-element"
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
                            d="M9 8.25C8.80109 8.25 8.61033 8.32902 8.46967 8.46967C8.32902 8.61032 8.25 8.80109 8.25 9V12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61033 12.671 8.80109 12.75 9 12.75C9.19892 12.75 9.38968 12.671 9.53033 12.5303C9.67099 12.3897 9.75 12.1989 9.75 12V9C9.75 8.80109 9.67099 8.61032 9.53033 8.46967C9.38968 8.32902 9.19892 8.25 9 8.25ZM9.285 5.31C9.10241 5.23499 8.8976 5.23499 8.715 5.31C8.62294 5.3457 8.53883 5.39922 8.4675 5.4675C8.40126 5.5404 8.34798 5.62411 8.31 5.715C8.26802 5.80401 8.24747 5.90162 8.25 6C8.24943 6.0987 8.26835 6.19655 8.30568 6.28793C8.343 6.37931 8.39799 6.46242 8.4675 6.5325C8.5404 6.59875 8.62411 6.65202 8.715 6.69C8.82863 6.73668 8.95198 6.75474 9.07421 6.74258C9.19645 6.73043 9.31383 6.68844 9.41604 6.6203C9.51825 6.55216 9.60215 6.45996 9.66039 6.3518C9.71862 6.24364 9.74939 6.12284 9.75 6C9.74724 5.80142 9.66955 5.61123 9.5325 5.4675C9.46118 5.39922 9.37707 5.3457 9.285 5.31ZM9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5V1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15V15Z"
                            fill="#242424"
                          />
                        </svg>
                        <p>Information</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div> */}
            </li>
          </ul>
        </div>
      </div>
      <div className={`container-editor-quill`}>
        <ReactQuill theme="snow" readOnly value={dataRead && dataRead} />
      </div>
    </div>
  );
}

export default TextEditorRead;
