import "./postcard.css"
import { useData } from "../../../context/dataContext";
import ReactTimeAgo from 'react-time-ago'


export const PostCard = ({data}) => {

  const {state, dispatch, TimeAgo} = useData()
  const {username, content, updatedAt, likes, _id} = data

  const timeAgo = new TimeAgo('en-US')
  let formatedDate = new Date(updatedAt);

  let userData = state.allUsers.filter(el => el.username === username)[0]

  
  return (
    <div className="post-card-container">
      <div className="post-input-avtar-box">
        <img
          src={userData.profilePicture ? userData.profilePicture : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"}
          className="avatar avatar-size-sm"
          alt="avatar"
        />
      </div>
      <div className="post-content-box">
        <div className="post-content-header-box">
          <div className="post-content-header-box-left">
            <p className="post-content-header-item post-content-author">{userData.firstName + " " + userData.lastName}</p>
            <p className="post-content-header-item post-content-author-username">@{username}</p>
            <i className="fa-solid fa-circle post-content-header-item period-seperator"></i>
            <p className="post-content-header-item post-content-timePosted">{<ReactTimeAgo date={formatedDate.getTime()} locale="en-US"/>}</p>
          </div>
          <div className="post-content-header-box-left">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div className="post-content-body-box">
          <p className="post-content-body-box-text">
            {content}
          </p>
        </div>
        <div className="post-content-buttons-box">
          <i className="fa-solid fa-heart"></i>
          <i className="fa-solid fa-message"></i>
          <i className="fa-solid fa-share-from-square"></i>
          <i className="fa-solid fa-bookmark"></i>
        </div>
      </div>
    </div>
  );
};

