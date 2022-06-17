import "../main.css";
import "./profile.css";
import { toggleCommentInputModal } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { NewPostModal } from "../homepage/NewPostModal/NewPostModal";
import { useParams, useNavigate } from "react-router-dom";
import {PostCard} from "../homepage/PostCard/PostCard"

export const Profile = () => {
  const { username } = useParams();

  const dispatch = useDispatch();
  const { posts, displayCommentInputModal } = useSelector((store) => store.posts);

  const { users } = useSelector((store) => store.users);

  const userData = users.filter((el) => el.username === username)[0];

  const userPosts = posts?.filter(el=>el?.username === username)

  console.log(userData);

  return (
    <>
      <NewPostModal />
      <div
        onClick={() => dispatch(toggleCommentInputModal())}
        className={`comment-input-master-wrapper ${
          displayCommentInputModal ? "viewModal" : null
        }`}
      ></div>
      <div className="profile-main-container">
        <section className="profile-header-container">
          <div className="profilepicture-wrapper">
            <img
              src={
                userData?.profilePicture
                  ? userData?.profilePicture
                  : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
              }
              className="avatar avatar-size-lg"
              alt="avatar"
            />
          </div>
          <div className="profile-name-username-container">
            <h3 className="profile-name">
              {userData.firstName + " " + userData.lastName}
            </h3>
            <h3 className="profile-username">@{userData.username}</h3>
          </div>
          <div className="profile-action-btn-wrapper">
            <button className="btn btn-secondary-outline profile-action-btn">
              Edit Profile
            </button>
          </div>
          <div className="profile-bio-wrapper">
            <p className="profile-bio">
              Lorem, ipsum dolor sit amet consectetur adipisicing eipsa, dolore
              placeat fuga obcaecatillitia, earum nror. A, magni libero.
            </p>
          </div>

          <a
            className="link-no-decor profile-url-link"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
          >
            youtube link
          </a>

          <section className="profile-statistics-container">
            <div className="profile-stat-wrapper">
              <h4 className="profile-stat-number">0</h4>
              <h4 className="profile-stat-name">Following</h4>
            </div>
            <div className="profile-stat-wrapper">
              <h4 className="profile-stat-number">2k</h4>
              <h4 className="profile-stat-name">Posts</h4>
            </div>
            <div className="profile-stat-wrapper">
              <h4 className="profile-stat-number">37.3k</h4>
              <h4 className="profile-stat-name">Followers</h4>
            </div>
          </section>
        </section>
        <section className="profile-posts-container">
            <h3 className="profile-posts-title text-left">Your Posts: {userPosts.length}</h3>
            <div className="profile-posts-wrapper">
            {userPosts?.map(el=><PostCard key={el._id} data={el} />)}
            </div>
        </section>
      </div>
    </>
  );
};
