import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {toggleSidebar} from "../../../src/store/utilitiesSlice"

const NavBar = () => {

  const dispatch = useDispatch()

  return (
    <nav className="nav-wrapper">
      <nav className="nav-items-left">
        <h4 className="nav-title">
          <Link to="/homepage" className="link-no-decor">
            nekoSocial
          </Link>
        </h4>
      </nav>

      <nav className="nav-items-right">
      <i
            className="fas fa-bars nav-menu-option"
            onClick={() => {
              dispatch(toggleSidebar())
            }}
          ></i>
      </nav>

    </nav>
  );
};

export {NavBar}
