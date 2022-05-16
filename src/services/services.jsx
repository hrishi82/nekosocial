import axios from "axios"


export const loginServices = async (username, password) =>
  await axios.post('/api/auth/login', {
    username,
    password,
  });

export const signupServiceHandler = async ({ email, password, name }) =>
  await axios.post(`/api/auth/signup`, {
    email,
    password,
    name,
  });


export const getUsersServiceHandler = async () =>{
    return axios.get("/api/users")
}
export const getPostsServiceHandler = async () =>{
    return axios.get("/api/posts")
}


export const postPostServiceHandler =  async ({encodedToken, postData}) =>{
    return axios.post("/api/posts", 
    {postData},
    {
        headers: {authorization: encodedToken},
    })
}

export const editPostServiceHandler =  async ({encodedToken, postId, postData}) =>{
    return axios.post(`/api/posts/edit/${postId}`, 
    {postData},
    {
        headers: {authorization: encodedToken},
    })
}

export const deletePostServiceHandler =  async ({encodedToken, postId}) =>{
    return axios.delete(`/api/posts/${postId}`, 
    {
        headers: {authorization: encodedToken},
    })
}



export const getPostContentServiceHandler =  async ({postId}) =>{
    return axios.get(`/api/posts/${postId}`)
}

export const getAllCommentsOfPostServiceHandler =  async (postId) =>{
    return axios.get(`/api/comments/${postId}`)
}


export const postCommentToPostServiceHandler =  async ({encodedToken, commentData, postId}) =>{
  return axios.post(`/api/comments/add/${postId}`, 
  {commentData},
  {
      headers: {authorization: encodedToken},
  })
}
export const editCommentToPostServiceHandler =  async ({encodedToken, commentData, postId, commentId}) =>{
  return axios.post(`/api/comments/edit/${postId}/${commentId}`, 
  {commentData},
  {
      headers: {authorization: encodedToken},
  })
}
export const deleteCommentFromPostServiceHandler =  async ({encodedToken, postId, commentId}) =>{
  return axios.post(`/api/comments/delete/${postId}/${commentId}`, 
  {},
  {
      headers: {authorization: encodedToken},
  })
}


export const postLikeToPostServiceHandler =  async ({encodedToken, postId}) =>{
  return axios.post(`/api/posts/like/${postId}`, {},
  {
    headers: {authorization: encodedToken},
})
}
export const postDislikeToPostServiceHandler =  async ({encodedToken, postId}) =>{
  return axios.post(`/api/posts/dislike/${postId}`, {},
  {
    headers: {authorization: encodedToken},
})
}
