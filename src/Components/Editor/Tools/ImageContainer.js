import Quill from "quill";
let BlockEmbed = Quill.import("blots/block/embed");

export class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute("src", value.src);
    node.setAttribute("id", value.id);
    node.setAttribute("width", value.width);
    return node;
  }

  static value(node) {
    return {
      src: node.getAttribute("src"),
      id: node.getAttribute("id"),
      width: node.getAttribute("width"),
    };
  }
}
ImageBlot.blotName = "ig";
ImageBlot.tagName = "img";

Quill.register(ImageBlot);
