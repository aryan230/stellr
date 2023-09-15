import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrg } from "../../../redux/actions/organizationActions";
import { ORG_CREATE_RESET } from "../../../redux/constants/organizationConstants";

function CreateOrgModal({
  setNewOrg,
  setCreateOrg,
  setWhichTabisActive,
  setUpdatedUserCollabRoleOrg,
  setShowBannerOrg,
}) {
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
      setNewOrg(true);
      setShowBannerOrg(false);
      setWhichTabisActive("orgList");
    }
  }, [sucess]);
  return (
    <div className="forms-inside-div">
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
  );
}

export default CreateOrgModal;
