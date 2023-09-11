import { Box, Chip, Drawer } from "@mui/material";
import React, { useState } from "react";
import _ from "lodash";
import DrawerSample from "./DrawerSample";
import UpdateSampleModal from "./UpdateSampleModal";
function SubjectModal({
  doc,
  setSampleModal,
  insideData,
  setSampleUpdate,
  setIsDrawerOpenLogs,
  setIsDrawerVersion,
}) {
  const [data, setData] = useState(Object.entries(insideData));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="sample-modal-container-main">
      <div className="top-modal">
        <button
          onClick={(e) => {
            setSampleModal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
          >
            <path
              d="M28.2838 15.7712L22.6269 21.4281L16.9701 15.7712C16.72 15.5212 16.3809 15.3807 16.0273 15.3807C15.6737 15.3807 15.3345 15.5212 15.0845 15.7712C14.8344 16.0213 14.6939 16.3604 14.6939 16.714C14.6939 17.0676 14.8344 17.4068 15.0845 17.6568L20.7413 23.3137L15.0845 28.9705C14.8344 29.2206 14.6939 29.5597 14.6939 29.9134C14.6939 30.267 14.8344 30.6061 15.0845 30.8562C15.3345 31.1062 15.6737 31.2467 16.0273 31.2467C16.3809 31.2467 16.72 31.1062 16.9701 30.8562L22.6269 25.1993L28.2838 30.8562C28.5338 31.1062 28.873 31.2467 29.2266 31.2467C29.5802 31.2467 29.9194 31.1062 30.1694 30.8562C30.4195 30.6061 30.5599 30.267 30.5599 29.9134C30.5599 29.5597 30.4195 29.2206 30.1694 28.9705L24.5126 23.3137L30.1694 17.6568C30.4195 17.4068 30.5599 17.0676 30.5599 16.714C30.5599 16.3604 30.4195 16.0213 30.1694 15.7712C29.9194 15.5212 29.5802 15.3807 29.2266 15.3807C28.873 15.3807 28.5338 15.5212 28.2838 15.7712Z"
              fill="#8F8585"
            />
          </svg>
        </button>
      </div>
      <div className="sample-modal-container-inside">
        {isDrawerOpen && (
          <UpdateSampleModal
            doc={doc}
            setSampleModal={setSampleModal}
            insideData={insideData}
            setSampleUpdate={setSampleUpdate}
            setIsDrawerOpen={setIsDrawerOpen}
            type="subject"
          />
        )}
        {/* <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box width="500px" p={2} role="presentation">
            <DrawerSample
              doc={doc}
              setSampleModal={setSampleModal}
              insideData={insideData}
              setSampleUpdate={setSampleUpdate}
            />
          </Box>
        </Drawer> */}
        <div className="sample-modal-container-top-div">
          <div className="sample-modal-top-left">
            <div className="sample-modal-top-left-top">
              <h1>Sample Name - {insideData.sampleName}</h1>
            </div>
            <p>
              Created on{" "}
              {new Date(doc.createdAt).toLocaleString("en-GB").split(",")[0]} at{" "}
              {new Date(doc.createdAt).toLocaleString().split(",")[1]}
            </p>

            <a
              className="text-indigo-500 hover:cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsDrawerOpenLogs(true);
              }}
            >
              View Logs
            </a>
            <a
              className="text-indigo-500 ml-5 hover:cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsDrawerOpen(true);
              }}
            >
              Edit Sample
            </a>
            <a
              className="text-indigo-500 ml-5 hover:cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsDrawerVersion(true);
              }}
            >
              View previous versions
            </a>
          </div>
        </div>

        <div className="sample-modal-main-container">
          <div className="view-logs-inside">
            {data &&
              data.length > 0 &&
              data.map((d) => (
                <div className="content-logs-inside">
                  <h2>{_.startCase(d[0])}</h2>
                  <h2 className="log-message-h2">{d[1]}</h2>
                </div>
              ))}
          </div>
        </div>
        {/* <div className="xl:col-span-5 col-span-12 lg:col-span-7">
          <div className="card h-full">
            <div className="card-header">
              <h4 className="card-title">About Sample</h4>
            </div>
            <div className="card-body p-6">
              <div>
                <div className="text-base font-medium text-slate-800">
                  {insideData.sampleName}
                </div>
                <p className="text-sm text-slate-600 ">
                  The Optimistic Website Company - Amet minim mollit non
                  deserunt ullamco est sit aliqua dolor do amet sint.
                </p>
                <br />
                <p className="text-sm text-slate-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.The Optimistic Website Company - Amet minim Amet
                  minim mollit non deserunt ullamco est sit aliqua dolor do amet
                  sint.The Optimistic Website Company - Amet minim mollit non
                  deserunt ullamco est sit aliqua dolor do amet sint. Velit
                  officia consequat duis enim velit mollit. Exercita -tion
                  veniam consequat sunt nostrud amet.
                </p>
                <div className="flex flex-wrap mt-8">
                  <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                    <div className="font-semibold text-slate-500 ">
                      View Your Sample At
                    </div>
                    <div className="flex items-center  text-md font-normal text-indigo-600  rtl:space-x-reverse">
                      <iconify-icon icon="heroicons:link" />
                      <a href="#">View Link</a>
                    </div>
                  </div>
                  <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                    <div className="font-semibold text-slate-500 ">
                      Download
                    </div>
                    <div className="flex items-center  text-md font-normal text-indigo-600  rtl:space-x-reverse">
                      <iconify-icon icon="heroicons:link" />
                      <a href="#">Download Sample</a>
                    </div>
                  </div>
                </div>
              

                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Entity Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Entity Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="h-64 overflow-y-auto">
                      {data &&
                        data.length > 0 &&
                        data.map((d) => (
                          <tr class="bg-white border-b">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {_.startCase(d[0])}
                            </th>
                            <td class="px-6 py-4">{d[1]}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SubjectModal;
