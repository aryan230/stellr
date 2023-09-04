import React from "react";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import { Tooltip } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import "./Tools/CustomEmbedBlot";
Quill.register("modules/imageResize", ImageResize);
// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

function insertCustomEmbed() {
  let range = this.quill.getSelection(true);
  console.log("not  workign");
  const value = '<div class="custom-embed">Custom Embed Content</div>';
  this.quill.insertEmbed(range.index + 1, "custom-embed", value);
}

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
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
// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

function uploadFile() {
  let range = this.quill.getSelection(true);
  this.quill.insertText(range.index, "\n", Quill.sources.USER);
  this.quill.insertEmbed(
    range.index + 1,
    "attach",
    {
      title: "name of file",
      href: "url of file",
      id: "file-opener",
    },
    Quill.sources.USER
  );
  this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
}

// Add sizes to whitelist and register them
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      fileUploadAttach: insertCustomEmbed,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
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
// Quill Toolbar component
const QuillToolbar = () => (
  <div id="toolbar">
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
      <Tooltip title="bold">
        <button className="ql-bold" />
      </Tooltip>

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
    <span className="ql-formats">
      <button className="ql-fileUploadAttach">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M7.50085 13.1625L6.17335 14.4525C5.82526 14.8006 5.35314 14.9962 4.86085 14.9962C4.36857 14.9962 3.89645 14.8006 3.54835 14.4525C3.20026 14.1044 3.0047 13.6323 3.0047 13.14C3.0047 12.6477 3.20026 12.1756 3.54835 11.8275L6.95335 8.41501C7.28756 8.07972 7.73787 7.88572 8.21111 7.87315C8.68436 7.86059 9.14433 8.03042 9.49585 8.34751L9.58585 8.42251C9.72808 8.56175 9.91979 8.63879 10.1188 8.63668C10.3178 8.63457 10.5079 8.55348 10.6471 8.41126C10.7863 8.26904 10.8634 8.07733 10.8613 7.8783C10.8592 7.67928 10.7781 7.48925 10.6359 7.35001C10.5935 7.29528 10.5485 7.24271 10.5009 7.19251C9.86062 6.63549 9.0326 6.34265 8.18453 6.37328C7.33646 6.40392 6.53173 6.75575 5.93335 7.35751L2.48335 10.77C1.89712 11.4081 1.58007 12.248 1.59841 13.1143C1.61675 13.9806 1.96906 14.8064 2.58178 15.4191C3.19449 16.0318 4.02023 16.3841 4.88654 16.4025C5.75285 16.4208 6.59276 16.1037 7.23085 15.5175L8.52835 14.25C8.65647 14.1102 8.72689 13.9272 8.72546 13.7376C8.72403 13.548 8.65085 13.366 8.52064 13.2281C8.39043 13.0903 8.21286 13.0069 8.02365 12.9948C7.83445 12.9826 7.64765 13.0425 7.50085 13.1625V13.1625ZM15.5184 2.48251C14.8874 1.85552 14.0341 1.5036 13.1446 1.5036C12.2551 1.5036 11.4018 1.85552 10.7709 2.48251L9.47335 3.75001C9.34524 3.88977 9.27482 4.07287 9.27625 4.26246C9.27768 4.45205 9.35086 4.63406 9.48107 4.77187C9.61128 4.90969 9.78885 4.99307 9.97805 5.00525C10.1673 5.01743 10.3541 4.95749 10.5009 4.83751L11.7984 3.54751C12.1465 3.19941 12.6186 3.00385 13.1109 3.00385C13.6031 3.00385 14.0753 3.19941 14.4234 3.54751C14.7714 3.89561 14.967 4.36773 14.967 4.86001C14.967 5.35229 14.7714 5.82441 14.4234 6.17251L11.0184 9.58501C10.6841 9.9203 10.2338 10.1143 9.76059 10.1269C9.28735 10.1394 8.82738 9.9696 8.47585 9.65251L8.38585 9.57751C8.24363 9.43827 8.05192 9.36123 7.8529 9.36334C7.65388 9.36545 7.46384 9.44654 7.3246 9.58876C7.18537 9.73098 7.10833 9.92269 7.11044 10.1217C7.11255 10.3207 7.19363 10.5108 7.33585 10.65C7.39033 10.7057 7.44792 10.7583 7.50835 10.8075C8.14936 11.3628 8.97702 11.6546 9.82458 11.624C10.6721 11.5934 11.4766 11.2427 12.0759 10.6425L15.4884 7.23001C16.1194 6.60307 16.4767 5.75193 16.4823 4.86245C16.4879 3.97296 16.1414 3.11738 15.5184 2.48251V2.48251Z"
            fill="black"
          />
        </svg>
      </button>
    </span>
  </div>
);

export default QuillToolbar;
