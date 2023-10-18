import { useEffect, useRef, useState } from "react";
import React from "react";
// import EditorToolbar, { modules, formats } from "./EditorToolbar";
import ImageResize from "quill-image-resize-module-react";
import { Tooltip } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import CustomEmbedBlot from "./Tools/CustomReactBlot";
import RichTextEditor from "quill-react-commercial";
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
import ReactQuill, { Quill } from "react-quill";
import { AlertTriangle, Book, Cloud, FileText } from "lucide-react";
import { Fragment } from "react";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
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
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import htmlDocx from "html-docx-fixed/dist/html-docx";
import { saveAs } from "file-saver";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/darcula.css";
import "quill-mention";
import { pdfExporter } from "quill-to-pdf";
import { toast } from "sonner";

const BlockEmbed = Quill.import("blots/block/embed");

class CustomBulletList extends BlockEmbed {
  static blotName = "custom-bullet-list";
  static className = "ql-custom-bullet-list";
  static tagName = "ul";

  static create() {
    const node = super.create();
    node.innerHTML = "<li><br></li>"; // Initial list item with a line break
    return node;
  }
}

Quill.register(CustomBulletList, true);

const fileOptions = [
  {
    name: "Save as Template",
    slug: "saveAsTemplates",
  },
];

const exportOptions = [
  {
    name: "Microsoft Word (.docx)",
    slug: "docx",
  },
  {
    name: "PDF Document (.pdf)",
    slug: "pdf",
  },
  {
    name: "Web Page (.html)",
    slug: "html",
  },
  {
    name: "JavaScript Object Notation (.json)",
    slug: "json",
  },
];

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
  {
    name: "Automations",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: RefreshIcon,
  },
  {
    name: "Reports",
    description:
      "Get detailed reports that will help you make more informed decisions ",
    href: "#",
    icon: DocumentReportIcon,
  },
];
const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TextEditorTwo({
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
    return (quill.current = quillIns);
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

  console.log({
    ops: [
      {
        insert: `Hello world`,
      },
    ],
  });

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

  // Text to insert
  var newText = "This is some inserted text.";

  // Insert the text at the current position or at the end
  // quill.current &&
  //   quill.current.insertText(quill.current.getLength(), newText, "user");

  // useEffect(() => {
  //   CustomEmbedBlot();
  // }, []);

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
    toast.success("Saved as Template");
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
      let parent = document
        .getElementById(tab._id)
        .getElementsByClassName("ql-editor")[0];

      tribute.attach(parent);
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

  // useEffect(() => {
  //   if (document.querySelectorAll('li[data-list="bullet"]')) {
  //     let element = document.querySelectorAll('li[data-list="bullet"]')[0]
  //       .parentElement;
  //     let ul = document.createElement("ul");
  //     ul.innerHTML = element.innerHTML;
  //     console.log()
  //   }
  // }, [document.querySelectorAll('li[data-list="bullet"]')]);

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
              quill={quill.current}
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

        <Popover className="relative bg-white font-body">
          <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
            <div>
              <a href="#" className="flex">
                <FileText size={30} color="#2563eb" strokeWidth={1.5} />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
              <Popover.Group as="nav" className="flex space-x-10">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span>File</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 mt-3 px-2 w-screen max-w-lg sm:px-0">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              {fileOptions.map((item) => (
                                <a
                                  key={item.name}
                                  href="#"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    handleSaveTemplate();
                                    // if (item.slug === "saveAsTemplate") {
                                    //   console.log("clicked");

                                    // }
                                  }}
                                  className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                                >
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span>Export</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-lg sm:px-0">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              {exportOptions.map((item) => (
                                <a
                                  key={item.name}
                                  href="#"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    if (item.slug === "docx") {
                                      const quillContents =
                                        quill.current.root.innerHTML;

                                      var converted = htmlDocx.asBlob(
                                        quillContents
                                      );
                                      saveAs(converted, tab.name);
                                    } else if (item.slug === "pdf") {
                                      const delta = quill.current.getContents();
                                      const pdfAsBlob = await pdfExporter.generatePdf(
                                        delta
                                      );
                                      saveAs(pdfAsBlob, "pdf-export.pdf");
                                    }
                                  }}
                                  className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                                >
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  {/* <p className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                  </p> */}
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                {/* <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  View
                </a>
                <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Format
                </a>
                <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Tools
                </a>
                <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Extensions
                </a>

                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span>Help</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              {resources.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="-m-3 p-3 block rounded-md hover:bg-gray-50"
                                >
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover> */}
              </Popover.Group>
              <div className="flex items-center md:ml-12">
                {/* <a
                  href="#"
                  className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Submit for approval
                </a> */}
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-6">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">
                            {item.name}
                          </div>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Pricing
                    </a>

                    <a
                      href="#"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Docs
                    </a>

                    <a
                      href="#"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Enterprise
                    </a>
                    {resources.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign up
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        {/* <Disclosure
          as="nav"
          className="bg-white shadow"
          contentEditable="false"
        >
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
        </Disclosure> */}

        <RichTextEditor
          modules={{
            table: {},
            codeHighlight: true,
            toolbarOptions: [
              ["undo", "redo"],
              [
                {
                  font: ["arial", "inter", "roboto", "open-sans", "karla"],
                },
                { size: ["12px", "14px", "18px", "36px"] },
              ],
              [{ color: [] }, { background: [] }],
              ["bold", "italic", "underline", "strike"],
              [
                { list: "ordered" },
                // { list: "bullet" },
                // { list: "check" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] },
              ],
              [
                "blockquote",
                "code-block",
                "link",
                "image",
                { script: "sub" },
                { script: "super" },
                "table",
                "clean",
                // "custom-bullet-list",
              ],
            ],
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
          }}
          getQuill={getQuill}
          ref={quill}
          content={htmlData}
          placeholder=" "
        />
      </div>
    </>
  );
}

export default TextEditorTwo;
