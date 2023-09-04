import Quill from "quill";
let BlockEmbed = Quill.import("blots/block/embed");

export class FileBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute("title", value.title);
    node.setAttribute("id", value.id);
    node.setAttribute("href", value.href);
    node.setAttribute("target", "_blank");
    node.setAttribute("contenteditable", false);
    return node;
  }

  static value(node) {
    return {
      title: node.getAttribute("title"),
      href: node.getAttribute("href"),
      id: node.getAttribute("id"),
    };
  }
}
FileBlot.blotName = "attach";
FileBlot.tagName = "a";

Quill.register(FileBlot);
