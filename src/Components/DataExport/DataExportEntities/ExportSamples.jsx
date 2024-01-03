import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
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
const zip = new JSZip();
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ExportSamples({ setLoader }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const singleConvert = async (p) => {
    let entry = zip.folder("protocols");
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
    saveAs(converted, "test.docx");
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
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {JSON.parse(selectedProject.data).sampleName}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
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

                        singleConvert(selectedProject);
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
