import "../asidebar.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {followUser, unfollowUser} from "../../../../src/store/userSlice"
import {getUserDetails, getUserPosts} from "../../../../src/store/profileSlice"
import {getAllUsers} from "../../../../src/store/userSlice"

export const RightAsideBar = () => {
  const { users } = useSelector(store => store.users)
  const { user,token } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const peopleFollowed = user?.following.map(el=>el?.username)
  const peopleNotFollowed =  users?.filter((el) => !peopleFollowed?.includes(el?.username)).filter(el=>el?.username !== user?.username )

  const isFollowed = (userData) => user?.followers?.some((el) => el?.username === userData.username);

  useEffect(()=>{
    dispatch(getUserDetails(user?.username))
    dispatch(getUserPosts(user?.username))
    dispatch(getAllUsers())
}, [dispatch, user])


  const followUnfollowHandlerFunc = (userData) =>{

    if(isFollowed(userData)){
        dispatch(unfollowUser({ followUserId: userData._id, token: token, dispatch }))
    }else{
        dispatch(followUser({ followUserId: userData._id, token: token, dispatch }))
    }
  }

  const navigateToProfileHandler = (el) =>{
    navigate(`/profilepage/${el?.username}`);
  }


  return (
    <aside className="sidebar right-sidebar">
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
      {peopleNotFollowed?.length !== undefined && peopleNotFollowed?.length > 0 && <div className="sidebar-explore-container">
        <ul>
          {peopleNotFollowed?.length !== undefined && peopleNotFollowed.map(el=>{
            return(
              <li key={el?.username} className="sidebar-explore-list-item">
                <div>
                <img src={el?.profilePicture} alt="avatar" className="avatar avatar-size-xs" />
                <p className="sidebar-explore-list-item-label" onClick={()=>navigateToProfileHandler(el)}>{el.username}</p>   
                </div>
                <button
                className="btn btn-secondary-outline sidebar-explore-list-item-btn"
                onClick={()=>followUnfollowHandlerFunc(el)}
              >
                {isFollowed() ? 'Following' : 'Follow'}
              </button></li>
            )
          })}
        </ul>
      </div>}
    </aside>
  );
};
