import { LeftAsideBar, RightAsideBar } from "../../components";
import "../main.css";
import { useData } from "../../context/dataContext";
import { Mainfeed } from "./Mainfeed/Mainfeed";
import {NewPostModal} from "./NewPostModal/NewPostModal"
export const HomePage = () => {

  const {state, dispatch} = useData()

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
        <Mainfeed />
        <RightAsideBar />
      </div>
    </>
  );
};
