import { Quill } from "react-quill";

export function quillGetHTML(inputDelta) {
  var tempCont = document.createElement("div");
  new Quill(tempCont).setContents(inputDelta);
  return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}
