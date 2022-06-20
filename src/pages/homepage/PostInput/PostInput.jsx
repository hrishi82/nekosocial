import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./postinput.css";
import "react-toastify/dist/ReactToastify.css";
import {newPost} from "../../../store/postSlice"
import { useSelector, useDispatch } from "react-redux";

export const PostInput = () => {

  let initialData = {content:"", comments:[]}
  const [contentData, setContentData] = useState(initialData)

  const { token } = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }

    try {
      dispatch(newPost({
        encodedToken: token,
        postData: contentData
      }))
      setContentData(initialData)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={(e) => formSubmitHandler(e)}>
        <div className="post-input-container">
          <div className="post-input-avtar-box">
            <img
              src="https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
              className="avatar avatar-size-sm"
              alt="avatar"
            />
          </div>
          <div className="post-input-content-box">
            <div className="post-input-textbox-container">
              <textarea
                className="post-input-summary-input"
                placeholder="Text here..."
                name="content"
                onChange={(e) => setContentData({ ...contentData, content: e.target.value })}
                value={contentData.content}
              />
            </div>
            <div className="post-input-button-container">
              <div className="post-input-button-left">
                <i className="fa-regular fa-image"></i>
                <i className="fa-regular fa-face-smile-beam"></i>
              </div>
              <div className="post-input-button-right">
                <button
                  className="btn btn-primary post-input-post-comment-btn"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
