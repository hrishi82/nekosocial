import "./postcard.css";
import { useData } from "../../../context/dataContext";
import ReactTimeAgo from "react-time-ago";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import {deletePostServiceHandler, deleteCommentFromPostServiceHandler, postLikeToPostServiceHandler, postDislikeToPostServiceHandler} from "../../../services/services"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

export const PostCard = ({ data, fromSinglePostPg, postInfo }) => {
  const { state, dispatch, TimeAgo, formData, setFormData, setSinglePostPageComment, setPostInformation } = useData();
  
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



  const navigate = useNavigate();
  const { token, user } = useAuth();

  const findIfLiked = likes?.likedBy.some(el=>el?.username === user?.username)


  const [viewCardOptionModal, setViewCardOptionModal] = useState(false);

  const timeAgo = new TimeAgo("en-US");
  let formatedDate = new Date(updatedAt);

  let userData = state.allUsers.filter((el) => el.username === username)[0];

  const navigateToPostFunc = () => {
    navigate(`/singlepostpage/${username}/${_id}`);
  };

  const postOptionsHandler = () => {
    setViewCardOptionModal(!viewCardOptionModal)
  };

  const editPostHandler = () => {
    if(!fromSinglePostPg){
      setFormData(data)
      dispatch({ type: "TOGGLE_COMMENT_INPUT_MODAL" })
    }else{
      setSinglePostPageComment(true)
      setPostInformation(postInfo)
      setFormData(data)
      dispatch({ type: "TOGGLE_COMMENT_INPUT_MODAL" })
    }
    setViewCardOptionModal(!viewCardOptionModal)
  };

  const deletePostHandler = async () => {

    if(!fromSinglePostPg){
      let delresp = await deletePostServiceHandler({encodedToken:token, postId:data._id})
      try {
        if (delresp.status === 200 || delresp.status === 201) {
          dispatch({ type: "SET_ALL_POSTS", payload: delresp.data.posts });
  
          toast.error("Post Deleted!", {
            position: "bottom-right",
            autoClose: 1500,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      let delresp = await deleteCommentFromPostServiceHandler({encodedToken:token, postId:postInfo._id, commentId:data._id})
      try {
        if (delresp.status === 200 || delresp.status === 201) {

          const newPostsData = state.allPosts.map((el) => {
            if(el.username === postInfo.username){
                return {...el, comments:delresp.data.comments}
            }else{
                return el
            }
        })

          dispatch({ type: "SET_ALL_POSTS", payload: newPostsData });
  
          toast.error("Post Deleted!", {
            position: "bottom-right",
            autoClose: 1500,
          });
        }
      } catch (err) {
        console.log(err);
      }

    }

    setViewCardOptionModal(!viewCardOptionModal)
  };

  const likeHandler = async () =>{

    if (!findIfLiked){
      let likeresp = await postLikeToPostServiceHandler({encodedToken:token, postId:data._id})
      try {
        if (likeresp.status === 200 || likeresp.status === 201) {
          dispatch({ type: "SET_ALL_POSTS", payload: likeresp.data.posts });
  
          toast.success("Post Liked!", {
            position: "bottom-right",
            autoClose: 1500,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      let likeresp = await postDislikeToPostServiceHandler({encodedToken:token, postId:data._id})
      try {
        if (likeresp.status === 200 || likeresp.status === 201) {
          dispatch({ type: "SET_ALL_POSTS", payload: likeresp.data.posts });
  
          toast.warn("Post Disliked!", {
            position: "bottom-right",
            autoClose: 1500,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="post-card-container">
      <div className="post-input-avtar-box">
        <img
          src={
            userData.profilePicture
              ? userData.profilePicture
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
              <i className={findIfLiked  ? "fas fa-heart liked": "far fa-heart"} onClick= {likeHandler}>
                <span className="post-card-icon-data">{likes?.likeCount}</span>
              </i>
              <i className="far fa-comment-alt">
                <span className="post-card-icon-data">{comments?.length}</span>
              </i>
              <i className="fas fa-share-alt"></i>
              <i
                className="fas fa-bookmark bookmark-icon"
                onClick={()=>console.log(findIfLiked)}></i>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
