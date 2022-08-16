import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastHandler } from "../../../utils/toastutils";
import { useDispatch } from "react-redux";
import { signupHandler } from "../../../store/authenticationSlice";
import { useSelector } from "react-redux";
import { validatePassword } from "../../../utils/authUtils";
import { createRandomUser } from "../../../utils/authUtils";

export const SignupPage = () => {
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    termsConditions: false,
  });
  const [authInputError, setAuthInputError] = useState({
    password: "",
    errorMessage: "",
  });

  const { token } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fakesignupdata = createRandomUser();

  function formHandler(e) {
    e.preventDefault();

    const { firstName, lastName, username, password, termsConditions } =
      signupForm;

    try {
      if (
        firstName &&
        lastName &&
        username &&
        password !== "" &&
        termsConditions
      ) {
        (async () => {
          signupUser(firstName, lastName, username, password);
        })();
      } else if (
        firstName &&
        lastName &&
        username &&
        password !== "" &&
        !termsConditions
      ) {
        setAuthInputError({
          ...authInputError,
          errorMessage: "Please accept terms and conditions",
        });
      } else {
        setAuthInputError({
          ...authInputError,
          errorMessage: "Please provide proper input",
        });
        // ToastHandler("error", "Please enter valid username and password");
      }
    } catch (err){
      console.log(err)
    }
  }

  const dummySignpup = () => {
    const dummySignupData = {
      firstName: fakesignupdata.firstName,
      lastName: fakesignupdata.lastName,
      username: fakesignupdata.username,
      password: fakesignupdata.password,
    };

    console.log(dummySignupData)

    const { firstName, lastName, username, password } = dummySignupData;

    try {
      signupUser(firstName, lastName, username, password);
    } catch (err) {
      console.log(err);
    }
  };


  const credentialHandler = (e) =>{

    setAuthInputError({...authInputError, errorMessage: ""})

      
    if(e.target.name=== "password"){
      setSignupForm({ ...signupForm, password: e.target.value })
      if (!validatePassword(e.target.value)) {
        setAuthInputError({
          ...authInputError,
          password:
            'Password should be in 8 to 20 chars and should have one digit',
        });
      } else {
        setAuthInputError({ ...authInputError, password: '' });
      }
    }else if(e.target.name=== "firstName"){
      setSignupForm({...signupForm, firstName: e.target.value})
    }else if(e.target.name=== "lastName"){
      setSignupForm({...signupForm, lastName: e.target.value})
    }else if(e.target.name=== "username"){
      setSignupForm({...signupForm, username: e.target.value})
    }else if(e.target.name=== "termsAndConditions"){
      setSignupForm({...signupForm, termsConditions: !signupForm.termsConditions})
    }
    
  }

  const signupUser = async (firstName, lastName, username, password) => {
    // try {
    //   dispatch(
    //     signupHandler({
    //       username: signupForm.username,
    //       password: signupForm.password,
    //       firstName: signupForm.firstName,
    //       lastName: signupForm.lastName,
    //     })
    //   );
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      dispatch(
        signupHandler({
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/homepage", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="auth-page-container">
      {/* <div className="auth-content-container">
        <div className="auth-title">
          <h2 className="text-center">Signup</h2>
        </div>

        <div className="input">
          <label>First Name</label>
          <input
            className="input-txt"
            type="name"
            value={signupForm.firstName}
            onChange={(e) =>
              setSignupForm({ ...signupForm, firstName: e.target.value })
            }
          />
        </div>
        <div className="input">
          <label>Last Name</label>
          <input
            className="input-txt"
            type="name"
            value={signupForm.lastName}
            onChange={(e) =>
              setSignupForm({ ...signupForm, lastName: e.target.value })
            }
          />
        </div>

        <div className="input">
          <label>Username</label>
          <input
            className="input-txt"
            type="name"
            value={signupForm.username}
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
          />
        </div>

        <div className="input">
          <label>Password</label>
          <input
            className="input-txt"
            type="password"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
          />
        </div>

        <div className="input input-flex-cont">
          <div className="input-condition-cont">
            <input type="checkbox" className="input-checkbox" />
            <p className="text spacing-sm">
              I accept all the Terms & Conditions
            </p>
          </div>
        </div>

        <div className="auth-form-btn-container">
          <button className="btn btn-primary" onClick={(e) => formHandler(e)}>
            Create New Account
          </button>
        </div>

        <div className="text-center auth-action-signup-link-cont">
          <Link
            className="auth-page-link auth-action-signup-link"
            to="/loginpage"
          >
            Already have an account?
          </Link>
        </div>
      </div> */}

      <div className="auth-content-container">
        <div className="auth-title">
          <h2 className="text-center">Signup</h2>
        </div>

        {authInputError.errorMessage !== "" ? (
                <div className='input auth-input-error-cont text-center'>
                  {authInputError.errorMessage}
                </div>
              ) : null}

        <div className="input">
          <label>First Name</label>
          <input
            className="input-txt"
            type="name"
            name="firstName"
            value={signupForm.firstName}
            onChange={(e)=>credentialHandler(e)}
          />
        </div>
        <div className="input">
          <label>Last Name</label>
          <input
            className="input-txt"
            type="name"
            name="lastName"
            value={signupForm.lastName}
            onChange={(e)=>credentialHandler(e)}
          />
        </div>

        <div className="input">
          <label>Username</label>
          <input
            className="input-txt"
            type="name"
            name="username"
            value={signupForm.username}
            onChange={(e)=>credentialHandler(e)}
          />
        </div>

        <div className="input">
          <label>Password</label>
          <input
            className="input-txt"
            type="password"
            name="password"
            value={signupForm.password}
            onChange={(e)=>credentialHandler(e)}
          />
        </div>
        {authInputError.password ? (
                <div className='input auth-input-error-cont text-left'>
                  {authInputError.password}
                </div>
              ) : null}

        <div className="input input-flex-cont">
          <div className="input-condition-cont">
            <input type="checkbox" className="input-checkbox" name="termsAndConditions" onChange={(e)=>credentialHandler(e)}/>
            <p className="text spacing-sm">
              I accept all the Terms & Conditions
            </p>
          </div>
        </div>

        <div className="auth-form-btn-container">
          <button className="btn btn-primary authform-signup-btn" onClick={(e) => formHandler(e)}>
            Create New Account
          </button>
          <button className="btn btn-secondary authform-signup-btn" onClick={dummySignpup}>Autofill and Signup</button>

        </div>

        <div className="text-center auth-action-signup-link-cont">
          <Link
            className="auth-page-link auth-action-signup-link"
            to="/loginpage"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};
