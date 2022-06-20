import "../main.css";
import "./profile.css";
import { toggleCommentInputModal } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { NewPostModal } from "../homepage/NewPostModal/NewPostModal";
import { useParams, useNavigate } from "react-router-dom";
import { PostCard } from "../homepage/PostCard/PostCard";
import { EditProfileModal } from "./EditProfileModal";
import { useEffect, useState } from "react";
import {getUserDetails, getUserPosts} from "../../store/profileSlice"
import {getAllUsers} from "../../store/userSlice"
import {followUser, unfollowUser} from "../../store/userSlice"

export const Profile = () => {
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const { username } = useParams();

  const dispatch = useDispatch();
  const { posts, displayCommentInputModal } = useSelector(
    (store) => store.posts
  );

  const { users } = useSelector((store) => store.users);
  const { user, token } = useSelector((store) => store.auth);
  const { currUserDetails, userPosts } = useSelector((store) => store.profile);

  const currentUserDetails = users?.find((user) => user.username === username);

  const isFollowed = () => currentUserDetails?.followers.some((el) => el.username === user.username);

  useEffect(()=>{
    dispatch(getUserDetails(username))
    dispatch(getUserPosts(username))
    dispatch(getAllUsers())
}, [username, dispatch, user])

  const followUnfollowHandlerFunc = () =>{
    if(isFollowed()){
        dispatch(unfollowUser({ followUserId: currentUserDetails._id, token: token, dispatch }))
    }else{
        dispatch(followUser({ followUserId: currentUserDetails._id, token: token, dispatch }))

    }
  }

  return (
    <>
      <NewPostModal />
      <div
        onClick={() => dispatch(toggleCommentInputModal())}
        className={`comment-input-master-wrapper ${
          displayCommentInputModal ? "viewModal" : null
        }`}
      ></div>

      <EditProfileModal
        displayEditModal={displayEditModal}
        setDisplayEditModal={setDisplayEditModal}
      />

      <div className="profile-main-container">
        <section className="profile-header-container">
          <div className="profilepicture-wrapper">
            <img
              src={
                currentUserDetails?.profilePicture
                  ? currentUserDetails?.profilePicture
                  : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
              }
              className="avatar avatar-size-lg"
              alt="avatar"
            />
          </div>
          <div className="profile-name-username-container">
            <h3 className="profile-name">
              {currentUserDetails.firstName + " " + currentUserDetails.lastName}
            </h3>
            <h3 className="profile-username">@{currentUserDetails.username}</h3>
          </div>

          <div className="profile-action-btn-wrapper">
            {username === user.username && (
              <button
                className="btn btn-secondary-outline profile-action-btn"
                onClick={() => setDisplayEditModal(true)}
              >
                Edit Profile
              </button>
            )}
            {username !== user.username && (
              <button
                className={`btn ${isFollowed() ? "btn-secondary-outline" : "btn-primary-outline"} profile-action-btn`}
                onClick={followUnfollowHandlerFunc}
              >
                {isFollowed() ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          <div className="profile-bio-wrapper">
            <p className="profile-bio">
            {currentUserDetails.bio}
            </p>
          </div>

          <a
            className="link-no-decor profile-url-link"
            href={currentUserDetails.link}
            target="_blank"
            rel="noreferrer"
          >
            {currentUserDetails.link}
          </a>

          <section className="profile-statistics-container">
            <div className="profile-stat-wrapper">
              <h4 className="profile-stat-number">{currentUserDetails.following.length}</h4>
              <h4 className="profile-stat-name">Following</h4>
            </div>
            <div className="profile-stat-wrapper">
              <h4 className="profile-stat-number">{userPosts.length}</h4>
              <h4 className="profile-stat-name">Posts</h4>
            </div>
            <div className="profile-stat-wrapper">
              <h4 className="profile-stat-number">{currentUserDetails.followers.length}</h4>
              <h4 className="profile-stat-name">Followers</h4>
            </div>
          </section>
        </section>
        <section className="profile-posts-container">
          <h3 className="profile-posts-title text-left">
            Posts: {userPosts.length}
          </h3>
          <div className="profile-posts-wrapper">
            {userPosts?.map((el) => (
              <PostCard key={el._id} data={el} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
