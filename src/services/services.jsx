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
