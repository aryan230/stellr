import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

function CustomEmbedBlot() {
  const BlockEmbed = Quill.import("blots/block/embed");

  class CustomEmbed extends BlockEmbed {
    static blotName = "custom-embed";
    static className = "custom-embed";
    static tagName = "div";

    static create(value) {
      const node = super.create();
      // Customize the node creation here
      node.innerHTML = `<div>${value}</div>`;
      return node;
    }

    static value(node) {
      return node.innerHTML;
    }

    update(mutations, context) {
      // Handle updates to the block
    }
  }

  Quill.register(CustomEmbed);
}

export default CustomEmbedBlot;
