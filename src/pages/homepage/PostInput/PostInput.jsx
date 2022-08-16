import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./postinput.css";
import "react-toastify/dist/ReactToastify.css";
import { newPost } from "../../../store/postSlice";
import { useSelector, useDispatch } from "react-redux";

export const PostInput = () => {
  let initialData = { content: "", comments: [], uploadedImage: "" };
  const [contentData, setContentData] = useState(initialData);
  const [userData, setUserData] = useState(null);

  // const [imageFileValue, setImageFileValue] = useState(null);


  const { token, user } = useSelector((store) => store.auth);
  const { users } = useSelector((store) => store.users || {});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/loginpage");
    }

    try {
      if (contentData.content !== "" || contentData.uploadedImage !== "") {
        dispatch(
          newPost({
            encodedToken: token,
            postData: contentData,
          })
        );
        setContentData(initialData);
      }
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    setUserData(
      users.filter((eachuser) => eachuser.username === user.username)[0]
    );
  }, [users, user]);
  

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
    setContentData({ ...contentData, uploadedImage: base64File });
  };

  return (
    <>
      <form onSubmit={(e) => formSubmitHandler(e)}>
        <div className="post-input-container">
          <div className="post-input-avtar-box">
            <img
          src={
            userData?.profilePicture
              ? userData?.profilePicture
              : "https://res.cloudinary.com/dac2rwutk/image/upload/v1660390827/user_xotqed.png"
          }              className="avatar avatar-size-sm"
              alt="avatar"
            />
          </div>
          <div className="post-input-content-box">
            <div className="post-input-textbox-container">
              <textarea
                className="post-input-summary-input"
                placeholder="Text here..."
                name="content"
                onChange={(e) =>
                  setContentData({ ...contentData, content: e.target.value })
                }
                value={contentData.content}
              />
              {contentData.uploadedImage ? (
                <div className="relative image-upload-container">
                  <img
                    src={contentData.uploadedImage}
                    alt="uploadedImage"
                    className="img-responsive"
                  />
                  <i
                    onClick={() => {
                      setContentData({ ...contentData, uploadedImage: "" });
                    }}
                    className="fas fa-times-circle"
                  ></i>
                </div>
              ) : null}
            </div>
            <div className="post-input-button-container">
              <div className="post-input-button-left">

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
