import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastHandler } from "../utils/toastutils";
import {
  loginServiceHandler,
  signupServiceHandler,
  postBookmarkServiceHandler,
  postRemoveBookmarkServiceHandler,
  editProfileServicehandler
} from "../services/services";

const initialState = {
    token: JSON.parse(localStorage.getItem('loginItems'))?.token,
    user: JSON.parse(localStorage.getItem('loginItems'))?.user,
};



export const loginHandler = createAsyncThunk(
  "auth/loginHandler",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await loginServiceHandler(username, password);
      return response.data;
    } catch (err) {
        thunkAPI.rejectWithValue(err.response.data);
      ToastHandler("error", "Incorrect username and password!");
    }
  }
);

export const signupHandler = createAsyncThunk(
  "auth/signupHandler",
  async ({ firstName,lastName, username, password }, thunkAPI) => {
    try {
      const response = await signupServiceHandler({ firstName,lastName, username, password  });
      return response.data;
    } catch (err) {
        thunkAPI.rejectWithValue(err.response.data);
      ToastHandler("error", "Error in signing up!");
    }
  }
);


export const postBookmarkPost = createAsyncThunk(
  "auth/postBookmarkPost",
  async ({ encodedToken, postId }) => {
    try {
      const resp = await postBookmarkServiceHandler(
        encodedToken,
        postId,
      );
      return resp.data.bookmarks;
    } catch (err) {
      console.error(err);
    }
  }
);
export const postRemoveBookmarkPost = createAsyncThunk(
  "auth/postRemoveBookmarkPost",
  async ({ encodedToken, postId }) => {
    try {
      const resp = await postRemoveBookmarkServiceHandler(
        encodedToken,
        postId,
      );
      return resp.data.bookmarks;
    } catch (err) {
      console.error(err);
    }
  }
);

export const editUserProfile = createAsyncThunk('auth/editUserProfile', async ({userData, encodedToken}) => {
  try {
    const response = await editProfileServicehandler(userData, encodedToken);
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
});


const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    logoutHandler: (state) => {
      localStorage.removeItem("login");
      state.token = null;
      state.user = null;
      ToastHandler("success", "Sucessfully logged out!");
    },
  },
  extraReducers: {
    [loginHandler.fulfilled]: (state, action) => {

      state.token = action.payload.encodedToken;
      state.user = action.payload.foundUser;
      localStorage.setItem(
        "login",
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.foundUser,
        }),
      );
      ToastHandler("success", "Successfully Logged In");
    },
    [loginHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [signupHandler.fulfilled]: (state, action) => {
      state.user = action.payload.createdUser;
      state.token = action.payload.encodedToken;
      localStorage.setItem(
        "login",
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.createdUser,
        })
      );
      ToastHandler("success", "Successfully signed in!");
    },
    [signupHandler.rejected]: (state, action) => {
        console.error(action.payload)
    },
    [postBookmarkPost.fulfilled]: (state, action) => {
      state.user.bookmarks = action.payload;
      ToastHandler("success", "Post Successfully bookmarked!");
    },
    [postBookmarkPost.rejected]: (state, action) => {
        console.error(action.payload)
    },
    [postRemoveBookmarkPost.fulfilled]: (state, action) => {
      state.user.bookmarks = action.payload;
      ToastHandler("info", "Post removed from bookmarks!");
    },
    [postRemoveBookmarkPost.rejected]: (state, action) => {
        console.error(action.payload)
    },
    [editUserProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      ToastHandler("success", "Profile Updated!");
    },
    [editUserProfile.rejected]: (state, action) => {
        console.error(action.payload)
    }
  },
});

export const {logoutHandler} = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
