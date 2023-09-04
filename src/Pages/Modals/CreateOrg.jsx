import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrg } from "../../redux/actions/organizationActions";
import { ORG_CREATE_RESET } from "../../redux/constants/organizationConstants";

function CreateOrg({ setCreateOrg }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [des, setDes] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orgCreate = useSelector((state) => state.orgCreate);
  const { org, sucess, error, loading: orderCreateLoading } = orgCreate;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (userInfo) {
      await dispatch(
        createOrg({
          name,
          description: des,
        })
      );
      await dispatch({
        type: ORG_CREATE_RESET,
      });
    }
  };

  useEffect(() => {
    if (sucess) {
      setCreateOrg(false);
      navigate("/");
    }
  }, [sucess]);
  return (
    <div className="modal">
      <div className="create-org-modal-inside">
        <div className="top-modal">
          <button
            onClick={() => {
              setCreateOrg(false);
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
        <h1>Create New Organization</h1>
        <div className="form-inside-org">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter a name for your organization"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              type="text"
              placeholder="Enter a description for your organization"
              onChange={(e) => setDes(e.target.value)}
              required
            />

            <div className="margin-maker"></div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrg;
