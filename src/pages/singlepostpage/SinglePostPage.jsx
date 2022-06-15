import "./singlepostpage.css";
import "../main.css";
import { LeftAsideBar, RightAsideBar } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { SinglePost } from "./SinglePost";
import { PostCard } from "../homepage/PostCard/PostCard";
import { useState, useEffect } from "react";
import { getAllCommentsOfPostServiceHandler } from "../../services/services";
import {NewPostModal} from "../homepage/NewPostModal/NewPostModal"
import {toggleCommentInputModal} from "../../store/postSlice"
import { useDispatch, useSelector } from "react-redux";


export const SinglePostPage = () => {
  const { username, postID } = useParams();

  const dispatch = useDispatch()
  const {posts, displayCommentInputModal} = useSelector(store => store.posts)

  const postInfo = posts?.find((el) => el._id === postID);

  // console.log(postInfo)
  
  const [commentsOfPost, setCommentsOfPost] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let resp = await getAllCommentsOfPostServiceHandler(postID);
        if (resp.status === 200 || resp.status === 201) {
          setCommentsOfPost(resp.data.comments);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [postID, posts]);

  return (
    <>
    <NewPostModal/>
    <div
    onClick={() => dispatch(toggleCommentInputModal())}
    className={`comment-input-master-wrapper ${
      displayCommentInputModal ? "viewModal" : null
    }`}
  ></div>
      <div className="home-page-container relative">
        <LeftAsideBar />
        <div className="mainfeed-container">
          <SinglePost singlepostdata={postInfo} />
          {commentsOfPost?.map((el) => (
            <PostCard key={el._id} data={el} fromSinglePostPg={true} postInfo={postInfo}/>
          ))}
        </div>
        <RightAsideBar />
      </div>
    </>
  );
};
