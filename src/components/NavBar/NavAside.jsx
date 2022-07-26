import "../Aside/asidebar.css";
import "./navaside.css"
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../../src/store/authenticationSlice";
import {toggleCommentInputModal} from "../../../src/store/postSlice"
import {toggleSidebar} from "../../../src/store/utilitiesSlice"

export const NavAside = () => {
  const { token, user } = useSelector(store => store.auth)
  const { displaySidebar } = useSelector(store => store.utilities)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutFunc = () => {
    dispatch(logoutHandler())
    navigate("/logoutpage");
  };

//   const addPostHandler = () =>{
//     dispatch(toggleCommentInputModal());
//   }

  return (
    <div>
        {
           displaySidebar &&  <aside className="nav-sidebar">
           <ul className="nav-sidebar-list-container">
             <li className="nav-sidebar-li-item">
               <NavLink
                 to="/homepage"
                 className={({ isActive }) =>
                   isActive ? "navlink-active" : "navlink"
                 }
                 onClick={() => dispatch(toggleSidebar())}
               >
                 <div className="nav-sidebar-icon-container">
                   <i className="fa-solid fa-house-chimney"></i>
                 </div>
                 <p className="navlink-text">Home</p>
               </NavLink>
             </li>
     
             <li className="nav-sidebar-li-item">
               <NavLink
                 to="/explorepage"
                 className={({ isActive }) =>
                   isActive ? "navlink-active" : "navlink"
                 }
                 onClick={() => dispatch(toggleSidebar())}
               >
                 <div className="nav-sidebar-icon-container">
                   <i className="fa-solid fa-rocket"></i>
                 </div>
                 <p className="navlink-text">Explore</p>
               </NavLink>
             </li>
     
             <li className="nav-sidebar-li-item">
               <NavLink
                 to="/bookmarkspage"
                 className={({ isActive }) =>
                   isActive ? "navlink-active" : "navlink"
                 }
                 onClick={() => dispatch(toggleSidebar())}
               >
                 <div className="nav-sidebar-icon-container">
                   <i className="fa-solid fa-bookmark"></i>
                 </div>
                 <p className="navlink-text">Bookmarks</p>
               </NavLink>
             </li>
     
             <li className="nav-sidebar-li-item">
               <NavLink
                 to="/notificationpage"
                 className={({ isActive }) =>
                   isActive ? "navlink-active" : "navlink"
                 }
                 onClick={() => dispatch(toggleSidebar())}
               >
                 <div className="nav-sidebar-icon-container">
                   <i className="fa-solid fa-bell"></i>
                 </div>
                 <p className="navlink-text">Notifications</p>
               </NavLink>
             </li>
     
             <li className="nav-sidebar-li-item">
               <NavLink
                 to={`/profilepage/${user?.username}`}
                 className={({ isActive }) =>
                   isActive ? "navlink-active" : "navlink"
                 }
                 onClick={() => dispatch(toggleSidebar())}
               >
                 {" "}
                 <div className="nav-sidebar-icon-container">
                   <i className="fa-solid fa-user"></i>
                 </div>
                 <p className="navlink-text">Profile</p>
               </NavLink>
             </li>
     
           </ul>
     
           <ul className="nav-sidebar-list-container nav-sidebar-list-container-bottom">

             <li className="nav-sidebar-li-item">
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
                   onClick={() => dispatch(toggleSidebar())}
                 >
                   LOGIN
                 </NavLink>
               )}
             </li>
           </ul>
         </aside>
        }
    </div>
    
  );
};
