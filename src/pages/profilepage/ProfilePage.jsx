import { LeftAsideBar, RightAsideBar } from "../../components";
import "../main.css";
import {toggleCommentInputModal} from "../../store/postSlice"
import { useDispatch, useSelector } from "react-redux";
import {NewPostModal} from "../homepage/NewPostModal/NewPostModal"
import {Profile} from "./Profile"

export const ProfilePage = () => {

  const dispatch = useDispatch()
  const {displayCommentInputModal} = useSelector(store => store.posts)

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
        <Profile/>
        <RightAsideBar />
      </div>
    </>
  );
};
