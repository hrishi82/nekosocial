import "../asidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useData } from "../../../context/dataContext";

export const LeftAsideBar = () => {
  const { token, setToken, setUser } = useAuth();
  const { state, dispatch, postData } = useData();
  const { displaySidebar } = state;
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("login");
    setToken(null);
    setUser(null);
    dispatch({ type: "SET_ALL_NOTES", payload: [] });
    dispatch({ type: "SET_ALL_ARCHIVED_NOTES", payload: [] });
    navigate("/logoutpage");
  };

  return (
    <aside className={`sidebar ${displaySidebar && "sidebar-show"} `}>
      <ul className="sidebar-list-container">
        <li className="sidebar-li-item">
          <NavLink
            to="/homepage"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
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
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
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
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
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
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            <div className="sidebar-icon-container">
              <i className="fa-solid fa-bell"></i>
            </div>
            <p className="navlink-text">Notifications</p>
          </NavLink>
        </li>

        <li className="sidebar-li-item">
          <NavLink
            to="/profilepage"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            {" "}
            <div className="sidebar-icon-container">
              <i className="fa-solid fa-user"></i>
            </div>
            <p className="navlink-text">Profile</p>
          </NavLink>
        </li>

        <li className="sidebar-li-item">
          <button
            className="btn btn-primary aside-newpost-btn"
          >
            Create New Post
          </button>
        </li>

      </ul>

      <ul className="sidebar-list-container sidebar-list-container-bottom">
        <li className="sidebar-li-item">
          {token && (
            <NavLink
              to="/profilepage"
              className={({ isActive }) =>
                isActive ? "navlink-active" : "navlink"
              }
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            >
              PROFILE
            </NavLink>
          )}
        </li>
        <li className="sidebar-li-item">
          {token ? (
            <NavLink
              to="/loginpage"
              className={({ isActive }) =>
                isActive ? "navlink-active" : "navlink"
              }
              onClick={(e) => logoutHandler(e)}
            >
              LOGOUT{" "}
            </NavLink>
          ) : (
            <NavLink
              to="/loginpage"
              className={({ isActive }) =>
                isActive ? "navlink-active" : "navlink"
              }
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            >
              LOGIN
            </NavLink>
          )}
        </li>
      </ul>
    </aside>
  );
};
