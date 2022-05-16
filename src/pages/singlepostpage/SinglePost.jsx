import ReactTimeAgo from "react-time-ago";
import { useData } from "../../context/dataContext";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { postCommentToPostServiceHandler } from "../../services/services";
import {useState, useEffect} from "react"

export const SinglePost = ({ singlepostdata }) => {
  const { username, content, updatedAt, likes } = singlepostdata;
  const [commentData, setCommentData] = useState('')

  let formatedDate = new Date(updatedAt);

  const {token, user} = useAuth()
  const {state, dispatch} = useData()
  const navigate = useNavigate()

  let postUserData = state.allUsers.filter(el=> el.username === singlepostdata?.username)[0] 

  const postCommentHandlerFunc = async (e) =>{
    e.preventDefault()
    if(!token){
        navigate("/loginpage")
    }
    try{
        let postresp = await postCommentToPostServiceHandler({encodedToken: token, commentData: commentData, postId: singlepostdata._id})

        if(postresp.status === 200 || postresp.status === 201){

            const newPostsData = state.allPosts.map((el) => {
                if(el.username === singlepostdata.username){
                    return {...el, comments:postresp.data.comments}
                }else{
                    return el
                }
            })
            dispatch({ type: "SET_ALL_POSTS", payload:newPostsData})
            setCommentData('');
        }
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
                <div className="single-post-input-avtar-box">
                  <img
                    src={
                        postUserData?.profilePicture
                        ? postUserData.profilePicture
                        : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
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
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <div className="single-post-content-body-box">
              <p className="single-post-content-body-box-text">{content}</p>
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
              <i className="far fa-heart"></i>
              <i className="far fa-comment-alt"></i>
              <i className="fas fa-share-alt"></i>
              <i className="fas fa-bookmark bookmark-icon"></i>
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
