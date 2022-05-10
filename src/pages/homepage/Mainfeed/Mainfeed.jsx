import { PostInput } from "../PostInput/PostInput"
import { PostCard } from "../PostCard/PostCard"
import {useData} from "../../../context/dataContext"


export const Mainfeed = () =>{
    const {state} = useData()
    const {allPosts} = state
return (    
    <div className="mainfeed-container">
        <PostInput/>
        <div className="mainfeed-info-action-container">
            <p className="mainfeed-info-text">Latest Post</p>
            <i className="fa-solid fa-arrow-up-short-wide"></i>
        </div>
        {allPosts.map(el=><PostCard key={el._id} data={el}/>)}
    </div>
    )
} 
