import React, { useState } from "react";
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { downloadObjectAsJson } from "../../Functions/downloadJson";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as quillToWord from "quill-to-word";
import { htmlToPdf } from "../../Functions/htmlToPdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import ExportModal from "./ExportModal";
import generatePDF from "react-to-pdf";
import htmlDocx from "html-docx-fixed/dist/html-docx";
import { htmlToDelta } from "deltaconvert";
import mammoth from "mammoth/mammoth.browser";

function DrawerInformation({ quill, tab, project, pdfRef }) {
  const [exportModal, setExportModal] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const exportAuditLog = async (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    console.log(tab.logs);
    const templateOptions =
      tab.logs &&
      tab.logs.map(({ userEmail, message, date }) => [
        userEmail,
        message,
        new Date(date).toLocaleString(),
      ]);

    autoTable(doc, { html: "#my-table" });
    autoTable(doc, {
      head: [["Email", "Message", "Date"]],
      body: templateOptions,
    });
    doc.save(`stellr-${tab.name}.pdf`);
  };
  //   async function exportPdf(e) {
  //     e.preventDefault();
  //     const delta = quill.getContents(); // gets the Quill delta
  //     const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
  //     saveAs(pdfAsBlob, `stellr-${name}.pdf`); // downloads from the browser
  //   }

  function ExportToDoc(element, filename = "wohoo") {
    var header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

    var footer = "</body></html>";

    var html = header + element + footer;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + ".docx" : "document.docx";

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  function convertDeltaToHtml(delta) {
    let html = "";
    delta.forEach((op) => {
      if (op.insert) {
        if (op.attributes && op.attributes.customElement) {
          // Custom element with class or inline style
          html += `<span class="custom-element">${op.insert}</span>`;
        } else {
          // Regular text
          html += op.insert;
        }
      }
    });
    return html;
  }

  function ExportToDoc(element, filename = "") {
    var header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

    var footer = "</body></html>";

    var html = header + element + footer;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + ".docx" : "document.docx";

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  const exportDocument = async (e) => {
    e.preventDefault();
    // ExportToDoc(quill.root.innerHTML, "fileNameBuddy");
    // console.log(quill.root.innerHTML);
    // let pdfBlobOut = await htmlToPdf(quill.root.innerHTML);
    // saveAs(pdfBlobOut, `stellr-.pdf`);

    // html2canvas(htmlElement, {}).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   console.log(imgData);
    // });

    // Here we create
    // const deltas = quill.getContents();
    // const quillToWordConfig = {
    //   exportAs: "blob",
    // };
    // if (!deltas) {
    //   return alert("Content not found");
    // }
    // downloadObjectAsJson(deltas.ops, "editor-text");

    // let element = document.querySelector(".container-editor-quill");
    // if (element) {
    //   html2canvas(element, {
    //     useCORS: true,
    //   }).then((canvas) => {
    //     const imgData = canvas.toDataURL("image/png");
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, "JPEG", 0, 0);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("download.pdf");
    //   });
    // }

    // const doc = new jsPDF();
    // doc.html(html, {
    //   async callback(doc) {
    //     await doc.save("pdf_name");
    //   },
    // });
  };

  //   const convertToHtml = async () => {
  //     var cfg = {};
  //     var converter = await new QuillDeltaToHtmlConverter(
  //       quill.getContents(),
  //       cfg
  //     );
  //     var html = await converter.convert();
  //     console.log(html);
  //   };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const result = await convertDocxToHtml(file);
      console.log(htmlToDelta(result));
      setHtmlContent(result);
    }
  };

  const convertDocxToHtml = async (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const arrayBuffer = reader.result;

        try {
          const { value } = await mammoth.convertToHtml({ arrayBuffer });
          resolve(value);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="drawer-info">
      {exportModal && (
        <ExportModal setExportModal={setExportModal} quill={quill} />
      )}
      <div className="drawer-info-inside">
        <div className="drawer-info-top">
          <div className="topper-drawer-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M7.00065 6.33331C6.82384 6.33331 6.65427 6.40355 6.52925 6.52857C6.40423 6.6536 6.33399 6.82317 6.33399 6.99998V9.66665C6.33399 9.84346 6.40423 10.013 6.52925 10.1381C6.65427 10.2631 6.82384 10.3333 7.00065 10.3333C7.17747 10.3333 7.34703 10.2631 7.47206 10.1381C7.59708 10.013 7.66732 9.84346 7.66732 9.66665V6.99998C7.66732 6.82317 7.59708 6.6536 7.47206 6.52857C7.34703 6.40355 7.17747 6.33331 7.00065 6.33331ZM7.25399 3.71998C7.09168 3.6533 6.90963 3.6533 6.74732 3.71998C6.66549 3.75171 6.59072 3.79929 6.52732 3.85998C6.46843 3.92478 6.42108 3.99919 6.38732 4.07998C6.35 4.1591 6.33173 4.24586 6.33399 4.33331C6.33348 4.42105 6.3503 4.50803 6.38347 4.58925C6.41665 4.67048 6.46553 4.74435 6.52732 4.80665C6.59212 4.86553 6.66653 4.91288 6.74732 4.94665C6.84832 4.98814 6.95796 5.00419 7.06662 4.99339C7.17527 4.98258 7.27961 4.94526 7.37046 4.88469C7.46131 4.82412 7.5359 4.74217 7.58766 4.64603C7.63942 4.54989 7.66678 4.4425 7.66732 4.33331C7.66487 4.1568 7.59581 3.98774 7.47399 3.85998C7.41059 3.79929 7.33582 3.75171 7.25399 3.71998ZM7.00065 0.333313C5.68211 0.333313 4.39318 0.724306 3.29685 1.45685C2.20052 2.18939 1.34604 3.23058 0.841457 4.44876C0.336873 5.66693 0.204851 7.00737 0.462086 8.30058C0.71932 9.59379 1.35426 10.7817 2.28661 11.714C3.21896 12.6464 4.40685 13.2813 5.70005 13.5385C6.99326 13.7958 8.3337 13.6638 9.55188 13.1592C10.7701 12.6546 11.8112 11.8001 12.5438 10.7038C13.2763 9.60745 13.6673 8.31852 13.6673 6.99998C13.6673 6.1245 13.4949 5.25759 13.1599 4.44876C12.8248 3.63992 12.3338 2.90499 11.7147 2.28593C11.0956 1.66688 10.3607 1.17581 9.55188 0.840783C8.74304 0.505751 7.87613 0.333313 7.00065 0.333313V0.333313ZM7.00065 12.3333C5.94582 12.3333 4.91467 12.0205 4.03761 11.4345C3.16055 10.8484 2.47696 10.0155 2.0733 9.04096C1.66963 8.06642 1.56401 6.99406 1.7698 5.9595C1.97559 4.92493 2.48354 3.97462 3.22942 3.22874C3.9753 2.48286 4.92561 1.97491 5.96017 1.76912C6.99474 1.56334 8.06709 1.66895 9.04163 2.07262C10.0162 2.47629 10.8491 3.15988 11.4352 4.03694C12.0212 4.914 12.334 5.94515 12.334 6.99998C12.334 8.41447 11.7721 9.77102 10.7719 10.7712C9.7717 11.7714 8.41514 12.3333 7.00065 12.3333V12.3333Z"
                fill="black"
              />
            </svg>
            <h2>Information</h2>
          </div>
          <form
            action="
          "
          >
            <label htmlFor="">Name</label>
            <input
              value={tab.name}
              type="text"
              placeholder="Enter a name for your entry"
              disabled
            />
            <div className="margin-maker"></div>
            <label htmlFor="">Folder</label>
            <input
              value={project.name}
              type="text"
              placeholder="Enter a name for your entry"
              disabled
            />
            <div className="margin-maker"></div>
            <h3>Entry Created on {tab.createdAt.split("T")[0]}</h3>

            <button className="delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2 4H3.33333H14"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33398 3.99998V2.66665C5.33398 2.31302 5.47446 1.97389 5.72451 1.72384C5.97456 1.47379 6.3137 1.33331 6.66732 1.33331H9.33398C9.68761 1.33331 10.0267 1.47379 10.2768 1.72384C10.5268 1.97389 10.6673 2.31302 10.6673 2.66665V3.99998M12.6673 3.99998V13.3333C12.6673 13.6869 12.5268 14.0261 12.2768 14.2761C12.0267 14.5262 11.6876 14.6666 11.334 14.6666H4.66732C4.3137 14.6666 3.97456 14.5262 3.72451 14.2761C3.47446 14.0261 3.33398 13.6869 3.33398 13.3333V3.99998H12.6673Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Delete Entry
            </button>
            {/* <button
              onClick={async (e) => {
                e.preventDefault();
                const quillContents = quill.root.innerHTML;
                let htmlString = "<p>hello, <strong>world</strong></p>";
                // console.log(htmlToDelta(quillContents));

                // var converted = htmlDocx.asBlob(quillContents);
                // saveAs(converted, "test.docx");
              }}
            >
              download
            </button>
            <input type="file" accept=".docx" onChange={handleFileUpload} /> */}
            {/* <button className="lock">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12.6667 7.33337H3.33333C2.59695 7.33337 2 7.93033 2 8.66671V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V8.66671C14 7.93033 13.403 7.33337 12.6667 7.33337Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.66602 7.33337V4.66671C4.66602 3.78265 5.01721 2.93481 5.64233 2.30968C6.26745 1.68456 7.11529 1.33337 7.99935 1.33337C8.8834 1.33337 9.73125 1.68456 10.3564 2.30968C10.9815 2.93481 11.3327 3.78265 11.3327 4.66671V7.33337"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Lock Entry
            </button> */}
            <button
              className="export"
              onClick={(e) => {
                e.preventDefault();
                setExportModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.3327 5.95998C13.3257 5.89874 13.3123 5.8384 13.2927 5.77998V5.71998C13.2606 5.65143 13.2179 5.58842 13.166 5.53331V5.53331L9.16602 1.53331C9.11091 1.48146 9.0479 1.4387 8.97935 1.40665H8.91268C8.84786 1.37198 8.77819 1.34726 8.70602 1.33331H4.66602C4.13558 1.33331 3.62687 1.54403 3.2518 1.9191C2.87673 2.29417 2.66602 2.80288 2.66602 3.33331V12.6666C2.66602 13.1971 2.87673 13.7058 3.2518 14.0809C3.62687 14.4559 4.13558 14.6666 4.66602 14.6666H11.3327C11.8631 14.6666 12.3718 14.4559 12.7469 14.0809C13.122 13.7058 13.3327 13.1971 13.3327 12.6666V5.99998C13.3327 5.99998 13.3327 5.99998 13.3327 5.95998ZM9.33268 3.60665L11.0593 5.33331H9.99935C9.82254 5.33331 9.65297 5.26307 9.52794 5.13805C9.40292 5.01303 9.33268 4.84346 9.33268 4.66665V3.60665ZM11.9993 12.6666C11.9993 12.8435 11.9291 13.013 11.8041 13.1381C11.6791 13.2631 11.5095 13.3333 11.3327 13.3333H4.66602C4.4892 13.3333 4.31964 13.2631 4.19461 13.1381C4.06959 13.013 3.99935 12.8435 3.99935 12.6666V3.33331C3.99935 3.1565 4.06959 2.98693 4.19461 2.86191C4.31964 2.73688 4.4892 2.66665 4.66602 2.66665H7.99935V4.66665C7.99935 5.19708 8.21006 5.70579 8.58514 6.08086C8.96021 6.45593 9.46892 6.66665 9.99935 6.66665H11.9993V12.6666ZM8.85935 9.52665L8.66602 9.72665V7.99998C8.66602 7.82317 8.59578 7.6536 8.47075 7.52857C8.34573 7.40355 8.17616 7.33331 7.99935 7.33331C7.82254 7.33331 7.65297 7.40355 7.52794 7.52857C7.40292 7.6536 7.33268 7.82317 7.33268 7.99998V9.72665L7.13935 9.52665C7.01381 9.40111 6.84355 9.33059 6.66602 9.33059C6.48848 9.33059 6.31822 9.40111 6.19268 9.52665C6.06715 9.65218 5.99662 9.82244 5.99662 9.99998C5.99662 10.1775 6.06715 10.3478 6.19268 10.4733L7.52602 11.8066C7.58942 11.8673 7.66418 11.9149 7.74602 11.9466C7.82582 11.9819 7.9121 12.0001 7.99935 12.0001C8.0866 12.0001 8.17288 11.9819 8.25268 11.9466C8.33452 11.9149 8.40928 11.8673 8.47268 11.8066L9.80602 10.4733C9.93155 10.3478 10.0021 10.1775 10.0021 9.99998C10.0021 9.82244 9.93155 9.65218 9.80602 9.52665C9.68048 9.40111 9.51022 9.33059 9.33268 9.33059C9.15515 9.33059 8.98488 9.40111 8.85935 9.52665V9.52665Z"
                  fill="#6200D2"
                />
              </svg>
              Export Entry
            </button>

            <button className="audit" onClick={exportAuditLog}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.3327 5.95998C13.3257 5.89874 13.3123 5.8384 13.2927 5.77998V5.71998C13.2606 5.65143 13.2179 5.58842 13.166 5.53331V5.53331L9.16602 1.53331C9.11091 1.48146 9.0479 1.4387 8.97935 1.40665H8.91268C8.84786 1.37198 8.77819 1.34726 8.70602 1.33331H4.66602C4.13558 1.33331 3.62687 1.54403 3.2518 1.9191C2.87673 2.29417 2.66602 2.80288 2.66602 3.33331V12.6666C2.66602 13.1971 2.87673 13.7058 3.2518 14.0809C3.62687 14.4559 4.13558 14.6666 4.66602 14.6666H11.3327C11.8631 14.6666 12.3718 14.4559 12.7469 14.0809C13.122 13.7058 13.3327 13.1971 13.3327 12.6666V5.99998C13.3327 5.99998 13.3327 5.99998 13.3327 5.95998ZM9.33268 3.60665L11.0593 5.33331H9.99935C9.82254 5.33331 9.65297 5.26307 9.52794 5.13805C9.40292 5.01303 9.33268 4.84346 9.33268 4.66665V3.60665ZM11.9993 12.6666C11.9993 12.8435 11.9291 13.013 11.8041 13.1381C11.6791 13.2631 11.5095 13.3333 11.3327 13.3333H4.66602C4.4892 13.3333 4.31964 13.2631 4.19461 13.1381C4.06959 13.013 3.99935 12.8435 3.99935 12.6666V3.33331C3.99935 3.1565 4.06959 2.98693 4.19461 2.86191C4.31964 2.73688 4.4892 2.66665 4.66602 2.66665H7.99935V4.66665C7.99935 5.19708 8.21006 5.70579 8.58514 6.08086C8.96021 6.45593 9.46892 6.66665 9.99935 6.66665H11.9993V12.6666ZM8.85935 9.52665L8.66602 9.72665V7.99998C8.66602 7.82317 8.59578 7.6536 8.47075 7.52857C8.34573 7.40355 8.17616 7.33331 7.99935 7.33331C7.82254 7.33331 7.65297 7.40355 7.52794 7.52857C7.40292 7.6536 7.33268 7.82317 7.33268 7.99998V9.72665L7.13935 9.52665C7.01381 9.40111 6.84355 9.33059 6.66602 9.33059C6.48848 9.33059 6.31822 9.40111 6.19268 9.52665C6.06715 9.65218 5.99662 9.82244 5.99662 9.99998C5.99662 10.1775 6.06715 10.3478 6.19268 10.4733L7.52602 11.8066C7.58942 11.8673 7.66418 11.9149 7.74602 11.9466C7.82582 11.9819 7.9121 12.0001 7.99935 12.0001C8.0866 12.0001 8.17288 11.9819 8.25268 11.9466C8.33452 11.9149 8.40928 11.8673 8.47268 11.8066L9.80602 10.4733C9.93155 10.3478 10.0021 10.1775 10.0021 9.99998C10.0021 9.82244 9.93155 9.65218 9.80602 9.52665C9.68048 9.40111 9.51022 9.33059 9.33268 9.33059C9.15515 9.33059 8.98488 9.40111 8.85935 9.52665V9.52665Z"
                  fill="#6200D2"
                />
              </svg>
              Export Audit Log
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DrawerInformation;
