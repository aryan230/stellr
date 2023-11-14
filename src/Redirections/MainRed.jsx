import React, { useState, useEffect } from "react";
import SecondLoaderWithText from "../Components/Loaders/SecondLoaderWithText";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { XCircleIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import axios from "axios";
import URL from "./../Data/data.json";

function MainRed({
  setProtocolContent,
  setProtocolModal,
  setSopModal,
  setSopContent,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=p/${id}`);
    } else {
      const ciphertext = id.toString().replaceAll("Por21Ld", "/");
      var bytes = CryptoJS.AES.decrypt(ciphertext, "3VJx8BtRnD");
      if (bytes) {
        try {
          var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          // {
          //   "type": "Protocol",
          //   "id": "64e75b45b9c27a5938186278",
          //   "access": "anyone",
          //   "role": "View"
          // }
          if (
            decryptedData &&
            decryptedData.access &&
            decryptedData.type &&
            decryptedData.id &&
            decryptedData.access
          ) {
            console.log(decryptedData);
            var config = {
              method: "get",
              url: `${URL[0]}api/${decryptedData.slug}/p/${decryptedData.id}`,
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
              },
            };

            axios(config)
              .then(function(response) {
                if (decryptedData.access === "anyone") {
                  response.data.access = "view";
                  if (decryptedData.slug === "protocols") {
                    setLoader(false);
                    navigate("/");
                    setProtocolContent(response.data);
                    setProtocolModal(true);
                  } else {
                    setLoader(false);
                    navigate("/");
                    setSopContent(response.data);
                    setSopModal(true);
                  }
                } else {
                  if (response.data.user === userInfo._id) {
                    if (decryptedData.slug === "protocols") {
                      setLoader(false);
                      navigate("/");
                      setProtocolContent(response.data);
                      setProtocolModal(true);
                    } else {
                      setLoader(false);
                      navigate("/");
                      setSopContent(response.data);
                      setSopModal(true);
                    }
                  } else {
                    setLoader(false);
                    setError(true);
                    setErrorMessage("The Entity is restricted");
                  }
                }
              })
              .catch(function(error) {
                setLoader(false);
                setError(true);
                setErrorMessage("The link is not valid");
              });
          } else {
            setLoader(false);
            setError(true);
            setErrorMessage("The link is not valid");
          }
        } catch {
          setLoader(false);
          setError(true);
          setErrorMessage("The link is not valid");
        }
      } else {
        setLoader(false);
        setError(true);
        setErrorMessage("The link is not valid");
      }
    }
  }, []);

  return (
    <div className="main-red">
      <div className="inside-main-red">
        {loader && <SecondLoaderWithText />}
        {error ? (
          <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
            <button
              type="button"
              onClick={(e) => {
                navigate("/");
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MainRed;
