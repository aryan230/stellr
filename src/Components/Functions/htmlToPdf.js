import React from "react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";

export const htmlToPdf = async (htmlString) => {
  let iframe = document.createElement("iframe");
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);
  let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
  iframedoc.body.innerHTML = htmlString;

  let canvas = await html2canvas(iframedoc.body, {});

  // Convert the iframe into a PNG image using canvas.
  let imgData = canvas.toDataURL("image/png");

  // Create a PDF document and add the image as a page.
  const doc = new JsPDF({
    format: "a4",
    unit: "mm",
  });
  doc.addImage(imgData, "PNG", 0, 0, 210, 297);

  // Get the file as blob output.
  let blob = doc.output("blob");

  // Remove the iframe from the document when the file is generated.
  document.body.removeChild(iframe);
};
