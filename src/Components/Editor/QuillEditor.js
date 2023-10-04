import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import mention from "quill-mention";
import { Toaster, toast } from "react-hot-toast";
import { Box, Drawer, Tooltip } from "@mui/material";
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
import { listMySamples } from "../../redux/actions/sampleActions";
import axios from "axios";
import { PROJECT_CREATE_COLLAB_RESET } from "../../redux/constants/projectConstants";
import {
  createCollabProject,
  getProjectDetails,
} from "../../redux/actions/projectActions";
import ProjectSettings from "../ProjectSettings/ProjectSettings";
import DrawerEdit from "./Drawer/DrawerEdit";
import _ from "lodash";
import QuillCursors from "quill-cursors";
import Loader from "../../css/utils/Loader";
import SpreadSheetName from "./Drawer/SpreadSheetName";
import { listMyEntries } from "../../redux/actions/entryActions";
import NewSpreadSheet from "../Modals/NewSpreadSheet";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  Spreadsheet,
  SpreadsheetComponent,
} from "@syncfusion/ej2-react-spreadsheet";
import ReactDOMServer from "react-dom/server";
// import ImageResize from "quill-image-resize-module-react";
import ImageResize from "quill-image-resize";
import { addEntryVc } from "../Functions/addVcEntry";
import DrawerVesionControl from "./Drawer/DrawerVesionControl";
import ReactQuill from "react-quill";
import NewTwoSpreadSheet from "../Modals/NewTwoSpreadsheet";
import { useLocation, useNavigate } from "react-router-dom";
import WarningModal from "../Modals/WarningModal";
import { listMySops } from "../../redux/actions/sopActions";
import { listMyProtocols } from "../../redux/actions/protocolActions";

// import ImageResize from "quill-image-resize-module-react";
// Quill.register("modules/imageResize", ImageResize);

var Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"];
Quill.register(Size, true);
Quill.register("modules/imageResize", ImageResize);

const QuillToolbar = (id) => (
  <div id={`toolbar`}>
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
        <option value="inter">Inter</option>
        <option value="roboto">Roboto</option>
        <option value="open-sans">Open Sans</option>
        <option value="karla">Karla</option>
      </select>
      {/* <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select> */}
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
        <option value="5">H5</option>
        <option value="6">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <Tooltip title="Bold">
        <button className="ql-bold" />
      </Tooltip>
      <Tooltip title="Italic">
        <button className="ql-italic" />
      </Tooltip>
      <Tooltip title="Underline">
        <button className="ql-underline" />
      </Tooltip>
      <Tooltip title="Strike">
        <button className="ql-strike" />
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="Ordered List">
        <button className="ql-list" value="ordered" />
      </Tooltip>
      <Tooltip title="Bulleted List">
        <button className="ql-list" value="bullet" />
      </Tooltip>
      <Tooltip title="Indent -1">
        <button className="ql-indent" value="-1" />
      </Tooltip>
      <Tooltip title="Indent +1">
        <button className="ql-indent" value="+1" />
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="Super Script">
        <button className="ql-script" value="super" />
      </Tooltip>
      <Tooltip title="Sub script">
        <button className="ql-script" value="sub" />
      </Tooltip>
      <Tooltip title="Blockquote">
        <button className="ql-blockquote" />
      </Tooltip>
      <Tooltip title="Direction">
        <button className="ql-direction" />
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="Align">
        <select className="ql-align" />
      </Tooltip>
      <Tooltip title="Color">
        <select className="ql-color" />
      </Tooltip>
      <Tooltip title="Background color">
        <select className="ql-background" />
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="Link">
        <button className="ql-link" />
      </Tooltip>
      <Tooltip title="Video">
        <button className="ql-video" />
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="Code Block">
        <button className="ql-code-block" />
      </Tooltip>

      <Tooltip title="Clean">
        <button className="ql-clean" />
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="File">
        <button className="ql-fileUploadAttach"></button>
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="Image">
        <button className="ql-igAttach"></button>
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip title="Spreadsheet">
        <button className="ql-img"></button>
      </Tooltip>
    </span>
  </div>
);

