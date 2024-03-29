import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastHandler } from "../utils/toastutils";
import {
  getPostsServiceHandler,
  editPostServiceHandler,
  postPostServiceHandler,
  deletePostServiceHandler,
  postCommentToPostServiceHandler,
  editCommentToPostServiceHandler,
  deleteCommentFromPostServiceHandler,
  postLikeToPostServiceHandler,
  postDislikeToPostServiceHandler
} from "../services/services";

const initialState = {
  posts: [],
  postSorting: 'LATEST',
  displayCommentInputModal: false,
};

export const getAllPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const resp = await getPostsServiceHandler();
    return resp.data.posts;
  } catch (err) {
    console.error(err);
  }
});

export const newPost = createAsyncThunk(
    "posts/newPost",
    async ({ encodedToken, postData }) => {
      try {
        const resp = await postPostServiceHandler(
          encodedToken,
          postData,
        );
        ToastHandler("Success", "New post added!");
        return resp.data.posts;
      } catch (err) {
        console.error(err);
      }
    }
  );

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ encodedToken, postData, postId }) => {
    
    try {
      const resp = await editPostServiceHandler(
        encodedToken,
        postData,
        postId,
      );
      return resp.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ encodedToken, postId }) => {
    try {
      const resp = await deletePostServiceHandler(
        encodedToken,
        postId,
      );
      return resp.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);

export const postCommentToPost = createAsyncThunk(
  "posts/postCommentToPost",
  async ({ encodedToken, commentData, postId }) => {
    try {
      const resp = await postCommentToPostServiceHandler(
        encodedToken,
        commentData,
        postId,
      );
      return resp.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);
export const editCommentInPost = createAsyncThunk(
  "posts/editCommentInPost",
  async ({ encodedToken, commentData, commentId, postId }) => {
    try {
      const resp = await editCommentToPostServiceHandler(
        encodedToken,
        commentData,
        postId,
        commentId
      );
      return resp.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);
export const deleteCommentFromPost = createAsyncThunk(
  "posts/deleteCommentFromPost",
  async ({ encodedToken,  postId, commentId }) => {
    try {
      const resp = await deleteCommentFromPostServiceHandler(
        encodedToken,
        postId,
        commentId
      );
      return resp.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);

export const postLikeToPost = createAsyncThunk(
  "posts/postLikeToPost",
  async ({ encodedToken, postId }) => {
    try {
      const resp = await postLikeToPostServiceHandler(
        encodedToken,
        postId,
      );
      return resp.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);
export const postDislikeToPost = createAsyncThunk(
  "posts/postDislikeToPost",
  async ({ encodedToken, postId }) => {
    try {
      const resp = await postDislikeToPostServiceHandler(
        encodedToken,
        postId,
      );
      return resp.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);



const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleCommentInputModal: (state) => {
      state.displayCommentInputModal = !state.displayCommentInputModal;
    },
    postSortingHandler: (state, action) => {
      state.postSorting = action.payload;
    },
  },
  extraReducers: {
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [newPost.fulfilled]: (state, action) => {
        state.posts = action.payload;
        ToastHandler("success", "Post created!");
    },
    [newPost.rejected]: (action) => {
      console.error(action.payload);
      ToastHandler("error", "Error in posting post!");
    },
    [editPost.fulfilled]: (state, action) => {
        state.posts = action.payload;
    },
    [editPost.rejected]: (action) => {
      console.error(action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
        state.posts = action.payload;
        ToastHandler("success", "Post removed!");
    },
    [deletePost.rejected]: (action) => {
      console.error(action.payload);
      ToastHandler("info", "Error in removing post");
    },
    [editCommentInPost.fulfilled]: (state, action) => {
        state.posts = action.payload;
    },
    [editCommentInPost.rejected]: (action) => {
      console.error(action.payload);
    },
    [postCommentToPost.fulfilled]: (state, action) => {
        state.posts = action.payload;
        ToastHandler("success", "Comment successfully added!");
    },
    [postCommentToPost.rejected]: (action) => {
      console.error(action.payload);
      ToastHandler("info", "Error in adding comment to post!");
    },
    [deleteCommentFromPost.fulfilled]: (state, action) => {
        state.posts = action.payload;
        ToastHandler("success", "Comment successfully removed!");
    },
    [deleteCommentFromPost.rejected]: (action) => {
      console.error(action.payload);
      ToastHandler("info", "Error in removing comment from post!");
    },
    [postLikeToPost.fulfilled]: (state, action) => {
        state.posts = action.payload;
        ToastHandler("success", "Post liked!");
    },
    [postLikeToPost.rejected]: (action) => {
      console.error(action.payload);
    },
    [postDislikeToPost.fulfilled]: (state, action) => {
        state.posts = action.payload;
        ToastHandler("info", "Post disliked!");
    },
    [postDislikeToPost.rejected]: (action) => {
      console.error(action.payload);
    },
  },
});

export const postReducer = postSlice.reducer;
export const { toggleCommentInputModal, postSortingHandler } = postSlice.actions;
