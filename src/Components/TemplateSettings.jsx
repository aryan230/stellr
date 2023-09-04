import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyTemplates } from "../redux/actions/entryTemplatesActions";
import InsideLoader from "./Loader/InsideLoader";
import Select from "react-select";
import TemplateModal from "./TemplateSettings/TemplateModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import URL from "./../Data/data.json";
function TemplateSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");
  const [id, setId] = useState();
  const [templateModal, setTemplateModal] = useState(false);
  const [templateContent, setTemplateContent] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const entryTemplateListMy = useSelector((state) => state.entryTemplateListMy);
  const { templates, loading, error } = entryTemplateListMy;

  useEffect(() => {
    dispatch(listMyTemplates());
  }, [dispatch]);

  //   useEffect(() => {
  //     if (newSop) {
  //       dispatch(listMySops(userInfo._id));
  //       setNewSop(false);
  //     }
  //   }, [newSop]);

  const deleteHandler = async (id) => {
    var config = {
      method: "delete",
      url: `${URL[0]}api/entry/templates/${id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        toast.success("Template Deleted sucessfully");
        dispatch(listMyTemplates());
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="project-component">
      {templateModal && (
        <TemplateModal
          setTemplateModal={setTemplateModal}
          templateContent={templateContent}
        />
      )}
      <div className="project-component-inside">
        <div className="project-c-header">
          <div className="project-c-header-left">
            <button className="p-c-h-l-t">
              {" "}
              <h1> Browse Templates</h1>
              {/* a */}
            </button>
            <Select placeholder="Select Template from" />
          </div>

          <input
            type="text"
            placeholder={`Search templates by name`}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>

        <div className="project-c-bottom">
          {loading ? (
            <InsideLoader />
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Template Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Template Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Template Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      View
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {templates &&
                    templates.length > 0 &&
                    templates
                      .filter(
                        (entry) =>
                          entry.name
                            .toLowerCase()
                            .includes(inputSearch.toLowerCase()) ||
                          entry._id
                            .toLowerCase()
                            .includes(inputSearch.toLowerCase())
                      )
                      .map(
                        (doc, index) =>
                          !doc.deleted && (
                            <tr className="bg-white border-b">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                {doc._id}
                              </th>
                              <td className="px-6 py-4">{doc.name}</td>
                              <td className="px-6 py-4">Entry</td>
                              <td className="px-6 py-4">
                                {new Date(doc.createdAt).toLocaleString(
                                  "en-GB"
                                )}
                                {/* <a
                              href="#"
                              className="text-indigo-600"
                              onClick={async (e) => {
                                e.preventDefault();
                              }}
                            >
                              View
                            </a> */}
                              </td>
                              <td className="px-6 py-4">
                                <a
                                  href="#"
                                  className="text-indigo-600"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    setTemplateContent(doc);
                                    setTemplateModal(true);
                                  }}
                                >
                                  View
                                </a>
                              </td>
                              <td className="px-6 py-4">
                                <a
                                  href="#"
                                  className="text-red-600"
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteHandler(doc._id);
                                  }}
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          )
                      )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemplateSettings;
