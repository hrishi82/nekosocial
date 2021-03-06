import axios from "axios";

export const loginServiceHandler = async (username, password) =>
  await axios.post("/api/auth/login", {
    username,
    password,
  });

export const signupServiceHandler = async ({
  firstName,
  lastName,
  username,
  password
}) =>
  await axios.post(`/api/auth/signup`, {
    firstName,
    lastName,
    username,
    password
  });

export const getUsersServiceHandler = async () => {
  return axios.get("/api/users");
};
export const getPostsServiceHandler = async () => {
  return axios.get("/api/posts");
};

export const postPostServiceHandler = async (encodedToken, postData) => {
  return axios.post(
    "/api/posts",
    { postData },
    {
      headers: { authorization: encodedToken },
    }
  );
};

export const editPostServiceHandler = async (
  encodedToken,
  postData,
  postId,
) => {
  return axios.post(
    `/api/posts/edit/${postId}`,
    { postData },
    {
      headers: { authorization: encodedToken },
    }
  );
};

export const deletePostServiceHandler = async (encodedToken, postId) => {
  return axios.delete(`/api/posts/${postId}`, {
    headers: { authorization: encodedToken },
  });
};

export const getPostContentServiceHandler = async ({ postId }) => {
  return axios.get(`/api/posts/${postId}`);
};




export const getAllCommentsOfPostServiceHandler = async (postId) => {
  return axios.get(`/api/comments/${postId}`);
};

export const postCommentToPostServiceHandler = async (
  encodedToken,
  commentData,
  postId,
) => {
  return axios.post(
    `/api/comments/add/${postId}`,
    { commentData },
    {
      headers: { authorization: encodedToken },
    }
  );
};
export const editCommentToPostServiceHandler = async (
  encodedToken,
  commentData,
  postId,
  commentId,
) => {
  return axios.post(
    `/api/comments/edit/${postId}/${commentId}`,
    { commentData },
    {
      headers: { authorization: encodedToken },
    }
  );
};
export const deleteCommentFromPostServiceHandler = async (
  encodedToken,
  postId,
  commentId,
) => {
  return axios.delete(
    `/api/comments/delete/${postId}/${commentId}`,
    {
      headers: { authorization: encodedToken },
    }
  );
};





export const postLikeToPostServiceHandler = async (
  encodedToken,
  postId,
) => {
  return axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: { authorization: encodedToken },
    }
  );
};
export const postDislikeToPostServiceHandler = async (
  encodedToken,
  postId,
) => {
  return axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization: encodedToken },
    }
  );
};


export const postBookmarkServiceHandler = async (
  encodedToken,
  postId,
) => {
  return axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: { authorization: encodedToken },
    }
  );
};
export const postRemoveBookmarkServiceHandler = async (
  encodedToken,
  postId,
) => {
  return axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization: encodedToken },
    }
  );
};



export const editProfileServicehandler = (userData, encodedToken) =>
  axios.post(
    '/api/users/edit',
    { userData },
    {
      headers: {authorization: encodedToken },
    },
  );

export const followUserServiceHandler = (followUserId, encodedToken) =>
  axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    {
      headers: {authorization: encodedToken },
    },
  );
export const unfollowUserServiceHandler = (followUserId, encodedToken) =>
  axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    {
      headers: {authorization: encodedToken },
    },
  );


export const getUserServiceHandler = (username) => axios.get(`/api/users/${username}`);

export const getUserPostsServiceHandler = (username) => axios.get(`/api/posts/user/${username}`);
