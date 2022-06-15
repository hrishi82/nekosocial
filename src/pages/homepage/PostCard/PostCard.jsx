import "./postcard.css";
import ReactTimeAgo from "react-time-ago";
import { useNavigate, useParams, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {setFormData, setSingePageComment, setPostInformation} from "../../../store/utilitiesSlice"
import {toggleCommentInputModal, deletePost, deleteCommentFromPost, postLikeToPost, postDislikeToPost} from "../../../store/postSlice"
import { postBookmarkPost, postRemoveBookmarkPost } from '../../../store/authenticationSlice';




export const PostCard = ({ data, fromSinglePostPg, postInfo }) => {

  const [viewCardOptionModal, setViewCardOptionModal] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector(store => store.auth || {})

  const {users} = useSelector(store => store.users || {})

  const {posts } = useSelector(store => store.posts || {})

  const {
    username,
    content,
    updatedAt,
    createdAt,
    likes,
    _id,
    comments,
    commentData
  } = data;

  useEffect(()=>{
    setUserData(users.filter((eachuser) => eachuser.username === data.username)[0])
  }, [data, users, user, userData, posts])
  

  const findIfLiked = () => data?.likes?.likedBy.filter(el=>el?.username === user?.username).length!==0
  const findIfBookmarked = () => user?.bookmarks.filter(postID=> postID._id=== _id).length!==0

  let formatedDate = new Date(updatedAt);

  const navigateToPostFunc = () => {
    navigate(`/singlepostpage/${username}/${_id}`);
  };

  const postOptionsHandler = () => {
    setViewCardOptionModal(!viewCardOptionModal)
  };

  const editPostHandler = () => {
    if(!fromSinglePostPg){
      dispatch(setFormData(data))
      dispatch(toggleCommentInputModal())
      
    }else{
      setSingePageComment(true)
      setPostInformation(postInfo)
      dispatch(setFormData(data))
      dispatch(toggleCommentInputModal())
    }
    setViewCardOptionModal(!viewCardOptionModal)
  };

  const deletePostHandler = async () => {

    if(!fromSinglePostPg){
      try {
        dispatch(deletePost({encodedToken:token, postId:data._id}))
      } catch (err) {
        console.log(err);
      }
    }else{
      try {
        dispatch(deleteCommentFromPost({encodedToken:token, postId:postInfo._id, commentId:data._id}))
      } catch (err) {
        console.log(err);
      }
    }
    setViewCardOptionModal(!viewCardOptionModal)
  };

  const likeHandler = async () =>{

    if (findIfLiked()){
      dispatch(postDislikeToPost({encodedToken:token, postId:data._id}))
    }else{
      dispatch(postLikeToPost({encodedToken:token, postId:data._id}))
    }
  }
  const bookmarkHandler = async () =>{

    if (findIfBookmarked()){
      dispatch(postRemoveBookmarkPost({encodedToken:token, postId:data._id}))
    }else{
      dispatch(postBookmarkPost({encodedToken:token, postId:data._id}))
    }
  }

  return (
    <div className="post-card-container">
      <div className="post-input-avtar-box">
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
                  <p className="post-options-modal-options" onClick={editPostHandler}>Edit Comment</p>
                  <p className="post-options-modal-options" onClick={deletePostHandler}>Delete Comment</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="post-content-body-box">
          <p
            className="post-content-body-box-text"
            onClick={fromSinglePostPg ? null : navigateToPostFunc}
          >
            {fromSinglePostPg ? commentData : content} 
          </p>
        </div>
        <div
          className={`post-content-buttons-box ${
            fromSinglePostPg && "post-content-buttons-right"
          }`}
        >
          {fromSinglePostPg ? (
            <>
              <i className="fas fa-arrow-up"></i>
              <i className="fas fa-arrow-down" onClick={likeHandler}></i>
            </>
          ) : (
            <>
              <i className={findIfLiked()  ? "fas fa-heart liked": "far fa-heart"} onClick= {likeHandler}>
                <span className="post-card-icon-data">{likes?.likeCount}</span>
              </i>
              <i className="far fa-comment-alt">
                <span className="post-card-icon-data">{comments?.length}</span>
              </i>
              <i className="fas fa-share-alt" onClick={()=>console.log(findIfBookmarked())}></i>
              <i
                className={findIfBookmarked() ? "fas fa-bookmark bookmark-icon": "far fa-bookmark"}
                onClick={bookmarkHandler}></i>

            </>
          )}
        </div>
      </div>
    </div>
  );
};