function TextEditor({
  tab,
  active,
  project,
  userType,
  setProjectSettings,
  setNewCollab,
  setProjectUpdatedProfilers,
  setUpdatedUserCollabRole,
  setEntryUpdate,
  setWhichTabisActive,
  setSampleContent,
  setSampleModal,
}) {
  const luckysheet = window.luckysheet;
  const pdfRef = useRef();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSpreadSheetOpen, setIsSpreadSheetOpen] = useState(false);
  const [drawerInformations, setDrawerInformations] = useState(false);
  const [isDrawerEdit, setIsDrawerEdit] = useState(false);
  const [isDrawerVersionControl, setIsDrawerVersionControl] = useState(false);
  const [loader, setLoader] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState();
  const [file, setFile] = useState();
  const [clicked, setClicked] = useState(false);
  const [versionControlTab, setVersionControlTab] = useState(false);
  const [versionControlValue, setVersionControlValue] = useState();
  const [spreadSheetName, setSpreadsheeName] = useState(false);
  const [spreadsheetNameInside, setSpreadsheetNameInside] = useState();
  const [originalContent, setOriginalContent] = useState();
  const [warningModal, setWarningModal] = useState(false);
  const fileRef = useRef();
  const [loadingQuill, setLoadingQuill] = useState(false);
  const fileRefImage = useRef();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const [usersEditing, setUsersEditing] = useState([]);
  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;

  const protocolListMy = useSelector((state) => state.protocolListMy);
  const {
    protocols,
    loading: loadingProtocols,
    error: errorProtocols,
  } = protocolListMy;

  const sopListMy = useSelector((state) => state.sopListMy);
  const { sops, loading: loadingSops, error: errorSops } = sopListMy;

  const orgListMy = useSelector((state) => state.orgListMy);
  const { orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project: mainProjectList } = projectDetails;

  const findOrg =
    orgs && orgs.length > 0
      ? orgs[0]
      : orgsCollab && orgsCollab.length > 0
      ? orgsCollab[0]
      : null;

  useEffect(() => {
    dispatch(listMySamples(userInfo._id));
    dispatch(getProjectDetails(project._id));
    dispatch(listMyEntries(project._id));
    dispatch(listMyProtocols(userInfo._id));
    dispatch(listMySops(userInfo._id));
  }, [dispatch, tab]);

  const [sampleOptions, setSampleOptions] = useState(
    samples
      ? samples.map(({ _id: id, data: value }) => ({
          id,
          value: JSON.parse(value).sampleName,
        }))
      : []
  );

  const [protocolOptions, setProtocolOptions] = useState(
    protocols
      ? protocols.map(({ _id: id, title: value }) => ({
          id,
          value,
        }))
      : []
  );

  const [sopOptions, setSopOptions] = useState();

  const [userCollabs, setUserCollabs] = useState(
    mainProjectList &&
      mainProjectList.collaborators &&
      mainProjectList.collaborators.length > 0
      ? mainProjectList.collaborators.map(
          ({ user: id, userName: value, user: slug }) => ({
            id,
            value,
            slug: `/v/${slug}`,
          })
        )
      : []
  );
  //findOrg

  const [userOrgCollabs, setOrgCollabs] = useState(
    findOrg && findOrg.collaborators && findOrg.collaborators.length > 0
      ? findOrg.collaborators.map(
          ({ user: id, userName: value, user: slug }) => ({
            id,
            value,
            slug: `/v/${slug}`,
          })
        )
      : []
  );

  const commonUsers = _.unionBy(userCollabs, userOrgCollabs, "id");
  const atValues =
    commonUsers &&
    sampleOptions &&
    commonUsers.concat(sampleOptions) &&
    protocolOptions &&
    commonUsers.concat(sampleOptions).concat(protocolOptions);
  const hashValues = [
    { id: 3, value: "Fredrik Sundqvist 2" },
    { id: 4, value: "Patrik Sjölin 2" },
  ];

  const SAVE_INTERVAL_MS = 2000;
  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: ["", "arial", "inter", "roboto", "open-sans", "karla"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
    ["video"],
    ["img"],
    ["fileUploadAttach"],
    ["igAttach"],
  ];

  console.log(userType);

  const toolbarRef = useRef(null);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null || toolbarRef == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    editor.setAttribute("id", tab._id);
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        // toolbar: {
        //   toolbar: `#toolbar`,
        //   handlers: {},
        // },

        imageResize: {
          parchment: Quill.import("parchment"),
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
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
    setQuill(q);
  }, []);

  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    setLoader(true);
    const newData = JSON.stringify(quill.getContents());
    const data = {
      name: tab.name,
      description: tab.name,
      blocks: newData,
    };
    await dispatch(createEntryTemplate(data));
    setLoader(false);
    toast.success("Entry Template saved successfully");
    // console.log(localStorage.getItem("tab"));
    // console.log(localStorage.getItem("project"));
  };

  // function imageHandler() {
  //   var range = this.quill.getSelection();
  //   var value = prompt("What is the image URL");
  //   this.quill.insertEmbed(range.index, "image", value);
  // }
  useEffect(() => {
    if (quill == null) return;
    if (document.querySelector(".ql-img")) {
      document.querySelector(
        ".ql-img"
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M15.75 1.5H2.25C2.05109 1.5 1.86032 1.57902 1.71967 1.71967C1.57902 1.86032 1.5 2.05109 1.5 2.25V15.75C1.5 15.9489 1.57902 16.1397 1.71967 16.2803C1.86032 16.421 2.05109 16.5 2.25 16.5H15.75C15.9489 16.5 16.1397 16.421 16.2803 16.2803C16.421 16.1397 16.5 15.9489 16.5 15.75V2.25C16.5 2.05109 16.421 1.86032 16.2803 1.71967C16.1397 1.57902 15.9489 1.5 15.75 1.5V1.5ZM6 15H3V12H6V15ZM6 10.5H3V7.5H6V10.5ZM6 6H3V3H6V6ZM10.5 15H7.5V12H10.5V15ZM10.5 10.5H7.5V7.5H10.5V10.5ZM10.5 6H7.5V3H10.5V6ZM15 15H12V12H15V15ZM15 10.5H12V7.5H15V10.5ZM15 6H12V3H15V6Z" fill="black"/>
    </svg>`;
      document.querySelector(".ql-img").addEventListener("click", () => {
        if (!clicked) {
          setClicked(true);
          setSpreadsheeName(true);
        }
      });
    }
    if (document.querySelector(".ql-fileUploadAttach")) {
      document.querySelector(
        ".ql-fileUploadAttach"
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7.50085 13.1625L6.17335 14.4525C5.82526 14.8006 5.35314 14.9962 4.86085 14.9962C4.36857 14.9962 3.89645 14.8006 3.54835 14.4525C3.20026 14.1044 3.0047 13.6323 3.0047 13.14C3.0047 12.6477 3.20026 12.1756 3.54835 11.8275L6.95335 8.41501C7.28756 8.07972 7.73787 7.88572 8.21111 7.87315C8.68436 7.86059 9.14433 8.03042 9.49585 8.34751L9.58585 8.42251C9.72808 8.56175 9.91979 8.63879 10.1188 8.63668C10.3178 8.63457 10.5079 8.55348 10.6471 8.41126C10.7863 8.26904 10.8634 8.07733 10.8613 7.8783C10.8592 7.67928 10.7781 7.48925 10.6359 7.35001C10.5935 7.29528 10.5485 7.24271 10.5009 7.19251C9.86062 6.63549 9.0326 6.34265 8.18453 6.37328C7.33646 6.40392 6.53173 6.75575 5.93335 7.35751L2.48335 10.77C1.89712 11.4081 1.58007 12.248 1.59841 13.1143C1.61675 13.9806 1.96906 14.8064 2.58178 15.4191C3.19449 16.0318 4.02023 16.3841 4.88654 16.4025C5.75285 16.4208 6.59276 16.1037 7.23085 15.5175L8.52835 14.25C8.65647 14.1102 8.72689 13.9272 8.72546 13.7376C8.72403 13.548 8.65085 13.366 8.52064 13.2281C8.39043 13.0903 8.21286 13.0069 8.02365 12.9948C7.83445 12.9826 7.64765 13.0425 7.50085 13.1625V13.1625ZM15.5184 2.48251C14.8874 1.85552 14.0341 1.5036 13.1446 1.5036C12.2551 1.5036 11.4018 1.85552 10.7709 2.48251L9.47335 3.75001C9.34524 3.88977 9.27482 4.07287 9.27625 4.26246C9.27768 4.45205 9.35086 4.63406 9.48107 4.77187C9.61128 4.90969 9.78885 4.99307 9.97805 5.00525C10.1673 5.01743 10.3541 4.95749 10.5009 4.83751L11.7984 3.54751C12.1465 3.19941 12.6186 3.00385 13.1109 3.00385C13.6031 3.00385 14.0753 3.19941 14.4234 3.54751C14.7714 3.89561 14.967 4.36773 14.967 4.86001C14.967 5.35229 14.7714 5.82441 14.4234 6.17251L11.0184 9.58501C10.6841 9.9203 10.2338 10.1143 9.76059 10.1269C9.28735 10.1394 8.82738 9.9696 8.47585 9.65251L8.38585 9.57751C8.24363 9.43827 8.05192 9.36123 7.8529 9.36334C7.65388 9.36545 7.46384 9.44654 7.3246 9.58876C7.18537 9.73098 7.10833 9.92269 7.11044 10.1217C7.11255 10.3207 7.19363 10.5108 7.33585 10.65C7.39033 10.7057 7.44792 10.7583 7.50835 10.8075C8.14936 11.3628 8.97702 11.6546 9.82458 11.624C10.6721 11.5934 11.4766 11.2427 12.0759 10.6425L15.4884 7.23001C16.1194 6.60307 16.4767 5.75193 16.4823 4.86245C16.4879 3.97296 16.1414 3.11738 15.5184 2.48251V2.48251Z" fill="black"/>
    </svg>`;
      document
        .querySelector(".ql-fileUploadAttach")
        .addEventListener("click", async () => {
          if (!clicked) {
            setClicked(true);
            fileRef.current.click();
          }
        });
    }
    if (document.querySelector(".ql-igAttach")) {
      document.querySelector(
        ".ql-igAttach"
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M14.25 3H3.75C3.15326 3 2.58097 3.23705 2.15901 3.65901C1.73705 4.08097 1.5 4.65326 1.5 5.25V12.75C1.5 13.3467 1.73705 13.919 2.15901 14.341C2.58097 14.7629 3.15326 15 3.75 15H14.25C14.8467 15 15.419 14.7629 15.841 14.341C16.2629 13.919 16.5 13.3467 16.5 12.75V5.25C16.5 4.65326 16.2629 4.08097 15.841 3.65901C15.419 3.23705 14.8467 3 14.25 3V3ZM3.75 13.5C3.55109 13.5 3.36032 13.421 3.21967 13.2803C3.07902 13.1397 3 12.9489 3 12.75V10.935L5.475 8.4675C5.6152 8.33008 5.80369 8.25311 6 8.25311C6.19631 8.25311 6.3848 8.33008 6.525 8.4675L11.5575 13.5H3.75ZM15 12.75C15 12.9489 14.921 13.1397 14.7803 13.2803C14.6397 13.421 14.4489 13.5 14.25 13.5H13.6725L10.815 10.6275L11.475 9.9675C11.6152 9.83008 11.8037 9.75311 12 9.75311C12.1963 9.75311 12.3848 9.83008 12.525 9.9675L15 12.435V12.75ZM15 10.32L13.59 8.9175C13.1625 8.50683 12.5928 8.27747 12 8.27747C11.4072 8.27747 10.8375 8.50683 10.41 8.9175L9.75 9.5775L7.59 7.4175C7.16254 7.00683 6.59277 6.77747 6 6.77747C5.40723 6.77747 4.83746 7.00683 4.41 7.4175L3 8.82V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H14.25C14.4489 4.5 14.6397 4.57902 14.7803 4.71967C14.921 4.86032 15 5.05109 15 5.25V10.32Z" fill="black"/>
    </svg>`;
      document
        .querySelector(".ql-igAttach")
        .addEventListener("click", async () => {
          if (!clicked) {
            setClicked(true);
            fileRefImage.current.click();
          }
        });
    }
  }, [
    document.querySelector(".ql-img"),
    document.querySelector(".ql-fileUploadAttach"),
    document.querySelector(".ql-igAttach"),
    quill,
  ]);

  const spreadSheetUploader = async (name) => {
    // quill.insertText(range.index, "\n", Quill.sources.USER);
    // quill.insertEmbed(
    //   range.index + 1,
    //   "button",
    //   {
    //     dataId: uuidv4(),
    //     id: "spreadsheet-opener",
    //   },
    //   Quill.sources.USER
    // );
    // quill.setSelection(range.index + 2, Quill.sources.SILENT);
  };

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
            width: "150",
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
      console.log(delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  console.log(usersEditing);

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
    if (socket == null || quill == null) return;
    socket.on("receive-user", (user) => {
      console.log(user);
    });
  }, [socket, quill]);

  useEffect(() => {
    const s = io(URL[0].substring(0, URL[0].length - 1));
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [tab._id]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", ({ document, user }) => {
      socket.emit("send-user", userInfo);
      setOriginalContent(document);
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", {
      documentId: tab._id,
      user: userInfo,
    });
  }, [socket, quill, tab]);

  //Update version control

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      // Display a confirmation message to the user
      event.preventDefault();
      if (originalContent) {
        const logObject = {
          entryId: tab._id,
          user: userInfo._id,
          userName: userInfo.name,
          userEmail: userInfo.email,
          oldData: JSON.stringify(originalContent && originalContent),
        };
        await addEntryVc(logObject);
      }

      event.returnValue = "Are you sure you want to leave this page?";

      // You can run your cleanup or other code here if needed
      // For example, save user data, send a request to the server, etc.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [originalContent]);

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

  useEffect(() => {
    if (quill == null) return;
    const handler = async () => {
      // const element = document.querySelectorAll("#spreadsheet-opener");
      // if (element) {
      //   element.forEach((e) => {
      //     e.innerHTML = `<div class="main-modal-spreadsheet" id="luckysheet-${e.getAttribute(
      //       "dataId"
      //     )}"></div>`;
      //   });
      // }
      // const lukcyelements = document.querySelectorAll(
      //   ".main-modal-spreadsheet"
      // );

      // lukcyelements.forEach((e) => {
      //   console.log(e.getAttribute("id"));
      //   if (e.getAttribute("id")) {
      //     var options = {
      //       container: e.getAttribute("id"), //luckysheet为容器id
      //       showinfobar: false,
      //       plugins: ["chart"],
      //       showsheetbar: false,
      //       data: [],
      //       // data: [sheetData],
      //       enableAddRow: true,
      //       showtoolbar: true,
      //       showtoolbarConfig: {
      //         chart: true, //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
      //         postil: false, //'comment'
      //         pivotTable: false, //'PivotTable'
      //         function: false, //'formula'
      //         frozenMode: false, //'freeze mode'
      //         protection: false, // 'Worksheet protection'
      //         print: false, // 'Print'
      //         link: false,
      //         currencyFormat: false,
      //         image: false,
      //         screenshot: false,
      //         splitColumn: false,
      //         dataVerification: false,
      //       },
      //       allowUpdate: false,
      //       enableAddBackTop: true,
      //     };
      //     luckysheet.create(options);
      //   }
      // });
      // if (e.target.id === "spreadsheet-opener") {
      //   e.innerHTML += html;
      //   // setSpreadsheetId(e.target.getAttribute("dataId"));
      //   // setSpreadsheetNameInside(e.target.getAttribute("dataName"));
      //   // setIsSpreadSheetOpen(true);
      // }
      // document.querySelector(".ql-editor").addEventListener("click", (e) => {});
      document.querySelector(".ql-editor").addEventListener("click", (e) => {
        if (e.target.id === "spreadsheet-opener") {
          setSpreadsheetId(e.target.getAttribute("dataId"));
          setSpreadsheetNameInside(e.target.getAttribute("dataName"));
          setIsSpreadSheetOpen(true);
        }
      });
    };

    quill.on("text-change", handler);
  }, [quill]);

  //handleMentionsPopupMenu
  useEffect(() => {
    if (quill == null || samples == null) return;
    const handler = async () => {
      document.querySelector(".ql-editor").addEventListener("click", (e) => {
        let elemnts = document.querySelectorAll(".mention");
        elemnts.forEach((ele) => {
          ele.addEventListener("click", () => {
            let sample = samples.find(
              (i) => i._id == ele.getAttribute("data-id")
            );

            if (sample) {
              setSampleContent(sample);
              setSampleModal(true);
            } else return;
          });
        });
      });
    };
    quill.on("text-change", handler);
  }, [quill, samples]);

  useEffect(() => {
    if (quill == null) return;
    if (document.querySelectorAll(".ql-formats button")) {
      document.querySelectorAll(".ql-formats button").forEach((ele) => {
        ele.addEventListener("mouseover", () => {});
      });
    }
  }, [document.querySelectorAll(".ql-formats button"), quill]);

  return (
    <div className={`editor-holder-reactjs ${active && "active"}`}>
      {warningModal && (
        <WarningModal
          setWarningModal={setWarningModal}
          versionControlValue={versionControlValue}
        />
      )}
      {spreadSheetName && (
        <SpreadSheetName
          setSpreadsheetNameInside={setSpreadsheetNameInside}
          setSpreadsheeName={setSpreadsheeName}
          quill={quill && quill}
        />
      )}
      {loader && <Loader />}
      {isSpreadSheetOpen && (
        <SpreadSheet
          id={spreadsheetId}
          name={spreadsheetNameInside}
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
        open={isDrawerVersionControl}
        onClose={() => setIsDrawerVersionControl(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerVesionControl
            doc={tab}
            project={project}
            setVersionControlValue={setVersionControlValue}
            setVersionControlTab={setVersionControlTab}
            setIsDrawerVersionControl={setIsDrawerVersionControl}
          />
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={isDrawerEdit}
        onClose={() => setIsDrawerEdit(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerEdit
            quill={quill}
            tab={tab}
            project={project}
            setEntryUpdate={setEntryUpdate}
            setWhichTabisActive={setWhichTabisActive}
          />
        </Box>
      </Drawer>
      {quill && (
        <Drawer
          anchor="right"
          open={drawerInformations}
          onClose={() => setDrawerInformations(false)}
        >
          <Box width="500px" p={2} role="presentation">
            <DrawerInformation
              quill={quill}
              tab={tab}
              project={project}
              pdfRef={pdfRef}
            />
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
            {usersEditing.length > 0 &&
              usersEditing.map((user) => (
                <li>
                  <img
                    src="https://ui-avatars.com/api/?background=random&name=Harsh%20Singh"
                    alt=""
                  />
                </li>
              ))}
            {versionControlTab ? (
              <>
                {" "}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setVersionControlTab(false);
                    }}
                    className="top-div-move-to-current-version"
                  >
                    Move to current version
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M11.3333 6.33329H4.93993L5.8066 5.47329C5.93213 5.34776 6.00266 5.1775 6.00266 4.99996C6.00266 4.82243 5.93213 4.65216 5.8066 4.52663C5.68106 4.40109 5.5108 4.33057 5.33326 4.33057C5.15573 4.33057 4.98547 4.40109 4.85993 4.52663L2.85993 6.52663C2.79924 6.59003 2.75166 6.66479 2.71993 6.74663C2.65325 6.90894 2.65325 7.09099 2.71993 7.25329C2.75166 7.33513 2.79924 7.40989 2.85993 7.47329L4.85993 9.47329C4.92191 9.53578 4.99564 9.58538 5.07688 9.61922C5.15812 9.65307 5.24526 9.67049 5.33326 9.67049C5.42127 9.67049 5.50841 9.65307 5.58965 9.61922C5.67089 9.58538 5.74462 9.53578 5.8066 9.47329C5.86908 9.41132 5.91868 9.33759 5.95253 9.25635C5.98637 9.17511 6.0038 9.08797 6.0038 8.99996C6.0038 8.91195 5.98637 8.82482 5.95253 8.74358C5.91868 8.66234 5.86908 8.5886 5.8066 8.52663L4.93993 7.66663H11.3333C11.5101 7.66663 11.6796 7.73687 11.8047 7.86189C11.9297 7.98691 11.9999 8.15648 11.9999 8.33329V11C11.9999 11.1768 12.0702 11.3463 12.1952 11.4714C12.3202 11.5964 12.4898 11.6666 12.6666 11.6666C12.8434 11.6666 13.013 11.5964 13.138 11.4714C13.263 11.3463 13.3333 11.1768 13.3333 11V8.33329C13.3333 7.80286 13.1226 7.29415 12.7475 6.91908C12.3724 6.54401 11.8637 6.33329 11.3333 6.33329V6.33329Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setWarningModal(true);
                      // setVersionControlTab(false);
                    }}
                    className="top-div-roll-to-current-version"
                  >
                    Roll back to current version
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M11.3333 6.33329H4.93993L5.8066 5.47329C5.93213 5.34776 6.00266 5.1775 6.00266 4.99996C6.00266 4.82243 5.93213 4.65216 5.8066 4.52663C5.68106 4.40109 5.5108 4.33057 5.33326 4.33057C5.15573 4.33057 4.98547 4.40109 4.85993 4.52663L2.85993 6.52663C2.79924 6.59003 2.75166 6.66479 2.71993 6.74663C2.65325 6.90894 2.65325 7.09099 2.71993 7.25329C2.75166 7.33513 2.79924 7.40989 2.85993 7.47329L4.85993 9.47329C4.92191 9.53578 4.99564 9.58538 5.07688 9.61922C5.15812 9.65307 5.24526 9.67049 5.33326 9.67049C5.42127 9.67049 5.50841 9.65307 5.58965 9.61922C5.67089 9.58538 5.74462 9.53578 5.8066 9.47329C5.86908 9.41132 5.91868 9.33759 5.95253 9.25635C5.98637 9.17511 6.0038 9.08797 6.0038 8.99996C6.0038 8.91195 5.98637 8.82482 5.95253 8.74358C5.91868 8.66234 5.86908 8.5886 5.8066 8.52663L4.93993 7.66663H11.3333C11.5101 7.66663 11.6796 7.73687 11.8047 7.86189C11.9297 7.98691 11.9999 8.15648 11.9999 8.33329V11C11.9999 11.1768 12.0702 11.3463 12.1952 11.4714C12.3202 11.5964 12.4898 11.6666 12.6666 11.6666C12.8434 11.6666 13.013 11.5964 13.138 11.4714C13.263 11.3463 13.3333 11.1768 13.3333 11V8.33329C13.3333 7.80286 13.1226 7.29415 12.7475 6.91908C12.3724 6.54401 11.8637 6.33329 11.3333 6.33329V6.33329Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a href="#">
                  Settings
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
                    <button
                      onClick={handleSaveTemplate}
                      className="mnc-element"
                    >
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
                        setIsDrawerEdit(true);
                      }}
                    >
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
                              d="M3.33398 12.0001H6.16065C6.24839 12.0006 6.33536 11.9838 6.41659 11.9506C6.49781 11.9175 6.57169 11.8686 6.63398 11.8068L11.2473 7.18679L13.1406 5.33346C13.2031 5.27148 13.2527 5.19775 13.2866 5.11651C13.3204 5.03527 13.3378 4.94813 13.3378 4.86012C13.3378 4.77211 13.3204 4.68498 13.2866 4.60374C13.2527 4.5225 13.2031 4.44876 13.1406 4.38679L10.314 1.52679C10.252 1.4643 10.1783 1.41471 10.097 1.38086C10.0158 1.34702 9.92866 1.32959 9.84065 1.32959C9.75264 1.32959 9.66551 1.34702 9.58427 1.38086C9.50303 1.41471 9.42929 1.4643 9.36732 1.52679L7.48732 3.41346L2.86065 8.03346C2.79886 8.09575 2.74998 8.16963 2.7168 8.25085C2.68363 8.33208 2.66681 8.41905 2.66732 8.50679V11.3335C2.66732 11.5103 2.73756 11.6798 2.86258 11.8049C2.9876 11.9299 3.15717 12.0001 3.33398 12.0001ZM9.84065 2.94012L11.7273 4.82679L10.7807 5.77346L8.89398 3.88679L9.84065 2.94012ZM4.00065 8.78012L7.95398 4.82679L9.84065 6.71346L5.88732 10.6668H4.00065V8.78012ZM14.0007 13.3335H2.00065C1.82384 13.3335 1.65427 13.4037 1.52925 13.5287C1.40422 13.6537 1.33398 13.8233 1.33398 14.0001C1.33398 14.1769 1.40422 14.3465 1.52925 14.4715C1.65427 14.5966 1.82384 14.6668 2.00065 14.6668H14.0007C14.1775 14.6668 14.347 14.5966 14.4721 14.4715C14.5971 14.3465 14.6673 14.1769 14.6673 14.0001C14.6673 13.8233 14.5971 13.6537 14.4721 13.5287C14.347 13.4037 14.1775 13.3335 14.0007 13.3335Z"
                              fill="black"
                            />
                          </svg>
                          <p>Edit Entry</p>
                        </div>
                      </div>
                    </button>
                    <button
                      className="mnc-element"
                      onClick={() => {
                        setIsDrawerVersionControl(true);
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
                              d="M9 15H3.75C3.55109 15 3.36032 14.921 3.21967 14.7803C3.07902 14.6397 3 14.4489 3 14.25V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H7.5V5.25C7.5 5.84674 7.73705 6.41903 8.15901 6.84099C8.58097 7.26295 9.15326 7.5 9.75 7.5H12V8.25C12 8.44891 12.079 8.63968 12.2197 8.78033C12.3603 8.92098 12.5511 9 12.75 9C12.9489 9 13.1397 8.92098 13.2803 8.78033C13.421 8.63968 13.5 8.44891 13.5 8.25V6.75C13.5 6.75 13.5 6.75 13.5 6.705C13.4922 6.6361 13.4771 6.56822 13.455 6.5025V6.435C13.4189 6.35788 13.3708 6.287 13.3125 6.225V6.225L8.8125 1.725C8.7505 1.66666 8.67962 1.61856 8.6025 1.5825C8.58011 1.57932 8.55739 1.57932 8.535 1.5825C8.45881 1.53881 8.37467 1.51076 8.2875 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V14.25C1.5 14.8467 1.73705 15.419 2.15901 15.841C2.58097 16.2629 3.15326 16.5 3.75 16.5H9C9.19891 16.5 9.38968 16.421 9.53033 16.2803C9.67098 16.1397 9.75 15.9489 9.75 15.75C9.75 15.5511 9.67098 15.3603 9.53033 15.2197C9.38968 15.079 9.19891 15 9 15ZM9 4.0575L10.9425 6H9.75C9.55109 6 9.36032 5.92098 9.21967 5.78033C9.07902 5.63968 9 5.44891 9 5.25V4.0575ZM5.25 6C5.05109 6 4.86032 6.07902 4.71967 6.21967C4.57902 6.36032 4.5 6.55109 4.5 6.75C4.5 6.94891 4.57902 7.13968 4.71967 7.28033C4.86032 7.42098 5.05109 7.5 5.25 7.5H6C6.19891 7.5 6.38968 7.42098 6.53033 7.28033C6.67098 7.13968 6.75 6.94891 6.75 6.75C6.75 6.55109 6.67098 6.36032 6.53033 6.21967C6.38968 6.07902 6.19891 6 6 6H5.25ZM16.2825 15.2175L15.405 14.3475C15.6855 13.8579 15.7977 13.2899 15.7246 12.7305C15.6514 12.171 15.3969 11.651 15 11.25V11.25C14.6348 10.8718 14.1641 10.6123 13.6493 10.5054C13.1345 10.3984 12.5994 10.449 12.1137 10.6506C11.6281 10.8521 11.2144 11.1953 10.9266 11.6353C10.6387 12.0753 10.4901 12.5918 10.5 13.1175C10.4974 13.5699 10.6132 14.0151 10.8357 14.409C11.0583 14.8028 11.3799 15.1317 11.7688 15.3628C12.1577 15.594 12.6002 15.7196 13.0525 15.727C13.5049 15.7343 13.9513 15.6234 14.3475 15.405L15.2175 16.2825C15.2872 16.3528 15.3702 16.4086 15.4616 16.4467C15.553 16.4847 15.651 16.5043 15.75 16.5043C15.849 16.5043 15.947 16.4847 16.0384 16.4467C16.1298 16.4086 16.2128 16.3528 16.2825 16.2825C16.3528 16.2128 16.4086 16.1298 16.4467 16.0384C16.4847 15.947 16.5043 15.849 16.5043 15.75C16.5043 15.651 16.4847 15.553 16.4467 15.4616C16.4086 15.3702 16.3528 15.2872 16.2825 15.2175V15.2175ZM13.905 13.905C13.6908 14.1064 13.4078 14.2186 13.1138 14.2186C12.8197 14.2186 12.5367 14.1064 12.3225 13.905C12.116 13.6949 12.0002 13.4121 12 13.1175C11.9984 12.9696 12.0269 12.8229 12.0836 12.6862C12.1403 12.5496 12.2241 12.4258 12.33 12.3225C12.53 12.1236 12.7981 12.0083 13.08 12C13.2316 11.9907 13.3836 12.0128 13.5262 12.065C13.6689 12.1171 13.7993 12.1982 13.9091 12.3032C14.019 12.4081 14.106 12.5346 14.1646 12.6747C14.2233 12.8149 14.2524 12.9656 14.25 13.1175C14.2438 13.4153 14.1197 13.6985 13.905 13.905V13.905ZM9.75 9H5.25C5.05109 9 4.86032 9.07902 4.71967 9.21967C4.57902 9.36032 4.5 9.55109 4.5 9.75C4.5 9.94891 4.57902 10.1397 4.71967 10.2803C4.86032 10.421 5.05109 10.5 5.25 10.5H9.75C9.94891 10.5 10.1397 10.421 10.2803 10.2803C10.421 10.1397 10.5 9.94891 10.5 9.75C10.5 9.55109 10.421 9.36032 10.2803 9.21967C10.1397 9.07902 9.94891 9 9.75 9ZM8.25 13.5C8.44891 13.5 8.63968 13.421 8.78033 13.2803C8.92098 13.1397 9 12.9489 9 12.75C9 12.5511 8.92098 12.3603 8.78033 12.2197C8.63968 12.079 8.44891 12 8.25 12H5.25C5.05109 12 4.86032 12.079 4.71967 12.2197C4.57902 12.3603 4.5 12.5511 4.5 12.75C4.5 12.9489 4.57902 13.1397 4.71967 13.2803C4.86032 13.421 5.05109 13.5 5.25 13.5H8.25Z"
                              fill="black"
                            />
                          </svg>
                          <p>Version Control</p>
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
                </div>
              </li>
            )}
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
      {/* <QuillToolbar /> */}
      {versionControlTab ? (
        <>
          {" "}
          <ReactQuill
            theme="snow"
            readOnly
            className={`container-editor-quill`}
            value={
              versionControlValue.oldData &&
              JSON.parse(versionControlValue.oldData)
            }
          />
        </>
      ) : (
        <>
          {loadingQuill ? (
            <div className="loader-div-main-stellr">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* <QuillToolbar ref={toolbarRef} /> */}
              <div
                className={`container-editor-quill`}
                id={`pdf-ref-${tab._id}`}
                ref={wrapperRef}
              ></div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TextEditor;
