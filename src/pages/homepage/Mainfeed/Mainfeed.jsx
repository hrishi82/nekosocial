import { PostInput } from "../PostInput/PostInput"
import { PostCard } from "../PostCard/PostCard"
import { useSelector } from "react-redux"
import {useState} from "react"
import "../../main.css"


export const Mainfeed = () =>{
    const {posts} = useSelector(store => store.posts)
    const [viewFilterModal, setViewFilterModal] = useState(false);

return (    
    <div className="mainfeed-container">
        <PostInput/>
        <div className="mainfeed-info-action-container">
            <p className="mainfeed-info-text">Feed</p>
            <div className="filter-modal-container relative" onClick={()=>setViewFilterModal(!viewFilterModal)}>
            <i class="fas fa-filter"></i>
              {viewFilterModal && (
                <div className="filter-modal-master-container">
                <p className="filter-modal-text text-left">Sort by:</p>
                  <p className="filter-modal-options">Latest Posts</p>
                  <p className="filter-modal-options">Trending Posts</p>
                  <p className="filter-modal-options clear-filter-btn">Clear Filter</p>
                </div>
              )}
            </div>
            
        </div>
        {posts?.map(el=><PostCard key={el._id} data={el} />)}
    </div>
    )
} 
