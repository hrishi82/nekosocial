import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./newpostmodal.css";
import { useSelector, useDispatch } from "react-redux";
import {
  newPost,
  editPost,
  toggleCommentInputModal,
} from "../../../store/postSlice";
import { setFormData, resetFormData } from "../../../store/utilitiesSlice";


export const NewPostModal = () => {
  const { token } = useSelector((store) => store.auth);
  const { posts, displayCommentInputModal } = useSelector(
    (store) => store.posts
  );
  const { formData } = useSelector((store) => store.utilities);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }

    if (formData?.content === "" && formData?.uploadedImage === "") {
      return;
    }

    let indexID = posts.findIndex((el) => el?._id === formData?._id);

    if (indexID !== -1) {
      dispatch(
        editPost({
          encodedToken: token,
          postData: formData,
          postId: formData._id,
        })
      );
      dispatch(resetFormData());
      dispatch(toggleCommentInputModal());
    } else {
      dispatch(
        newPost({
          encodedToken: token,
          postData: formData,
        })
      );
      dispatch(resetFormData());
      dispatch(toggleCommentInputModal());
    }
  };

  const handleFormData = (e) => {
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(file);
    dispatch(setFormData({ ...formData, uploadedImage: base64File }));
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
            <div className="modal-close-icon-container"  onClick={() => dispatch(toggleCommentInputModal())}>
              <i className="far fa-times-circle"></i>
            </div>
            <section className="card-body-container">
              <p className="card-topic-summary">
                <textarea
                  className="card-topic-summary-input"
                  placeholder="Text here..."
                  name="content"
                  value={formData?.content}
                  onChange={(e) => handleFormData(e)}
                />
              </p>
              {formData.uploadedImage ? (
                <div className="relative image-upload-container">
                  <img
                    src={formData.uploadedImage}
                    alt="uploadedImage"
                    className="img-responsive"
                  />
                  <i
                    onClick={() =>
                      dispatch(setFormData({ ...formData, uploadedImage: "" }))
                    }
                    className="far fa-times-circle"
                  ></i>
                </div>
              ) : null}
            </section>

            <section className="card-footer-container">
              <div className="footer-btn-wrapper modal-footer-wrapper">
                <div className="image-upload-button-container relative">
                  <i className="fa-regular fa-image"></i>
                  <input
                    id="image-file-upload"
                    className="image-file-upload-input-box"
                    accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                    type="file"
                    onChange={onFileChange}
                  />
                </div>
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
