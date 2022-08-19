import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../homepage/NewPostModal/newpostmodal.css";
import { useSelector,useDispatch } from "react-redux";
import { editCommentInPost, toggleCommentInputModal } from "../../store/postSlice";
import {setFormData, resetFormData} from "../../store/utilitiesSlice"



export const EditCommentModal = () => {

  const  {token}  = useSelector(store=>store.auth);
  const  { displayCommentInputModal}  = useSelector(store=>store.posts);
  const  {formData, postInformation}  = useSelector(store=>store.utilities);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }
      dispatch(editCommentInPost({
        encodedToken: token,
        commentData: formData.text,
        postId: postInformation._id,
        commentId: formData._id,
      }));
      dispatch(resetFormData())
      dispatch(toggleCommentInputModal())
    
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
        <div className="modal-close-icon-container"  onClick={() => dispatch(toggleCommentInputModal())}>
              <i className="far fa-times-circle"></i>
            </div>
        <form onSubmit={(e) => formSubmitHandler(e)}>
          <div className="card">
            <section className="card-body-container">
              <p className="card-topic-summary">
                <textarea
                  className="card-topic-summary-input"
                  placeholder="Text here..."
                  name="text"
                  value={formData?.text}
                  onChange={(e) => handleFormData(e)}
                />
              </p>
            </section>

            <section className="card-footer-container">
              <div className="footer-btn-wrapper">
                {/* <i className="fa-regular fa-image"></i>
                <i className="fa-regular fa-face-smile-beam"></i> */}
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
