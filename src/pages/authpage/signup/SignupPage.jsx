import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastHandler } from "../../../utils/toastutils";
import { useDispatch } from "react-redux";
import { signupHandler } from "../../../store/authenticationSlice";
import { useSelector } from "react-redux";

export const SignupPage = () => {

    const [signupForm, setSignupForm] = useState({firstName: "", lastName:"", username: "", password: ""})

    const {token} = useSelector(store=>store.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    function formHandler(e){
        e.preventDefault()

        const {firstName, lastName, username, password} = signupForm
        if (firstName && lastName && username && password !== '') {
            (async () => {
              signupUser( firstName, lastName, username, password);
            })();
        }else{
          ToastHandler("error", "Please enter valid username and password");
        }
    }

    const signupUser = async (firstName, lastName, username, password) => {
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

      useEffect(()=>{
        if(token){
          navigate("/homepage", { replace: true })
        }
      }, [token, navigate])

  return (
    <div className="auth-page-container">
      <div className="auth-content-container">
        <div className="auth-title">
          <h2 className="text-center">Signup</h2>
        </div>

        <div className="input">
          <label>First Name</label>
          <input className="input-txt" type="name" value={signupForm.firstName} onChange={(e)=>setSignupForm({...signupForm, firstName: e.target.value})} />
        </div>  
        <div className="input">
          <label>Last Name</label>
          <input className="input-txt" type="name" value={signupForm.lastName} onChange={(e)=>setSignupForm({...signupForm, lastName: e.target.value})} />
        </div>  

        <div className="input">
          <label>Email</label>
          <input className="input-txt" type="email" value={signupForm.username} onChange={(e)=>setSignupForm({...signupForm, username: e.target.value})}/>
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
