import "../asidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

export const RightAsideBar = () => {

  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="searchbar-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search.."
            name="search-bar"
            className="search-bar"
          />
          <button type="submit" className="search-bar-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="sidebar-explore-container">
        people
      </div>
    </aside>
  );
};
