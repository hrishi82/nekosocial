import { LeftAsideBar, RightAsideBar } from "../../components";
import "../main.css";
import {toggleCommentInputModal} from "../../store/postSlice"
import { useDispatch, useSelector } from "react-redux";
import { Mainfeed } from "./Mainfeed/Mainfeed";
import {NewPostModal} from "./NewPostModal/NewPostModal"
import { useState, useEffect } from "react";
import { getAllPosts } from "../../store/postSlice";


import {Oval} from "react-loader-spinner";


export const HomePage = () => {

  const dispatch = useDispatch()
  const {displayCommentInputModal} = useSelector(store => store.posts)

  const [fetchPostLoader, setFetchPostLoader] = useState(false)

  useEffect(() => {
    setFetchPostLoader(true);
    dispatch(getAllPosts());
    const id = setTimeout(() => {
      setFetchPostLoader(false);
    }, 500);
    return () => clearTimeout(id);
  }, [dispatch]);

  return (
    <>
    <NewPostModal/>
      <div
        onClick={() => dispatch(toggleCommentInputModal())}
        className={`comment-input-master-wrapper ${
          displayCommentInputModal ? "viewModal" : null
        }`}
      ></div>
      <div className="home-page-container relative">
        <LeftAsideBar />

        {fetchPostLoader ?  
          <div className="mainfeed-container all-post-loader-container">
            <Oval
            height={80}
            width={80}
            color="#000"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#9a9a9a"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          </div>
         : <Mainfeed />}

        
        <RightAsideBar />
      </div>
    </>
  );
};
