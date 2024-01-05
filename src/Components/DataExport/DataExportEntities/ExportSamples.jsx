import React, { useEffect, useState } from "react";
import { RadioGroup, Switch } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { PaperClipIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MainLoaderWithText from "../../Loaders/MainLoaderWithText";
import { listMyProtocols } from "../../../redux/actions/protocolActions";
import SpinnerLoader from "../../Loaders/SpinnerLoader";
import CompleteLoader from "../../Loaders/CompleteLoader";
import html2pdf from "html2pdf.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-fixed/dist/html-docx";
import { listMySops } from "../../../redux/actions/sopActions";
import { listMySamples } from "../../../redux/actions/sampleActions";
import Papa from "papaparse";
import _ from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const zip = new JSZip();
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ExportSamples({ setLoader }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [enabled, setEnabled] = useState(false);

  const notificationMethods = [
    { id: "single", title: "Single Entity Export" },
    { id: "bulk", title: "Bulk Export" },
  ];

  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;

  const [selected, setSelected] = useState(notificationMethods[0].id);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    dispatch(listMySamples(userInfo._id));
  }, [dispatch]);

  const singleConvert = async (p, type, auditLog) => {
    if (type === "CSV") {
      let entry = zip.folder("sample");
      const DATA = Object.entries(JSON.parse(p.data)).map((e) => ({
        name: _.startCase(e[0]),
        value: e[1],
      }));
      const csv = Papa.unparse(DATA);
      const csvBlob = new Blob([csv], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.download = "product_data.csv";

      URL.revokeObjectURL(csvUrl);
      entry.file(`${JSON.parse(p.data).sampleName}-${p._id}.csv`, csvBlob);

      const doc = new jsPDF();
      const templateOptions =
        p.logs &&
        p.logs.map(({ userEmail, message, date }) => [
          userEmail,
          message,
          new Date(date).toLocaleString(),
        ]);

      autoTable(doc, { html: "#my-table" });
      autoTable(doc, {
        head: [["Email", "Message", "Date"]],
        body: templateOptions,
      });
      let finalDoc = doc.output("arraybuffer");
      if (auditLog) {
        entry.file(`${JSON.parse(p.data).sampleName}-${p._id}.pdf`, finalDoc);
      }

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `samples-stellr-${userInfo._id}.zip`);
      });
    } else if (type === "XLSX") {
      const DATA = Object.entries(JSON.parse(p.data)).map((e) => ({
        name: _.startCase(e[0]),
        value: e[1],
      }));
      const csv = Papa.unparse(DATA);
      const csvBlob = new Blob([csv], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.download = "product_data.xlsx";
      link.click();
      URL.revokeObjectURL(csvUrl);
    } else {
      let entry = zip.folder("sample");
      let data =
        (await p.data) &&
        JSON.parse(p.data) &&
        Object.entries(JSON.parse(p.data));
      let html = await `
      ${data.map((d) => `<h1>${d[0]}</h1> <br/> ${d[1]}`)}
      `;

      // html2pdf()
      //   .from(html)
      //   .saveAs("protoco");
      var converted = await htmlDocx.asBlob(html);
      entry.file(`${JSON.parse(p.data).sampleName}-${p._id}.docx`, converted);
      const doc = new jsPDF();
      const templateOptions =
        p.logs &&
        p.logs.map(({ userEmail, message, date }) => [
          userEmail,
          message,
          new Date(date).toLocaleString(),
        ]);

      autoTable(doc, { html: "#my-table" });
      autoTable(doc, {
        head: [["Email", "Message", "Date"]],
        body: templateOptions,
      });
      let finalDoc = doc.output("arraybuffer");
      if (auditLog) {
        entry.file(`${JSON.parse(p.data).sampleName}-${p._id}.pdf`, finalDoc);
      }

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `samples-stellr-${userInfo._id}.zip`);
      });
    }
  };

  const bulkExport = async () => {
    setLoader(true);
    let entry = zip.folder("samples");
    var bar = new Promise((resolve, reject) => {
      samples.forEach(async (d, index, array) => {
        let data =
          (await d.data) &&
          JSON.parse(d.data) &&
          Object.entries(JSON.parse(d.data));
        let html = await `${data.map((d) => `<h1>${d[0]}</h1> <br/> ${d[1]}`)}`;
        var converted = await htmlDocx.asBlob(html);
        entry.file(`${JSON.parse(d.data).sampleName}-${d._id}.docx`, converted);
        if (index === array.length - 1) resolve();
      });
    });
    bar.then(() => {
      window.setTimeout(() => {
        setLoader(false);
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `samples-stellr-${userInfo._id}.zip`);
        });
      }, 3000);
    });
  };

  const memoryOptions = [
    { name: "DOCX", inStock: true },
    { name: "CSV", inStock: true },
    { name: "XLSX", inStock: false },
    { name: "PDF", inStock: false },
  ];
  const [mem, setMem] = useState(memoryOptions[0]);
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 mb-10">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Export Samples
        </h3>
      </div>
      {loadingSamples ? (
        <CompleteLoader />
      ) : (
        <>
          <div>
            <div>
              <label className="text-base font-medium text-gray-900">
                Export your samples
              </label>
              <p className="text-sm leading-5 text-gray-500">
                How do you prefer to export your samples?
              </p>
              <fieldset className="mt-4">
                <legend className="sr-only">Notification method</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {notificationMethods.map((notificationMethod) => (
                    <div
                      key={notificationMethod.id}
                      className="flex items-center"
                    >
                      <input
                        id={notificationMethod.id}
                        name="notification-method"
                        type="radio"
                        defaultChecked={notificationMethod.id === "single"}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        onChange={(e) => {
                          setSelected(notificationMethod.id);
                        }}
                      />
                      <label
                        htmlFor={notificationMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {notificationMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            {selected === "single" ? (
              <div className="py-5">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Entity
                </label>
                <select
                  id="location"
                  name="location"
                  value={selectedProject && selectedProject._id}
                  onChange={(e) => {
                    setSelectedProject(
                      samples.find((p) => p._id === e.target.value)
                    );
                  }}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option disabled selected value>
                    {" "}
                    -- Select an Sample --{" "}
                  </option>

                  {samples &&
                    samples.map((p) => (
                      <option value={p._id}>
                        {JSON.parse(p.data).sampleName}
                      </option>
                    ))}
                </select>

                {selectedProject && (
                  <div className="pt-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Format
                      </h2>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        See export formats
                      </a>
                    </div>

                    <RadioGroup value={mem} onChange={setMem} className="mt-2">
                      <RadioGroup.Label className="sr-only">
                        Choose a memory option
                      </RadioGroup.Label>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {memoryOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.name}
                            value={option}
                            className={({ active, checked }) =>
                              classNames(
                                option.inStock
                                  ? "cursor-pointer focus:outline-none"
                                  : "opacity-25 cursor-not-allowed",
                                mem.name === option.name
                                  ? "ring-2 ring-offset-2 ring-indigo-500"
                                  : "",
                                checked
                                  ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                  : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                              )
                            }
                            disabled={!option.inStock}
                          >
                            <RadioGroup.Label as="p">
                              {option.name}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
                {selectedProject && (
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between mt-8"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className="text-sm font-medium text-gray-900"
                        passive
                      >
                        Audit logs
                      </Switch.Label>
                      <Switch.Description
                        as="span"
                        className="text-sm text-gray-500"
                      >
                        Would you like to export the entity with audit logs?
                      </Switch.Description>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-indigo-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                )}
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        No. of Records
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {samples.length}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
          {selected === "single"
            ? selectedProject && (
                <div className="pt-6 divide-y divide-gray-200">
                  <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        singleConvert(selectedProject, mem.name, enabled);
                      }}
                      className="ml-5 bg-indigo-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Download
                    </button>
                  </div>
                </div>
              )
            : samples.length > 0 && (
                <div className="pt-6 divide-y divide-gray-200">
                  <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        bulkExport();
                      }}
                      className="ml-5 bg-indigo-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}
        </>
      )}
    </div>
  );
}

export default ExportSamples;
