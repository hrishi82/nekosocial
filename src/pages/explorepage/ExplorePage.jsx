import { PostCard } from "../homepage/PostCard/PostCard"
import { useSelector } from "react-redux"
import { LeftAsideBar, RightAsideBar } from "../../components";

export const ExplorePage = () =>{
    const {posts} = useSelector(store => store.posts)

return (  
    <div className="home-page-container relative"> 
    <LeftAsideBar />
    <div className="mainfeed-container">
        <div className="mainfeed-info-action-container">
            <p className="mainfeed-info-text">Explore</p>
        </div>
        {posts?.map(el=><PostCard key={el._id} data={el} />)}
    </div>
    <RightAsideBar />
    </div> 
    )
} 
