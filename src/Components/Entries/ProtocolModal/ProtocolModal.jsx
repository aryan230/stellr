import _ from "lodash";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UpdateProtocolStepperOne from "./UpdateProtocol/UpdateProtocolStepperOne";
import UpdateProtocolModal from "./UpdateProtocolModal";
import { Box, Drawer } from "@mui/material";
import DrawerProtocolLogs from "./DrawerProtocolLogs";

function ProtocolModal({
  setProtocolModal,
  doc,
  setWhichTabisActive,
  setNewProtocol,
}) {
  const [insideData, setInsideData] = useState(
    doc.data ? Object.entries(JSON.parse(doc.data)) : []
  );
  const [images, setImages] = useState(doc.image && JSON.parse(doc.image));
  const [files, setFiles] = useState(doc.file && JSON.parse(doc.file));
  const [updateProtocolModal, setUpdateProtocolModal] = useState(false);
  const [isDrawerOpenLogs, setIsDrawerOpenLogs] = useState(false);

  return (
    <div className="modal">
      {updateProtocolModal && (
        <UpdateProtocolModal
          doc={doc}
          setProtocolModal={setProtocolModal}
          setUpdateProtocolModal={setUpdateProtocolModal}
          setWhichTabisActive={setWhichTabisActive}
          setNewProtocol={setNewProtocol}
          files={files && files}
          images={images && images}
        />
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpenLogs}
        onClose={() => setIsDrawerOpenLogs(false)}
      >
        <Box width="500px" p={2} role="presentation">
          <DrawerProtocolLogs
            task={doc}
            setIsDrawerOpen={setIsDrawerOpenLogs}
          />
        </Box>
      </Drawer>
      <div className="modal-inside-protocol">
        <div className="top-modal">
          <button
            onClick={() => {
              setProtocolModal(false);
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
        <>
          {" "}
          <div className="top-modal-in-in">
            <div className="top-modal-protocol-in">
              <h1>{doc.title}</h1>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsDrawerOpenLogs(true);
                }}
                className="text-indigo-500 mt-5 hover:cursor-pointer"
              >
                View Logs
              </a>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setUpdateProtocolModal(true);
              }}
            >
              Edit Protocol
            </button>
          </div>
          <div className="protocol-stepper">
            <div className="protocol-shower">
              {insideData &&
                insideData.map((d) => (
                  <div className="protocol-shower-inside">
                    <div className="protocol-shower-left">
                      <h2>{_.startCase(d[0])}</h2>
                    </div>
                    <div className="protocol-shower-right">
                      <ReactQuill theme="snow" readOnly value={d[1]} />
                    </div>
                  </div>
                ))}
              {images &&
                images.length > 0 &&
                images.map((i) => (
                  <div className="protocol-shower-inside">
                    <div className="protocol-shower-left">
                      <h2>{i.name}</h2>
                    </div>
                    <div className="protocol-shower-right">
                      {i.images.map((img) => (
                        <img src={img.url} width="50px"></img>
                      ))}
                    </div>
                  </div>
                ))}
              {files &&
                files.length > 0 &&
                files.map((i) => (
                  <div className="protocol-shower-inside">
                    <div className="protocol-shower-left">
                      <h2>{i.name}</h2>
                    </div>
                    <div className="protocol-shower-right">
                      {i.images.map((img) => (
                        <a href={img.url} target="_blank" width="50px">
                          {img.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default ProtocolModal;
