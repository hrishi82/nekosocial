import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginServices, getUsersServiceHandler, getPostsServiceHandler} from "../../../services/services"
import "../Auth.css"
import {useData} from "../../../context/dataContext"
import {useAuth} from "../../../context/authContext"

const LoginPage = () => {

    const navigate = useNavigate()

    const {token, setToken, user, setUser} = useAuth()

    const {dispatch} = useData()
  
    const [credential, setCredential] = useState({username: "", password: ""})


    const loginHandler = async (e) => {
      e.preventDefault();
      try {
        let response;
        if (e.target.innerText === "Login as Guest") {
          setCredential({
            username: "JohnDoe",
            password: "johndoe123",
          });
          
          response = await loginServices('JohnDoe', 'johndoe123');
          
        } else {
          response = await loginServices(credential.username, credential.password);
        }
  
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: response.data.encodedToken,
              user: response.data.foundUser,
            })
          );

          const userResp = await getUsersServiceHandler()
          if (userResp.status === 200 || userResp.status === 201 ){
            dispatch({type:"SET_ALL_USERS", payload: userResp.data.users })
        }
        
          const postResp = await getPostsServiceHandler()
          if (postResp.status === 200 || postResp.status === 201 ){
            dispatch({type:"SET_ALL_POSTS", payload: postResp.data.posts })
        }

  
          setUser(response.data.foundUser);
          setToken(response.data.encodedToken);
          navigate("/homepage");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        <div className="auth-page-container">
          <div className="auth-content-container">
            <div className="auth-title">
              <h2 className="text-center">Login</h2>
            </div>
  
            <div className="input">
              <label>Username</label>
              <input
                className="input-txt"
                type="text"
                value={credential.username}
                onChange = {e=> setCredential({...credential, username: e.target.value})}
              />
            </div>
  
            <div className="input">
              <label>Password</label>
              <input
                className="input-txt"
                type="password"
                value={credential.password}
                onChange = {e=> setCredential({...credential, password: e.target.value})}
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
                Forget your Password?
              </Link>
            </div>
  
            <div className="auth-form-btn-container">
              <button
                className="btn btn-primary auth-form-btn"
                onClick = {(e)=>loginHandler(e)}
              >
                Login
              </button>
  
              <button
                className="btn btn-secondary auth-form-btn"
                onClick = {(e)=>loginHandler(e)}
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
  