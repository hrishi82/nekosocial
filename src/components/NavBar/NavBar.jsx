import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import {useAuth} from "../../context/authContext"
import {useData} from "../../context/dataContext"



const NavBar = () => {

  const {token, setToken, setUser} = useAuth()
  const {dispatch} = useData()

  const toggleSidebar = () =>{
    dispatch({type: "TOGGLE_SIDEBAR"})
  }

  return (
    <nav className="nav-wrapper">
      <nav className="nav-items-left">
      <i className="fa-solid fa-bars nav-menu-option" onClick={toggleSidebar}></i>
        <h4 className="nav-title">
          <Link to="/homepage" className="link-no-decor">
            nekoSocial
          </Link>
        </h4>
      </nav>

      <nav className="nav-items-right">
        <p>GITHUB</p>
      </nav>

    </nav>
  );
};

export {NavBar}
