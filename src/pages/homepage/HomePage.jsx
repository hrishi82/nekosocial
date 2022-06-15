import { LeftAsideBar, RightAsideBar } from "../../components";
import "../main.css";
import {toggleCommentInputModal} from "../../store/postSlice"
import { useDispatch, useSelector } from "react-redux";
import { Mainfeed } from "./Mainfeed/Mainfeed";
import {NewPostModal} from "./NewPostModal/NewPostModal"


export const HomePage = () => {

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
        <Mainfeed />
        <RightAsideBar />
      </div>
    </>
  );
};
