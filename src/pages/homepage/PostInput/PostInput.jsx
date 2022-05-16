import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import { useData } from "../../../context/dataContext";
import { useNavigate } from "react-router-dom";
import "./postinput.css";
import { postPostServiceHandler } from "../../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PostInput = () => {
  const { state, dispatch, formData, setFormData, initialFormData } = useData();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }

    let postResponse = await postPostServiceHandler({
      encodedToken: token,
      postData: formData
    });

    try {
      if (postResponse.status === 200 || postResponse.status === 201) {
        dispatch({ type: "SET_ALL_POSTS", payload: postResponse.data.posts });
        setFormData(initialFormData);

        toast.success("Post Posted!", {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
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
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                value={formData.content}
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
      <ToastContainer />
    </>
  );
};
