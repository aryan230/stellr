import { useEffect, useRef, useState } from "react";
import React from "react";
// import EditorToolbar, { modules, formats } from "./EditorToolbar";
import ImageResize from "quill-image-resize-module-react";
import { Tooltip } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import CustomEmbedBlot from "./Tools/CustomReactBlot";
import Quill from "quill-react-commercial";
import URL from "./../../Data/data.json";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import "highlight.js/styles/darcula.css";
import Tribute from "tributejs";
import "quill-mention";
import { MentionBlot } from "./Tools/MentionBlot";
import { SSBlot } from "./Tools/SpreadSheetContainer";
import "tributejs/dist/tribute.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactQuill from "react-quill";
import { Book } from "lucide-react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import WarningModal from "../Modals/WarningModal";
import Loader from "../../css/utils/Loader";
import { Box, Drawer } from "@mui/material";
import DrawerInformation from "./Drawer/DrawerInformation";
import DrawerHistory from "./Drawer/DrawerHistory";
import DrawerEdit from "./Drawer/DrawerEdit";
import DrawerVesionControl from "./Drawer/DrawerVesionControl";
import { createEntryTemplate } from "../../redux/actions/entryTemplatesActions";
import { listMySamples } from "../../redux/actions/sampleActions";
import { getProjectDetails } from "../../redux/actions/projectActions";
import { listMyEntries } from "../../redux/actions/entryActions";
import { listMyProtocols } from "../../redux/actions/protocolActions";
import { listMySops } from "../../redux/actions/sopActions";
import _ from "lodash";
import CompleteLoader from "../Loaders/CompleteLoader";
import MainLoader from "../Loaders/MainLoader";
import MainLoaderWithText from "../Loaders/MainLoaderWithText";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

const QuillToolbar = (id) => (
  <div id={`#toolbar-${id}`}>
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
  </div>
);

