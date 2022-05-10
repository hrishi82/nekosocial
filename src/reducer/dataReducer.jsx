

export const dataReducer = (state, action) =>{
    switch(action.type){
        case "SET_ALL_USERS":{
            return {...state, allUsers: action.payload}
        }
        case "SET_ALL_POSTS":{
            return {...state, allPosts: action.payload}
        }
        default:
            return state
    }
}
