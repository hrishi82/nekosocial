import { PostInput } from "../PostInput/PostInput";
import { PostCard } from "../PostCard/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { postSortingHandler } from "../../../store/postSlice";

import "../../main.css";


export const Mainfeed = () => {
  const { posts, postSorting } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.auth);

  const [viewFilterModal, setViewFilterModal] = useState(false);

  const [filteredData, setFilteredData] = useState([]);


  const dispatch = useDispatch();

  useEffect(() => {
    const filteredPosts = posts.filter(
      (currPost) =>
        user.following.find((user) => user.username === currPost.username) ||
        user.username === currPost.username
    );

    switch (postSorting) {
      case "TRENDING":
        setFilteredData(
          filteredPosts
            .filter((post) => post.likes.likeCount > 0)
            .sort((a, b) => b.likes.likeCount - a.likes.likeCount)
        );
        break;
      case "OLDEST":
        setFilteredData(
          filteredPosts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
        break;
      case "LATEST":
        setFilteredData(
          filteredPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        break;
      case "RESET":
        setFilteredData(filteredPosts);
        break;
      default:
        setFilteredData(filteredPosts);
    }
  }, [user, posts, postSorting]);




  return (
    <div className="mainfeed-container">
      <PostInput />
      {filteredData.length === 0 ? (
        <h4 className="add-posts-notif">Please add users to view posts</h4>
      ) : (
        <div className="mainfeed-info-action-container">
          <p className="mainfeed-info-text">Feed</p>
          <div
            className="filter-modal-container relative"
            onClick={() => setViewFilterModal(!viewFilterModal)}
          >
            <i className="fas fa-filter"></i>
            {viewFilterModal && (
              <div className="filter-modal-master-container">
                <p className="filter-modal-text text-left">Sort by:</p>
                <p
                  className="filter-modal-options"
                  onClick={() => dispatch(postSortingHandler("LATEST"))}
                >
                  Latest Posts
                </p>
                <p
                  className="filter-modal-options"
                  onClick={() => dispatch(postSortingHandler("TRENDING"))}
                >
                  Trending Posts
                </p>
                <p
                  className="filter-modal-options"
                  onClick={() => dispatch(postSortingHandler("OLDEST"))}
                >
                  Oldest Posts
                </p>
                <p
                  className="filter-modal-options clear-filter-btn"
                  onClick={() => dispatch(postSortingHandler("RESET"))}
                >
                  Clear Filter
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {filteredData?.map((el) => (
        <PostCard key={el._id} data={el} isPost={true}/>
      ))}
    </div>
  );
};
