import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./newpostmodal.css";
import { useSelector,useDispatch } from "react-redux";
import { newPost, editPost, editCommentInPost, toggleCommentInputModal } from "../../../store/postSlice";
import {setFormData, resetFormData} from "../../../store/utilitiesSlice"



export const NewPostModal = () => {

  const  {token}  = useSelector(store=>store.auth);
  const  {posts, displayCommentInputModal}  = useSelector(store=>store.posts);
  const  {formData, singlePostPageComment, postInformation}  = useSelector(store=>store.utilities);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }

    let indexID = posts.findIndex((el) => el?._id === formData?._id);

    if (!singlePostPageComment) {

      if (indexID !== -1) {
        dispatch(editPost({
          encodedToken: token,
          postData: formData,
          postId: formData._id,
        }));
        dispatch(resetFormData())
        dispatch(toggleCommentInputModal())
        console.log("inEdit")
      } else {
        dispatch(newPost({
          encodedToken: token,
          postData: formData,
        }));
        dispatch(resetFormData())
        dispatch(toggleCommentInputModal())
        console.log("newpost")
      }

    } else {
      dispatch(editCommentInPost({
        encodedToken: token,
        commentData: formData.commentData,
        postId: postInformation._id,
        commentId: formData._id,
      }));
      dispatch(resetFormData())
      dispatch(toggleCommentInputModal())
      console.log("commentinpost")
    }
  };

  const handleFormData = (e) => {
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
  };



  return (
    <>
      <div
        className={`comment-input-modal-container ${
          displayCommentInputModal ? "viewModal" : null
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
                      ? formData?.commentData
                      : formData?.content
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
    </>
  );
};
