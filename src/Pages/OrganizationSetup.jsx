import React, { useEffect, useState } from "react";
import CreateOrg from "./Modals/CreateOrg";
import JoinOrg from "./Modals/JoinOrg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listMyCollabOrgs,
  listMyOrgs,
} from "../redux/actions/organizationActions";

function OrganizationSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrg, setCreateOrg] = useState(false);
  const [joinOrg, setJoinOrg] = useState(false);
  const orgListMy = useSelector((state) => state.orgListMy);
  const { loading: loading, error: error, sucess: sucess, orgs } = orgListMy;

  const orgListMyCollab = useSelector((state) => state.orgListMyCollab);
  const { sucess: sucessCollab, orgs: orgsCollab } = orgListMyCollab;

  useEffect(() => {
    if (sucess && sucessCollab) {
      if (orgs.length != 0 || orgsCollab.length != 0) {
        navigate("/");
      }
    }
  });

  useEffect(() => {
    dispatch(listMyOrgs());
    dispatch(listMyCollabOrgs());
  }, [dispatch]);
  return (
    <div className="org-content">
      {createOrg && <CreateOrg setCreateOrg={setCreateOrg} />}
      {joinOrg && <JoinOrg setJoinOrg={setJoinOrg} />}
      <div className="org-div-container">
        <div className="top-org-div-container">
          <img
            src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg?w=1380&t=st=1691142964~exp=1691143564~hmac=9700a949e44ca1729b5a48473436a503d6fb2e7f1f2d1d6cf7f3a21ddc117b5c"
            alt=""
          />

          <p>
            Create an organization or if you have been invited to join, join an
            organization
          </p>
          <button
            onClick={() => {
              setCreateOrg(true);
            }}
          >
            Create an organization
          </button>
          <button
            onClick={() => {
              setJoinOrg(true);
            }}
          >
            Join an organization
          </button>
        </div>
      </div>
      {/* <div className="container">
        <div className="grid-wrapper grid-col-auto">
          <label htmlFor="radio-card-1" className="radio-card">
            <input
              type="radio"
              name="radio-card"
              id="radio-card-1"
              defaultChecked=""
            />
            <div className="card-content-wrapper">
              <span className="check-icon" />
              <div className="card-content">
                <img
                  src="https://image.freepik.com/free-vector/group-friends-giving-high-five_23-2148363170.jpg"
                  alt=""
                />

                <h4>Lorem ipsum dolor.</h4>
                <h5>Lorem ipsum dolor sit amet, consectetur.</h5>
              </div>
            </div>
          </label>

          <label htmlFor="radio-card-2" className="radio-card">
            <input type="radio" name="radio-card" id="radio-card-2" />
            <div className="card-content-wrapper">
              <span className="check-icon" />
              <div className="card-content">
                <img
                  src="https://image.freepik.com/free-vector/people-putting-puzzle-pieces-together_52683-28610.jpg"
                  alt=""
                />
                <h4>Lorem ipsum dolor.</h4>
                <h5>Lorem ipsum dolor sit amet, consectetur.</h5>
              </div>
            </div>
          </label>
        </div>
      </div> */}
    </div>
  );
}

export default OrganizationSetup;
