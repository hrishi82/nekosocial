import { useState, useEffect } from "react";
import { useData } from "../../../context/dataContext";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./newpostmodal.css";
import {
  postPostServiceHandler,
  editPostServiceHandler,
  editCommentToPostServiceHandler,
} from "../../../services/services";

export const NewPostModal = () => {
  const {
    state,
    dispatch,
    formData,
    setFormData,
    initialFormData,
    singlePostPageComment,
    setSinglePostPageComment,
    postInformation,
    setPostInformation,
  } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();


 

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }

    let indexID = state.allPosts.findIndex((el) => el?._id === formData?._id);

    if (!singlePostPageComment) {
      let postResponse;

      if (indexID !== -1) {
        postResponse = await editPostServiceHandler({
          encodedToken: token,
          postData: formData,
          postId: formData._id,
        });
      } else {
        postResponse = await postPostServiceHandler({
          encodedToken: token,
          postData: formData,
        });
      }

      try {
        if (postResponse.status === 200 || postResponse.status === 201) {
          dispatch({ type: "SET_ALL_POSTS", payload: postResponse.data.posts });
          setFormData(initialFormData);
          dispatch({ type: "TOGGLE_COMMENT_INPUT_MODAL" });

          toast.success("Post Posted!", {
            position: "bottom-right",
            autoClose: 1500,
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      let postResponse;
      postResponse = await editCommentToPostServiceHandler({
        encodedToken: token,
        commentData: formData.commentData,
        postId: postInformation._id,
        commentId: formData._id,
      });

      try {
        if (postResponse.status === 200 || postResponse.status === 201) {
          const newPostsData = state.allPosts.map((el) => {
            if (el.username === postInformation.username) {
              return { ...el, comments: postResponse.data.comments };
            } else {
              return el;
            }
          });
            dispatch({ type: "SET_ALL_POSTS", payload: newPostsData });
            setFormData(initialFormData);
            dispatch({ type: "TOGGLE_COMMENT_INPUT_MODAL" });

            toast.success("Post Posted!", {
              position: "bottom-right",
              autoClose: 1500,
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className={`comment-input-modal-container ${
          state.displayCommentInputModal ? "viewModal" : null
        }`}
      >
        <form onSubmit={(e) => formSubmitHandler(e)}>
          <div className="card">
            <section className="card-body-container">
              <p className="card-topic-summary">
                <textarea
                  className="card-topic-summary-input"
                  placeholder="Text here..."
                  name={singlePostPageComment ? `commentData` : `content`}
                  value={
                    singlePostPageComment
                      ? formData.commentData
                      : formData.content
                  }
                  onChange={(e) => handleFormData(e)}
                />
              </p>
            </section>

            <section className="card-footer-container">
              <div className="footer-btn-wrapper">
                <i className="fa-regular fa-image"></i>
                <i className="fa-regular fa-face-smile-beam"></i>
              </div>

              <div className="footer-icon-btn-wrapper">
                <button className="btn btn-primary" type="submit">
                  Add
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
