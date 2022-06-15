import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastHandler } from "../../../utils/toastutils";
import { useDispatch } from "react-redux";
import { signupHandler } from "../../../store/authenticationSlice";

export const SignupPage = () => {

    const [signupForm, setSignupForm] = useState({firstname: "", lastname:"", username: "", password: ""})

    const navigate = useNavigate();
    const dispatch = useDispatch()

    function formHandler(e){
        e.preventDefault()

        const {firstname, lastname, username, password} = signupForm
        if (firstname && lastname && username && password !== '') {
            (async () => {
              signupUser( firstname, lastname, username, password);
            })();
        }else{
          ToastHandler("error", "Please enter valid username and password");
        }
    }

    const signupUser = async (firstname, lastname, username, password) => {
        try {
          dispatch(signupHandler({
            username: signupForm.username,
            password: signupForm.password,
            firstName: signupForm.firstName,
            lastName: signupForm.lastName,
          }))
          
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className="auth-page-container">
      <div className="auth-content-container">
        <div className="auth-title">
          <h2 className="text-center">Signup</h2>
        </div>

        <div className="input">
          <label>First Name</label>
          <input className="input-txt" type="name" value={signupForm.firstname} onChange={(e)=>setSignupForm({...signupForm, firstname: e.target.value})} />
        </div>  
        <div className="input">
          <label>Last Name</label>
          <input className="input-txt" type="name" value={signupForm.lastname} onChange={(e)=>setSignupForm({...signupForm, lastname: e.target.value})} />
        </div>  

        <div className="input">
          <label>Email</label>
          <input className="input-txt" type="email" value={signupForm.email} onChange={(e)=>setSignupForm({...signupForm, email: e.target.value})}/>
        </div>

        <div className="input">
          <label>Password</label>
          <input className="input-txt" type="password" value={signupForm.password} onChange={(e)=>setSignupForm({...signupForm, password: e.target.value})}/>
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
          <button className="btn btn-primary" onClick={(e)=>formHandler(e)}>Create New Account</button>
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
