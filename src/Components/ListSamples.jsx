import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listMyCollabProjects,
  listMyProjects,
} from "../redux/actions/projectActions";
import { useNavigate } from "react-router-dom";
import ProjectComponent from "./ProjectComponent";
import { listMySamples } from "../redux/actions/sampleActions";
import InsideLoader from "./Loader/InsideLoader";
import ListSampleSubject from "./ListSampleComponent/ListSampleSubject";
import ListSampleOther from "./ListSampleComponent/ListSampleOther";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import { Helmet } from "react-helmet";

function ListSamples({
  setSampleContent,
  setSampleModal,
  newSample,
  setCreateNewSampleModal,
  setNewSample,
  sampleUpdate,
  setSampleUpdate,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");
  const [id, setId] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const sampleListMy = useSelector((state) => state.sampleListMy);
  const {
    samples,
    loading: loadingSamples,
    error: errorSamples,
  } = sampleListMy;

  useEffect(() => {
    dispatch(listMySamples(userInfo._id));
  }, [dispatch]);
  useEffect(() => {
    if (newSample) {
      dispatch(listMySamples(userInfo._id));
      setNewSample(false);
    }
  }, [newSample]);
  //sampleUpdate
  useEffect(() => {
    if (sampleUpdate) {
      dispatch(listMySamples(userInfo._id));
      setSampleUpdate(false);
    }
  }, [sampleUpdate]);
  console.log(samples);
  return (
    <div className="project-component">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Data Registries and Management | Bio-Pharma ELN Software</title>
        <meta
          name="description"
          content="Effectively manage and maintain data registries with our specialized Bio-Pharma ELN software. Simplify data organization and accessibility."
        />
      </Helmet>
      <div className="project-component-inside">
        <div className="project-c-header">
          <div className="project-c-header-left">
            <button className="p-c-h-l-t">
              {" "}
              <h1> Browse Samples</h1>
              {/* a */}
            </button>
            <div className="project-c-header-right">
              <button
                onClick={() => {
                  setCreateNewSampleModal(true);
                }}
                className="setting-btn add-sample"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5V1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15V15ZM12 8.25H9.75V6C9.75 5.80109 9.67099 5.61032 9.53033 5.46967C9.38968 5.32902 9.19892 5.25 9 5.25C8.80109 5.25 8.61033 5.32902 8.46967 5.46967C8.32902 5.61032 8.25 5.80109 8.25 6V8.25H6C5.80109 8.25 5.61033 8.32902 5.46967 8.46967C5.32902 8.61032 5.25 8.80109 5.25 9C5.25 9.19891 5.32902 9.38968 5.46967 9.53033C5.61033 9.67098 5.80109 9.75 6 9.75H8.25V12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61033 12.671 8.80109 12.75 9 12.75C9.19892 12.75 9.38968 12.671 9.53033 12.5303C9.67099 12.3897 9.75 12.1989 9.75 12V9.75H12C12.1989 9.75 12.3897 9.67098 12.5303 9.53033C12.671 9.38968 12.75 9.19891 12.75 9C12.75 8.80109 12.671 8.61032 12.5303 8.46967C12.3897 8.32902 12.1989 8.25 12 8.25Z"
                    fill="white"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder={`Search samples by name`}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
        {/* <div className="project-c-header">
          <div className="project-c-header-left">
            <h1>Browse samples </h1>
            <input
              type="text"
              placeholder={`Search samples by name`}
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </div>
          <div className="project-c-header-right"></div>
        </div> */}
        <div className="project-c-bottom">
          {loadingSamples ? (
            <InsideLoader />
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sample Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sample Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Record Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sample Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created By
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Modified Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Modified by
                    </th>
                    <th scope="col" className="px-6 py-3">
                      View Sample
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {samples &&
                    samples.length > 0 &&
                    samples
                      .filter(
                        (entry) =>
                          JSON.parse(entry.data)
                            .sampleName.toLowerCase()
                            .includes(inputSearch.toLowerCase()) ||
                          entry.type
                            .toLowerCase()
                            .includes(inputSearch.toLowerCase())
                      )
                      .sort(function(a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })
                      .map((doc, index) =>
                        doc.type == "Subject/Patient" ? (
                          <ListSampleSubject
                            doc={doc}
                            index={index}
                            setSampleContent={setSampleContent}
                            setSampleModal={setSampleModal}
                          />
                        ) : (
                          <ListSampleOther
                            doc={doc}
                            index={index}
                            setSampleContent={setSampleContent}
                            setSampleModal={setSampleModal}
                          />
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

export default ListSamples;
