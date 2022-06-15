import { PostInput } from "../PostInput/PostInput"
import { PostCard } from "../PostCard/PostCard"
import { useSelector } from "react-redux"


export const Mainfeed = () =>{
    const {posts} = useSelector(store => store.posts)

return (    
    <div className="mainfeed-container">
        <PostInput/>
        <div className="mainfeed-info-action-container">
            <p className="mainfeed-info-text">Latest Post</p>
            <i className="fa-solid fa-arrow-up-short-wide"></i>
        </div>
        {posts?.map(el=><PostCard key={el._id} data={el} fromSinglePostPg={false}/>)}
    </div>
    )
} 
