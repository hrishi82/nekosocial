import { PostCard } from "../homepage/PostCard/PostCard"
import { useSelector } from "react-redux"
import { LeftAsideBar, RightAsideBar } from "../../components";

export const BookmarksPage = () =>{
    const {posts} = useSelector(store => store.posts)
    const { user } = useSelector(store => store.auth || {})

    const getPostData = (postID) => posts.filter((post) => post._id === postID)[0];

return (  
    <div className="home-page-container relative"> 
    <LeftAsideBar />
    <div className="mainfeed-container">
        <div className="mainfeed-info-action-container">
            <p className="mainfeed-info-text">{user?.bookmarks.length === 0 ? "No bookmarked posts" : "Bookmarks"}</p>
        </div>
        {user?.bookmarks.map(postID=><PostCard key={postID} data={getPostData(postID)} />)}
    </div>
    <RightAsideBar />
    </div> 
    )
} 
