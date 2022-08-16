import "./searchbar.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export const SearchBar = ({ setSearchActive}) => {

  const { users } = useSelector((store) => store.users);
  const { user,token } = useSelector(store => store.auth)
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const searchHandler = (e) => {
    let searchValue = e.target.value;
    setSearchQuery(e.target.value)

    // if(e.target.value !==""){
    //   setSearchActive(true)
    // }else{
    //   setSearchActive(false)
    //   setSearchQuery("")
    //   setSearchResult("")
    // }

    if(e.target.value !==""){
      setSearchActive(true)
      const filteredUsers = users.filter((el) => {
        return el.username.includes(searchValue) && el.username !== user.username ? el : null;
      });
      setSearchResult(filteredUsers);
    }else{
      setSearchActive(false)
      setSearchResult([])
    }


  };

  const navigateToProfileHandler = (el) => {
    navigate(`/profilepage/${el?.username}`);
  };

  return (
    <>
      <div className="searchbar-container relative">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search.."
            name="search-bar"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => searchHandler(e)}
          />
          {searchResult.length === 0 ? (
            <button type="submit" className="search-bar-btn">
              <i className="fas fa-search"></i>
            </button>
          ) : (
            <button type="submit" className="search-bar-btn" onClick={()=>{
                setSearchQuery("")
                setSearchResult([])
                setSearchActive(false)
                }}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {searchResult.length !== 0 && (
          <div className="searchbar-search-result-container">
            <ul className="search-result-table">
              {searchResult.map((el) => {
                return (
                  <li
                    key={el?.username}
                    className="sidebar-explore-list-item search-result-li"
                  >
                    <div>
                      <img
                        src={el?.profilePicture}
                        alt="avatar"
                        className="avatar avatar-size-xs"
                      />
                      <p
                        className="sidebar-explore-list-item-label"
                        onClick={() => navigateToProfileHandler(el)}
                      >
                        {el.username}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
