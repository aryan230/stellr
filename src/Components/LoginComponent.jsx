import React, { useEffect, useState } from "react";
import LoaderInside from "../css/utils/LoaderInside";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT } from "../redux/constants/userConstants";
import {
  login,
  loginGoogle,
  loginMicrosoft,
} from "../redux/actions/userActions";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../css/utils/Loader";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import MicrosoftLogin from "react-microsoft-login";

function LoginComponent() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : " ";
  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
      console.log(redirect);
    }
    if (error) {
      dispatch({ type: USER_LOGOUT });
      toast.error(error);
    }
  }, [userInfo, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    setType("local");
    dispatch(
      login({
        email,
        password,
        type,
      })
    );
  };

  const handleLoginGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setType("google");
        dispatch(
          loginGoogle({
            email: data.user.email,
            name: data.user.displayName,
            type,
          })
        );
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const authHandler = (err, data) => {
    if (data) {
      setType("microsoft");
      dispatch(
        loginMicrosoft({
          email: data.account.username,
          name: data.account.name,
          type,
        })
      );
    } else {
      console.log(err);
    }
  };
  return (
    <div className="login-container">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="login-main">
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <img
              src="../assets/stellr-logo.png"
              alt=""
              className="logo-login"
            />
            <h1> Login or create a new account.</h1>
            <form onSubmit={submitHandler}>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
            <h4>
              <span>or</span>
            </h4>
            <div className="auth-containers">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLoginGoogle();
                }}
              >
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />{" "}
                Sign in with Google
              </button>
              <MicrosoftLogin
                className="some-micro-button"
                clientId={`fda8e69f-f517-4387-90ed-0b1c2b97206f`}
                authCallback={authHandler}
              >
                <button>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
                    alt=""
                  />{" "}
                  Sign in with Microsoft
                </button>
              </MicrosoftLogin>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginComponent;
