

export const dataReducer = (state, action) =>{
    switch(action.type){
        case "SET_ALL_USERS":{
            return {...state, allUsers: action.payload}
        }
        case "SET_ALL_POSTS":{
            return {...state, allPosts: action.payload}
        }
        case "TOGGLE_COMMENT_INPUT_MODAL":{
            return {...state, displayCommentInputModal: !state.displayCommentInputModal}
        }
        default:
            return state
    }
}
