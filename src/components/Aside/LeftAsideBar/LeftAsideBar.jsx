import "../asidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../../store/authenticationSlice";
import {toggleCommentInputModal} from "../../../store/postSlice"
import {resetFormData} from "../../../store/utilitiesSlice"

export const LeftAsideBar = () => {
  const { token, user } = useSelector(store => store.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutFunc = () => {
    dispatch(logoutHandler())
    navigate("/logoutpage");
  };

  const addPostHandler = () =>{
    dispatch(toggleCommentInputModal());
    dispatch(resetFormData())
  }

  return (
    <aside className="sidebar">
      <ul className="sidebar-list-container">
        <li className="sidebar-li-item">
          <NavLink
            to="/homepage"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
            
          >
            <div className="sidebar-icon-container">
              <i className="fa-solid fa-house-chimney"></i>
            </div>
            <p className="navlink-text">Home</p>
          </NavLink>
        </li>

        <li className="sidebar-li-item">
          <NavLink
            to="/explorepage"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
            
          >
            <div className="sidebar-icon-container">
              <i className="fa-solid fa-rocket"></i>
            </div>
            <p className="navlink-text">Explore</p>
          </NavLink>
        </li>

        <li className="sidebar-li-item">
          <NavLink
            to="/bookmarkspage"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
            
          >
            <div className="sidebar-icon-container">
              <i className="fa-solid fa-bookmark"></i>
            </div>
            <p className="navlink-text">Bookmarks</p>
          </NavLink>
        </li>

        <li className="sidebar-li-item">
          <NavLink
            to="/notificationpage"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
            
          >
            <div className="sidebar-icon-container">
              <i className="fa-solid fa-bell"></i>
            </div>
            <p className="navlink-text">Notifications</p>
          </NavLink>
        </li>

        <li className="sidebar-li-item">
          <NavLink
            to={`/profilepage/${user?.username}`}
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
            
          >
            {" "}
            <div className="sidebar-icon-container">
              <i className="fa-solid fa-user"></i>
            </div>
            <p className="navlink-text">Profile</p>
          </NavLink>
        </li>

        <li className="sidebar-li-item aside-newpost-btn-li">
          <button
            className="btn btn-primary aside-newpost-btn"
            onClick={addPostHandler}
          >
            Create New Post
          </button>
        </li>

      </ul>

      <ul className="sidebar-list-container sidebar-list-container-bottom">
        {/* <li className="sidebar-li-item">
          {token && (
            <NavLink
              to="/profilepage"
              className={({ isActive }) =>
                isActive ? "navlink-active" : "navlink"
              }
              
            >
              PROFILE
            </NavLink>
          )}
        </li> */}
        <li className="sidebar-li-item">
          {token ? (
            <NavLink
              to="/loginpage"
              className={({ isActive }) =>
                isActive ? "navlink-active" : "navlink"
              }
              onClick={logoutFunc}
            >
              LOGOUT
            </NavLink>
          ) : (
            <NavLink
              to="/loginpage"
              className={({ isActive }) =>
                isActive ? "navlink-active" : "navlink"
              }
              
            >
              LOGIN
            </NavLink>
          )}
        </li>
      </ul>
    </aside>
  );
};
