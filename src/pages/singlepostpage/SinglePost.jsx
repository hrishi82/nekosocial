import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import {postCommentToPost, postLikeToPost, postDislikeToPost} from "../../store/postSlice"
import {useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import {postBookmarkPost, postRemoveBookmarkPost} from "../../store/authenticationSlice"
import "../main.css"
import { ToastHandler } from "../../utils/toastutils";
import { ToastContainer } from "react-toastify";

export const SinglePost = ({ singlepostdata }) => {

  const { username, content, updatedAt, likes, uploadedImage } = singlepostdata;
  const [commentData, setCommentData] = useState("")

  let formatedDate = new Date(updatedAt);

  const {token, user} = useSelector(store => store.auth)
  const {users} = useSelector(store => store.users)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let postUserData = users.filter(el=> el.username === singlepostdata?.username)[0] 

  const findIfLiked = () => singlepostdata?.likes?.likedBy.filter(el=>el?.username === user?.username).length!==0
  const findIfBookmarked = () => user?.bookmarks.filter(postID=> postID=== singlepostdata._id).length!==0

  const likeHandler = async () =>{

    if (findIfLiked()){
      dispatch(postDislikeToPost({encodedToken:token, postId:singlepostdata._id}))
    }else{
      dispatch(postLikeToPost({encodedToken:token, postId:singlepostdata._id}))
    }
  }
  const bookmarkHandler = async () =>{

    if (findIfBookmarked()){
      dispatch(postRemoveBookmarkPost({encodedToken:token, postId:singlepostdata._id}))
    }else{
      dispatch(postBookmarkPost({encodedToken:token, postId:singlepostdata._id}))
    }
  }

  const postCommentHandlerFunc = async (e) =>{
    e.preventDefault()
    if(!token){
        navigate("/loginpage")
    }
    try{
        dispatch(postCommentToPost({encodedToken: token, commentData: commentData, postId: singlepostdata._id}))
        setCommentData('');
    }catch(err){
        console.log(err)
    }
  }

  return (
    <>
      <div className="single-post-card-container">
        <div className="single-post-card-container-top">
          <div className="single-post-content-box">
            <div className="single-post-info-nav-box">
              <i className="fa-solid fa-arrow-left" onClick={()=>navigate("/homepage")}></i>
              <p>Post</p>
            </div>
            <div className="single-post-content-header-box">
              <div className="single-post-content-header-box-left">
                <div className="single-post-input-avtar-box" onClick={()=>navigate(`/profilepage/${username}`)}>
                  <img
                    src={
                        postUserData?.profilePicture
                        ? postUserData.profilePicture
                        : "https://res.cloudinary.com/dac2rwutk/image/upload/v1660390827/user_xotqed.png"
                    }
                    className="avatar avatar-size-sm"
                    alt="avatar"
                  />
                </div>
                <div className="single-post-content-name-username-box">
                  <p className="single-post-content-author">{postUserData?.firstName + " " + postUserData?.lastName}</p>
                  <p className="single-post-content-author-username">
                    @{username}
                  </p>
                </div>
              </div>

              <div className="single-post-content-header-box-right">
                {/* <i className="fa-solid fa-ellipsis"></i> */}
              </div>
            </div>
            <div className="single-post-content-body-box">
              <p className="single-post-content-body-box-text">{content}</p>
              {singlepostdata?.uploadedImage !== "" && (
            <img
              src={singlepostdata?.uploadedImage}
              alt="postIMG"
              className="img-responsive"
            />
          )}
              <p className="single-post-content-timePosted">
                {<ReactTimeAgo date={formatedDate.getTime()} locale="en-US" />}
              </p>
            </div>
            <div className="single-post-content-like-box">
              <span className="single-post-content-like">
                {likes?.likeCount}
              </span>
              <span>Likes</span>
            </div>

            <div className="single-post-content-buttons-box">
              <i className={findIfLiked()  ? "fas fa-heart liked": "far fa-heart"} onClick= {likeHandler}></i>
              <i className="far fa-comment-alt"></i>
              {/* <i className="fas fa-share-alt" onClick={()=>{
                navigator.clipboard.writeText(
                  `https://nekosocial.vercel.app/singlepostpage/${username}/${singlepostdata._id}`
                );
              }}></i> */}
              <i className={findIfBookmarked() ? "fas fa-bookmark bookmark-icon": "far fa-bookmark"}
                onClick={bookmarkHandler}></i>
            </div>
          </div>
        </div>
        <div className="single-post-card-container-middle">
          <div className="single-post-card-add-comment-container">
            <div className="single-post-input-avtar-box">
              <img
                src={
                    user?.profilePicture
                    ? user?.profilePicture
                    : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
                }
                className="avatar avatar-size-sm"
                alt="avatar"
              />
            </div>
            <div className="single-post-add-comment-wrapper">
            <textarea
                className="single-post-comment-input"
                placeholder="Text here..."
                name="content"
                value={commentData}
                onChange={(e)=>setCommentData(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={(e)=>postCommentHandlerFunc(e)}>Post</button>
          </div>
        </div>

      </div>
    </>
  );
};
