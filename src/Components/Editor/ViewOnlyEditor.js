import React from "react";
import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();

let editorjs_clean_data = {
  blocks: [
    {
      data: {
        html: "<html>\n<h1>\nSome things here.\n</h1>\n</html>",
      },
      id: "spmzBf4Ys3",
      type: "raw",
    },
    {
      data: {
        text: "/* width */",
      },
      id: "Tm7RL85oqc",
      type: "paragraph",
    },
    {
      data: {
        text: "::-webkit-scrollbar {",
      },
      id: "ld4pFzPH2k",
      type: "paragraph",
    },
    {
      data: {
        text: "  width: 10px;",
      },
      id: "oIVIvTvjaM",
      type: "paragraph",
    },
    {
      data: {
        text: '<a href="kyleockford" target="_blank">@kyleockford</a>',
      },
      id: "OVmc51_PHa",
      type: "paragraph",
    },
    {
      data: {
        text: "}",
      },
      id: "6nfclfUB_I",
      type: "paragraph",
    },
    {
      data: {
        text: "/* Track */",
      },
      id: "KIvEWOouBD",
      type: "paragraph",
    },
    {
      data: {
        text: "::-webkit-scrollbar-track {",
      },
      id: "V6FJXt3nyP",
      type: "paragraph",
    },
    {
      data: {
        text: "  background: #f1f1f1; ",
      },
      id: "oCDFPE8dnt",
      type: "paragraph",
    },
    {
      data: {
        text: "}",
      },
      id: "xgV0jXP9vt",
      type: "paragraph",
    },
    {
      data: {
        text: "/* Handle */",
      },
      id: "_PFMWbg23M",
      type: "paragraph",
    },
    {
      data: {
        text: "::-webkit-scrollbar-thumb {",
      },
      id: "29tnUzNJUq",
      type: "paragraph",
    },
    {
      data: {
        text: "  background: #888; ",
      },
      id: "CT1qTxkRXs",
      type: "paragraph",
    },
    {
      data: {
        text: "}",
      },
      id: "hHVXT_1KGZ",
      type: "paragraph",
    },
    {
      data: {
        text: "/* Handle on hover */",
      },
      id: "nQtdBKYvvN",
      type: "paragraph",
    },
    {
      data: {
        text: "::-webkit-scrollbar-thumb:hover {",
      },
      id: "qY6pVtnLu5",
      type: "paragraph",
    },
    {
      data: {
        text: "  background: #555; ",
      },
      id: "B5SfTggD-7",
      type: "paragraph",
    },
    {
      data: {
        text: "}",
      },
      id: "K5RBgqimWH",
      type: "paragraph",
    },
    {
      data: {
        items: [
          {
            checked: false,
            text: "some check 1",
          },
          {
            checked: false,
            text: "some check 2",
          },
          {
            checked: false,
            text: "som check 3",
          },
        ],
      },
      id: "fhxxBXmcf7",
      type: "checklist",
    },
    {
      data: {
        text: "@",
      },
      id: "HgCXxX35U_",
      type: "paragraph",
    },
    {
      data: {
        text: "#kingofdog&nbsp;#zeybefx&nbsp;",
      },
      id: "RLorUZtaIG",
      type: "paragraph",
    },
    {
      data: {
        text: "@ki",
      },
      id: "erJ57lGUlr",
      type: "paragraph",
    },
    {
      data: {
        text: "@kingofdog&nbsp;<br>@kingofdog&nbsp;",
      },
      id: "VN_cyVrbkN",
      type: "paragraph",
    },
    {
      data: {
        text:
          '<a href="/v/64ba57b3618fefdd34597cdb" target="_blank">@Aryan Agarwal</a>',
      },
      id: "UYbyqOw7zM",
      type: "paragraph",
    },
  ],
};

let html = edjsParser.parse(editorjs_clean_data);

console.log(html);
function ViewOnlyEditor() {
  return <div>ViewOnlyEditor</div>;
}

export default ViewOnlyEditor;
