// import Quill from "quill";
// let BlockEmbed = Quill.import("blots/block/embed");
// let Inline = Quill.import("blots/inline");

// export class ImageBlot extends BlockEmbed {
//   static create(value) {
//     let node = super.create();
//     node.setAttribute("src", value.src);
//     node.setAttribute("id", value.id);
//     node.setAttribute("width", value.width);
//     node.setAttribute("url", value.url);
//     return node;
//   }

//   static value(node) {
//     return {
//       src: node.getAttribute("src"),
//       id: node.getAttribute("id"),
//       url: node.getAttribute("url"),
//       width: node.getAttribute("width"),
//     };
//   }
// }
// ImageBlot.blotName = "image";
// ImageBlot.tagName = "img";

// Quill.register(ImageBlot);
