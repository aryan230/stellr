// import Quill from "quill";
// let BlockEmbed = Quill.import("blots/block/embed");

// export class MentionBlot extends BlockEmbed {
//   static create(value) {
//     let node = super.create();
//     node.setAttribute("id", value.id);
//     node.setAttribute("dataName", value.dataName);
//     // node.innerHTML = `
//     // <img src="https://lh3.ggpht.com/e3oZddUHSC6EcnxC80rl_6HbY94sM63dn6KrEXJ-C4GIUN-t1XM0uYA_WUwyhbIHmVMH=w300"  />
//     // <p>View Sheet</p>`;
//     node.setAttribute("contenteditable", false);
//     return node;
//   }

//   static value(node) {
//     return {
//       dataName: node.getAttribute("dataName"),
//       dataId: node.getAttribute("dataId"),
//       id: node.getAttribute("id"),
//     };
//   }
// }
// MentionBlot.blotName = "mention";
// MentionBlot.tagName = "button";

// Quill.register(MentionBlot);
