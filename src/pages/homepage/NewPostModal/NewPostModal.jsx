import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./newpostmodal.css";
import { useSelector,useDispatch } from "react-redux";
import { newPost, editPost, toggleCommentInputModal } from "../../../store/postSlice";
import {setFormData, resetFormData} from "../../../store/utilitiesSlice"


export const NewPostModal = () => {

  const  {token}  = useSelector(store=>store.auth);
  const  {posts, displayCommentInputModal}  = useSelector(store=>store.posts);
  const  {formData}  = useSelector(store=>store.utilities);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }

    let indexID = posts.findIndex((el) => el?._id === formData?._id);

    if (indexID !== -1) {
      dispatch(editPost({
        encodedToken: token,
        postData: formData,
        postId: formData._id,
      }));
      dispatch(resetFormData())
      dispatch(toggleCommentInputModal())
    } else {
      dispatch(newPost({
        encodedToken: token,
        postData: formData,
      }));
      dispatch(resetFormData())
      dispatch(toggleCommentInputModal())
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
                  name="content"
                  value= {formData?.content}
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
