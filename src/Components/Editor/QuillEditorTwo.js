import { useEffect, useRef, useState } from "react";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
// import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Tooltip } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import CustomEmbedBlot from "./Tools/CustomReactBlot";

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
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    console.log(value);
    setState({ value });
  };
  const quillRef = useRef();

  const insertCustomEmbed = () => {
    const value = '<div class="custom-embed">Custom Embed Content</div>';
    const quill = quillRef.current.getEditor();
    quill.insertEmbed(quill.getSelection(true).index, "custom-embed", value);
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        customEmbed: insertCustomEmbed,
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "custom-embed", // Include your custom embed blot format here
  ];

  const handleTextChange = (value) => {
    setText(value);
  };

  useEffect(() => {
    CustomEmbedBlot(); // Register the custom blot
  }, []);

  return (
    <div className={`editor-holder-reactjs ${active && "active"}`}>
      <div id="toolbar">
        <button className="ql-custom-embed">Insert Custom Embed</button>
      </div>
      <ReactQuill
        ref={quillRef}
        value={text}
        onChange={handleTextChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default TextEditorTwo;