function TextEditorTwoRead({
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
  const [text, setText] = useState("");
  const quill = useRef(null);
  const reactQuill = useRef(null);
  const [value, setValue] = useState();
  // useEffect(() => {
  //   if (quill.current) {
  //     const { Quill } = quill.current;
  //     // const customBlot = Quill.import("blots/block/embed");
  //   }
  // }, [quill]);

  const [socket, setSocket] = useState();
  const [htmlData, setHtmlData] = useState("");
  const [oldDelta, setOldDelta] = useState(true);

  const atValues = [
    { id: 1, value: "Fredrik Sundqvist" },
    { id: 2, value: "Patrik Sjölin" },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSpreadSheetOpen, setIsSpreadSheetOpen] = useState(false);
  const [drawerInformations, setDrawerInformations] = useState(false);
  const [isDrawerEdit, setIsDrawerEdit] = useState(false);
  const [isDrawerVersionControl, setIsDrawerVersionControl] = useState(false);
  const [loader, setLoader] = useState(false);
  const [versionControlTab, setVersionControlTab] = useState(false);
  const [versionControlValue, setVersionControlValue] = useState();
  const [originalContent, setOriginalContent] = useState();
  const [warningModal, setWarningModal] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const hashValues = [
    { id: 3, value: "Fredrik Sundqvist 2" },
    { id: 4, value: "Patrik Sjölin 2" },
  ];

  const getQuill = (quillIns) => {
    quill.current = quillIns;
  };
  const dispatch = useDispatch();

  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    console.log(value);
    setState({ value });
  };
  const quillRef = useRef();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  const insertCustomEmbed = () => {
    const value = '<div class="custom-embed">Custom Embed Content</div>';
    const quill = quillRef.current.getEditor();
    quill.insertEmbed(quill.getSelection(true).index, "custom-embed", value);
  };

  function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  const SAVE_INTERVAL_MS = 2000;

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: ["", "arial", "inter", "roboto", "open-sans", "karla"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["blockquote", "code-block", "image"],
    ["link"],
    ["clean"],
    ["video"],
    ["img"],
    ["fileUploadAttach"],
    ["igAttach"],
  ];

  // const modules = {
  //   toolbar: TOOLBAR_OPTIONS,
  // };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  const handleTextChange = (value) => {
    setText(value);
  };

  useEffect(() => {
    CustomEmbedBlot(); // Register the custom blot
  }, []);

  // useEffect(() => {
  //   const handler = (delta, oldDelta, source) => {
  //     console.log(delta);
  //   };
  //   quill.current.on("text-change", handler);
  // }, [quill]);
  const handleSaveTemplate = async () => {
    setLoader(true);
    const newData = JSON.stringify(quill.current.getContents());
    const data = {
      name: tab.name,
      description: tab.name,
      blocks: newData,
    };
    await dispatch(createEntryTemplate(data));
    setLoader(false);

    // console.log(localStorage.getItem("tab"));
    // console.log(localStorage.getItem("project"));
  };

  useEffect(() => {
    if (socket == null || quill.current == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source != "user") return;
      socket.emit("send-changes", delta);
      console.log(delta);
    };
    quill.current.on("text-change", handler);

    return () => {
      quill.current.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill.current == null) return;
    const handler = (delta) => {
      quill.current.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-change", handler);
    };
  }, [socket, quill]);

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project: mainProjectList } = projectDetails;
  const orgListMy = useSelector((state) => state.orgListMy);
  const { orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;
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

  const [userCollabs, setUserCollabs] = useState(
    mainProjectList &&
      mainProjectList.collaborators &&
      mainProjectList.collaborators.length > 0
      ? mainProjectList.collaborators.map(({ userName: key, user: value }) => ({
          key,
          value,
        }))
      : []
  );

  const [userOrgCollabs, setOrgCollabs] = useState(
    findOrg && findOrg.collaborators && findOrg.collaborators.length > 0
      ? findOrg.collaborators.map(({ userName: key, user: value }) => ({
          key,
          value,
        }))
      : []
  );

  const commonUsers = _.unionBy(userCollabs, userOrgCollabs, "value");

  console.log(commonUsers && commonUsers);
  var tribute;
  useEffect(() => {
    if (commonUsers) {
      tribute = new Tribute({
        values: commonUsers ? commonUsers : [],
        lookup: "key",
        fillAttr: "value",
        menuItemTemplate: (item) => {
          return `<span class="tribute-item">${item.original.key}</span>`;
        },
        selectTemplate: (item) => {
          return `<p class="mention-here" contenteditable="false">@${item.original.key}</p>`;
        },
      });
    }
  }, [commonUsers]);

  useEffect(() => {
    if (document.getElementById(tab._id)) {
      tribute.attach(document.getElementById(tab._id));
    }
  }, [document.getElementById(tab._id)]);

  useEffect(() => {
    if (socket == null || quill.current == null) return;
    if (!mainLoader) {
      const interval = setInterval(() => {
        console.log(quill.current.getContents());
        socket.emit("save-document", {
          data: quill.current.getContents(),
          user: userInfo._id,
        });
      }, SAVE_INTERVAL_MS);

      return () => {
        clearInterval(interval);
      };
    }
  }, [socket, quill, mainLoader]);

  useEffect(() => {
    const s = io(URL[0].substring(0, URL[0].length - 1), {
      maxHttpBufferSize: 1e8,
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [tab._id]);

  useEffect(() => {
    if (socket == null || quill.current == null) return;
    socket.once("load-document", ({ document, user }) => {
      socket.emit("send-user", userInfo);
      console.log(document);
      if (typeof document === "string") {
        setHtmlData(document);
        setMainLoader(false);
      } else {
        setHtmlData(document);
        setMainLoader(false);
      }
      quill.current.enable();
    });
    socket.emit("get-document", {
      documentId: tab._id,
      user: userInfo,
    });
  }, [socket, quill, tab, value]);

  const modules = 1;

  return (
    <>
      {warningModal && (
        <WarningModal
          setWarningModal={setWarningModal}
          versionControlValue={versionControlValue}
        />
      )}

      {loader && <Loader />}

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
              setEntryUpdate={setEntryUpdate}
              setWhichTabisActive={setWhichTabisActive}
            />
          </Box>
        </Drawer>
      )}

      <div
        className={`editor-holder-reactjs-new ${active && "active"}`}
        id={tab._id}
      >
        {mainLoader && <MainLoaderWithText text="Getting your entry ready" />}

        <Disclosure
          as="nav"
          className="bg-white shadow"
          contentEditable="false"
        >
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <Book size={16} color="#4d00aa" className="mr-3" />
                      {tab.name}
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setDrawerInformations(true);
                        }}
                        className="border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        View Information
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDrawerOpen(true);
                        }}
                        className="border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        View History
                      </a>
                      <a
                        href="#"
                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Version Control
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDrawerEdit(true);
                        }}
                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Edit Entry
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSaveTemplate();
                        }}
                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Save as Template
                      </a>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-4 space-y-1">
                  {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Dashboard
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Team
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Projects
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Calendar
                  </Disclosure.Button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Quill
          modules={{
            table: {},
            codeHighlight: true,
          }}
          getQuill={getQuill}
          ref={quill}
          content={htmlData}
          readOnly={true}
        />
      </div>
    </>
  );
}

export default TextEditorTwoRead;
