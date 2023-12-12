import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listMyProtocols } from "../redux/actions/protocolActions";
import { Loader, PackageOpen, Recycle } from "lucide-react";
import InsideLoader from "../Components/Loader/InsideLoader";
import SecondInsideLoader from "../Components/Loader/SecondInsideLoader";
import CompleteLoader from "../Components/Loaders/CompleteLoader";
import ArchiveProtocol from "./ArchiveProtocol";
import ArchiveSOP from "./ArchiveSOP";
import ArchiveProjects from "./ArchiveProjects";
import axios from "axios";
import toast from "react-hot-toast";
import URL from "./../Data/data.json";

const ArchiveMain = ({ setWhichTabisActive }) => {
  const dispatch = useDispatch();

  const protocolListMy = useSelector((state) => state.protocolListMy);
  const { protocols, loading: loadingP, error: error } = protocolListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleRestore = async (name, id) => {
    var config = {
      method: "delete",
      url: `${URL[0]}api/${name}/r/${id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        toast.success("Project Restored");
        setWhichTabisActive("home");
        // setDelete(false);
        // setProjectSettings(false);
        // setNewCollab(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center pb-10 text-3xl font-black text-gray-700 sm:text-4xl flex items-center justify-center">
            <PackageOpen className="mr-5 text-indigo-500" size={30} />
            Archive Settings
          </h2>
          <ArchiveProjects handleRestore={handleRestore} />
          <ArchiveProtocol />
          <ArchiveSOP />
        </div>
      </div>
    </div>
  );
};

export default ArchiveMain;
