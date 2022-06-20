import "../homepage/PostCard/postcard.css";
import ReactTimeAgo from "react-time-ago";
import { useNavigate, useParams, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {setFormData, setPostInformation} from "../../store/utilitiesSlice"
import {toggleCommentInputModal, deleteCommentFromPost} from "../../store/postSlice"


export const CommentCard = ({ data, postInfo }) => {

  const [viewCardOptionModal, setViewCardOptionModal] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector(store => store.auth || {})

  const {users} = useSelector(store => store.users || {})

  const {posts } = useSelector(store => store.posts || {})

  const {
    username,
    updatedAt,
    _id,
    text,
    commentData
  } = data;

  useEffect(()=>{
    setUserData(users.filter((eachuser) => eachuser.username === data.username)[0])
  }, [data, users, user, userData, posts])

  let formatedDate = new Date(updatedAt);

  const postOptionsHandler = () => {
    setViewCardOptionModal(!viewCardOptionModal)
  };

  const editCommentHandler = () => {
      dispatch(setPostInformation(postInfo))
      dispatch(setFormData(data))
      dispatch(toggleCommentInputModal())
      setViewCardOptionModal(!viewCardOptionModal)
  };

  const deleteCommentHandler = async () => {
      try {
        dispatch(deleteCommentFromPost({encodedToken:token, postId:postInfo._id, commentId:data._id}))
      } catch (err) {
        console.log(err);
      }
    setViewCardOptionModal(!viewCardOptionModal)
  };


  return (
    <div className="post-card-container">
      <div className="post-input-avtar-box" onClick={()=>navigate(`/profilepage/${username}`)}>
        <img
          src={
            userData?.profilePicture
              ? userData?.profilePicture
              : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
          }
          className="avatar avatar-size-sm"
          alt="avatar"
        />
      </div>
      <div className="post-content-box">
        <div className="post-content-header-box">
          <div className="post-content-header-box-left">
            <p className="post-content-header-item post-content-author">
              {userData?.firstName + " " + userData?.lastName}
            </p>
            <p className="post-content-header-item post-content-author-username">
              @{username}
            </p>
            <i className="fa-solid fa-circle post-content-header-item period-seperator"></i>
            <p className="post-content-header-item post-content-timePosted">
              {<ReactTimeAgo date={formatedDate.getTime()} locale="en-US" />}
            </p>
          </div>
          {user?.username === data?.username && (
            <div className="post-content-header-box-right relative" onClick={postOptionsHandler}>
              <i className="fa-solid fa-ellipsis"></i>
              {viewCardOptionModal && (
                <div className="post-options-modal-container">
                  <p className="post-options-modal-options" onClick={editCommentHandler}>Edit Comment</p>
                  <p className="post-options-modal-options" onClick={deleteCommentHandler}>Delete Comment</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="post-content-body-box">
          <p
            className="post-content-body-box-text"
          >
            {text} 
          </p>
        </div>
        <div
          className={"post-content-buttons-box post-content-buttons-right"}
        >
            <>
              <i className="fas fa-arrow-up"></i>
              <i className="fas fa-arrow-down" onClick={()=>console.log(data)}></i>
            </>
        </div>
      </div>
    </div>
  );
};
