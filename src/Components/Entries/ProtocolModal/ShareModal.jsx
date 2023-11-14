import React, { useState } from "react";
import MainLoaderWithText from "../../Loaders/MainLoaderWithText";
import BasicModalTailwind from "../../../UI/MainModals/BasicModalTailwind";
import { Globe, Link, Link2, Lock, QrCode } from "lucide-react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SecondLoaderWithText from "../../Loaders/SecondLoaderWithText";
import axios from "axios";
import { useSelector } from "react-redux";
import URL from "./../../../Data/data.json";
import { encryptData } from "../../Functions/Link/Encrypt";
import { toast } from "sonner";

function ShareModal({ open, setOpen, setModal, doc, setNew }) {
  const [loader, setLoader] = useState(false);
  const [linkType, setLinkType] = useState(
    doc.share && JSON.parse(doc.share).type
      ? JSON.parse(doc.share).type
      : "restricted"
  );
  const [link, setLink] = useState(
    doc.share && JSON.parse(doc.share).link && JSON.parse(doc.share).link
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateLinkToBackend = async () => {
    const linkValue = await encryptData({
      type: "Protocol",
      slug: "protocols",
      id: doc._id,
      access: linkType,
      role: "View",
    });
    console.log(linkValue.replaceAll("/", "Por21Ld"));
    const shareOptions = {
      type: linkType,
      link: `https://app.getstellr.io/p/${linkValue.replaceAll(
        "/",
        "Por21Ld"
      )}`,
    };
    var Newdata = JSON.stringify({
      share: JSON.stringify(shareOptions),
    });
    var config = {
      method: "put",
      url: `${URL[0]}api/protocols/${doc._id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      data: Newdata,
    };
    axios(config)
      .then(async function(response) {
        toast.success("Link Generated");
        setLink(
          `https://app.getstellr.io/p/${linkValue.replaceAll("/", "Por21Ld")}`
        );
        // setOpen(false);
        // setModal(false);
        // setNew(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <BasicModalTailwind open={open} setOpen={setOpen}>
      {loader && <SecondLoaderWithText text="Generating" />}
      <div className="">
        <h1 className="text-xl">Share "{doc.title}"</h1>
        {/* <div className="pt-5">
          <h3>People with access</h3>
          <div className="flow-root mt-6">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {people.map((person) => (
                <li key={person.handle} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={person.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {person.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {"@" + person.handle}
                      </p>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        <div className="pt-5">
          <h3>General access</h3>
          <div className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {linkType === "restricted" ? (
                  <div className="bg-gray-100 p-3 rounded-full">
                    {" "}
                    <Lock size={16} className="text-gray-900" />
                  </div>
                ) : (
                  <div className="bg-gray-200 p-3 rounded-full">
                    {" "}
                    <Globe size={16} className="text-gray-900" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <>
                  <select
                    id="countries"
                    onChange={(e) => {
                      setLinkType(e.target.value);
                    }}
                    value={linkType}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  >
                    <option value="restricted">Only Me</option>
                    <option value="anyone">Anyone with the link</option>
                  </select>
                </>
              </div>
            </div>
            <p className="text-sm text-gray-500 ml-2 mt-1">
              {linkType === "restricted"
                ? "Only people with access can open with the link"
                : " Anyone on the internet with the link can view"}
            </p>
            {linkType === "anyone" && (
              <div className="pt-5">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                >
                  <option selected="">Viewer</option>
                  <option value="US">Editor</option>
                </select>
              </div>
            )}

            <div className="pt-5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  updateLinkToBackend();
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
              >
                <Link2 size={16} className="mr-2" />
                Generate Link
              </button>
            </div>
            {link && (
              <div className="pt-5">
                {" "}
                <button
                  onClick={(e) => {
                    navigator.clipboard.writeText(link);
                    toast.success("Copied to clipboard");
                  }}
                  type="button"
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2"
                >
                  <Link size={12} className="mr-2" />
                  Copy URL
                </button>
              </div>
            )}

            {/* <div className="pt-5">
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
              >
                <QrCode size={16} className="mr-2" />
                Generate QR-Code
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </BasicModalTailwind>
  );
}

export default ShareModal;
