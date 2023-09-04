import Quill from "quill";

const Block = Quill.import("blots/block/embed");

class CustomEmbedBlot extends Block {
  static blotName = "customEmbed";
  static tagName = "div";
  static className = "custom-embed";

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

Quill.register(CustomEmbedBlot);
