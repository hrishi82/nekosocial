import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../homepage/NewPostModal/newpostmodal.css";
import "./editprofilemodal.css";
import { useSelector, useDispatch } from "react-redux";
import { editUserProfile } from "../../../src/store/authenticationSlice";

export const EditProfileModal = ({ displayEditModal, setDisplayEditModal }) => {
  const { token, user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.posts);
  const [profileFormData, setProfileFormData] = useState(user);
  const [isNewImage, setIsNewImage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (isNewImage) {
      setIsNewImage(false);
    }

    dispatch(
      editUserProfile({ userData: profileFormData, encodedToken: token })
    );
    setDisplayEditModal(!displayEditModal);
  };

  useEffect(() => {
    setProfileFormData(user);
  }, [user]);

  const handleFormData = (e) => {
    setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
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
    setProfileFormData({ ...profileFormData, profilePicture: base64File });
    setIsNewImage(true);
  };

  return (
    <>
      <div
        onClick={() => setDisplayEditModal(!displayEditModal)}
        className={`comment-input-master-wrapper ${
          displayEditModal ? "viewModal" : null
        }`}
      ></div>

      <div
        className={`comment-input-modal-container ${
          displayEditModal ? "viewModal" : null
        }`}
      >
        <form onSubmit={(e) => formSubmitHandler(e)}>
          <div className="card editProfile-card">
            <section className="editProfile-card-body-container">
              <div className="profilepicture-wrapper relative">
                {isNewImage ? (
                  <img
                    src={
                      profileFormData?.profilePicture
                        ? profileFormData?.profilePicture
                        : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
                    }
                    className="avatar avatar-size-lg"
                    alt="avatar"
                  />
                ) : (
                  <img
                    src={
                      user?.profilePicture
                        ? user?.profilePicture
                        : "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg"
                    }
                    className="avatar avatar-size-lg"
                    alt="avatar"
                  />
                )}
                <div className="upload-profile-image-icon-wrapper absolute">
                  <div className="image-upload-button-container relative">
                    <i className="fas fa-camera"></i>
                    <input
                      id="image-file-upload"
                      className="image-file-upload-input-box"
                      accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                      type="file"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
              </div>

              <div className="editProfile-input-fields-container">
                <div className="editProfile-data-wrapper">
                  <h4 className="edit-Profile-data-label">Name: </h4>
                  <input
                    className="edit-Profile-data-field"
                    value={user?.firstName + " " + user?.lastName}
                    disabled
                  />
                </div>

                <div className="editProfile-data-wrapper">
                  <h4 className="edit-Profile-data-label">Username: </h4>
                  <input
                    className="edit-Profile-data-field"
                    value={"@" + user?.username}
                    disabled
                  />
                </div>

                <div className="editProfile-data-wrapper">
                  <h4 className="edit-Profile-data-label">Bio: </h4>
                  <textarea
                    className="edit-Profile-data-field profile-bio-field"
                    value={profileFormData?.bio}
                    name="bio"
                    onChange={(e) => handleFormData(e)}
                  />
                </div>

                <div className="editProfile-data-wrapper">
                  <h4 className="edit-Profile-data-label">Link: </h4>
                  <input
                    className="edit-Profile-data-field"
                    value={profileFormData?.link}
                    name="link"
                    onChange={(e) => handleFormData(e)}
                  />
                </div>
              </div>
            </section>

            <section className="editProfile-card-footer-container">
              <div className="footer-icon-btn-wrapper">
                <button className="btn btn-primary" type="submit">
                  UPDATE
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </>
  );
};
