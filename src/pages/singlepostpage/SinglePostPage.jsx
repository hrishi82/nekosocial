import "./singlepostpage.css";
import "../main.css";
import { LeftAsideBar, RightAsideBar } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { SinglePost } from "./SinglePost";
import { useData } from "../../context/dataContext";
import { PostCard } from "../homepage/PostCard/PostCard";
import { useState, useEffect } from "react";
import { getAllCommentsOfPostServiceHandler } from "../../services/services";
import {NewPostModal} from "../homepage/NewPostModal/NewPostModal"


export const SinglePostPage = () => {
  const { username, postID } = useParams();
  const { state, dispatch } = useData();
  const postInfo = state.allPosts?.find((el) => el.username === username);
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
  }, [postID, state]);

  return (
    <>
    <NewPostModal/>
    <div
    onClick={() => dispatch({ type: "TOGGLE_COMMENT_INPUT_MODAL" })}
    className={`comment-input-master-wrapper ${
      state.displayCommentInputModal ? "viewModal" : null
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
