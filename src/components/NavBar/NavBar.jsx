import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"

const NavBar = () => {


  const toggleSidebar = () =>{
    // dispatch({type: "TOGGLE_SIDEBAR"})
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
        <a href="https://github.com/hrishi82/nekosocial" className="link-no-decor" target="_blank" rel="noreferrer">GITHUB</a>
        {/* <a>GITHUB</a> */}
      </nav>

    </nav>
  );
};

export {NavBar}
