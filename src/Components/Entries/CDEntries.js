import React, { Fragment, useRef, useState } from "react";
import BasicModalTailwind from "../../UI/MainModals/BasicModalTailwind";
import { Editor } from "ketcher-react";
import { RemoteStructServiceProvider } from "ketcher-core";
import "ketcher-react/dist/index.css";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import LucideIcons from "../../UI/Icon/LucideIcons";
import URL from "./../../Data/data.json";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import MainLoaderWithText from "../Loaders/MainLoaderWithText";

function CDEntries({ setOpen, open, doc, setCDUpdate }) {
  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const sketchContainerRef = useRef();
  const structServiceProvider = new StandaloneStructServiceProvider();
  const [value, setValue] = useState();
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  console.log(doc);
  const iconName = "Biohazard";

  const saveData = async (e) => {
    e.preventDefault();
    setLoader(true);
    const cdObject = {
      data: [
        {
          user: userInfo._id,
          block: value,
          image: image,
          date: Date.now(),
        },
      ],
    };
    var data = JSON.stringify(cdObject);

    var config = {
      method: "put",
      url: `${URL}api/cd/${doc._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setLoader(false);
        setOpen(false);
        setCDUpdate(true);
        toast.success("Drawing saved sucessfully");
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        setLoader(false);
        setOpen(false);
        setCDUpdate(true);
        console.log(error);
      });
  };

  return (
    <div className="modal">
      <div className="relative bg-white rounded-xl shadow max-h-[90vh] overflow-y-auto custom-scrollbar-task w-[80%] max-w-[80%]">
        {/* Modal header */}
        {loader && <MainLoaderWithText text="Loading your drawing" />}
        <div className="flex items-center justify-between p-5 py-8 border-b rounded-t sticky top-0 bg-white z-50">
          {iconName && (
            <LucideIcons
              iconName={iconName}
              size={24}
              color="#5D00D2"
              className="mr-3"
            />
          )}

          <h3 className="text-xl font-medium text-gray-900 font-karla">
            {doc.name}
          </h3>

          <button
            onClick={async (e) => {
              await saveData(e);
            }}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-modal-hide="extralarge-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className="p-6 space-y-6 h-[80vh] w-full">
          {doc.data && (
            <Editor
              ref={sketchContainerRef}
              height={100}
              staticResourcesUrl={""}
              structServiceProvider={structServiceProvider}
              options={{}}
              onInit={async (ketcher) => {
                window.ketcher = ketcher;
                const initialData = doc.data[0].block;
                // ketcher.setMolecule(initialData);
                ketcher.addFragment(initialData);
                ketcher.editor.subscribe("change", (operations) => {
                  ketcher.getKet().then(async (f) => {
                    const imgBlob = await ketcher.generateImage(f);
                    const finalImage = await blobToBase64(imgBlob);
                    setValue(f);
                    setImage(finalImage);
                  });
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
    // <Transition.Root show={open} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="fixed z-[999999] inset-0 overflow-y-auto"
    //     onClose={setOpen}
    //   >
    //     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 font-sans">
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //       </Transition.Child>

    //       {/* This element is to trick the browser into centering the modal contents. */}
    //       <span
    //         className="hidden sm:inline-block sm:align-middle sm:h-screen"
    //         aria-hidden="true"
    //       >
    //         &#8203;
    //       </span>
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //         enterTo="opacity-100 translate-y-0 sm:scale-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //         leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //       >
    //         <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-fit sm:w-full sm:p-6 w-fit">
    //           <Editor
    //             height={400}
    //             structServiceProvider={structServiceProvider}
    //             options={{}}
    //             onChange={(molfile) => {
    //               console.log("Molfile:", molfile);
    //             }}
    //           />
    //         </div>
    //       </Transition.Child>
    //     </div>
    //   </Dialog>
    // </Transition.Root>
  );
}

export default CDEntries;
