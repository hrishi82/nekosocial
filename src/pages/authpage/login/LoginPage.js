import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { useSelector, useDispatch } from "react-redux";
import { loginHandler } from "../../../store/authenticationSlice";

const LoginPage = () => {
  const [credential, setCredential] = useState({ username: "", password: "" });
  const [authInputError, setAuthInputError] = useState({errorMessage: ""});

  const { token } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginFunc = (e) => {

    if(credential.username==="" || credential.password===""){
      setAuthInputError({...authInputError, errorMessage: "Please provide proper input or credentials"})
      return
    }else{
      setAuthInputError({...authInputError, errorMessage: ""})
    }
      
    dispatch(loginHandler({ username: credential.username, password: credential.password }));
    setCredential({ username: "", password: "" })
  };


  const dummyLoginFunc = (e) => {

    if (e.target.innerText === "Login as Guest"){
      setCredential({username: 'JohnDoe',password: 'johndoe123'})
      dispatch(loginHandler({ username: "JohnDoe", password: "johndoe123" }));
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/homepage", { replace: true });
    }
  }, [token, navigate]);

  return (
    <>
      <div className="auth-page-container">
        <div className="auth-content-container">
          <div className="auth-title">
            <h2 className="text-center">Login</h2>
          </div>

          {authInputError.errorMessage !== "" ? (
            <div className="input auth-input-error-cont">
              {authInputError.errorMessage}
            </div>
          ) : null}

          <div className="input">
            <label>Username</label>
            <input
              className="input-txt"
              type="text"
              value={credential.username}
              onChange={(e) =>
                setCredential({ ...credential, username: e.target.value })
              }
            />
          </div>

          <div className="input">
            <label>Password</label>
            <input
              className="input-txt"
              type="password"
              value={credential.password}
              onChange={(e) =>
                setCredential({ ...credential, password: e.target.value })
              }
            />
          </div>

          <div className="input input-flex-cont">
            <div className="input-condition-cont">
              <input type="checkbox" className="input-checkbox" />
              <p className="text spacing-sm">Remember Me</p>
            </div>

            <Link
              to="/loginpage"
              className="auth-form-forget-pass-alignment auth-page-link"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="auth-form-btn-container">
            <button
              className="btn btn-primary auth-form-btn"
              onClick={(e) => loginFunc(e)}
            >
              Login
            </button>

            <button
              className="btn btn-secondary auth-form-btn"
              onClick={(e) => dummyLoginFunc(e)}
            >
              Login as Guest
            </button>
          </div>

          <div className="text-center auth-action-signup-link-cont">
            <Link
              to="/signuppage"
              className="auth-page-link auth-action-signup-link"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { LoginPage };
