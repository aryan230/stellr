import React from "react";

import MainModalTailwind from "../UI/MainModals/MainModalTailwind";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";

function SessionExpired({ open, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="modal">
      <div className="relative bg-white rounded-xl shadow max-h-[80vh] overflow-y-auto custom-scrollbar-task w-full max-w-2xl">
        {/* Modal header */}

        <div className="flex items-center justify-between p-5 py-8 border-b rounded-t sticky top-0 bg-white z-50">
          <h3 className="text-xl font-medium text-gray-900 font-sans">
            Session Expired
          </h3>
        </div>
        {/* Modal body */}
        <div className="p-6 space-y-6">
          <p className="font-body">
            The session got expired. Please{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatch(logout());
                navigate("/login");
              }}
              className="text-indigo-700 font-semibold"
            >
              Login
            </a>{" "}
            to continue using the application
          </p>
        </div>
      </div>
    </div>
  );
}

export default SessionExpired;
