import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getUserServiceHandler, getUserPostsServiceHandler} from "../services/services"

const initialState = {
    currUserData: {},
    userPosts: []
}


export const getUserDetails = createAsyncThunk('profile/getUserDetails', async (username) => {
    try {
      const response = await getUserServiceHandler(username);
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  });
  
  export const getUserPosts = createAsyncThunk('profile/getUserPost', async (username) => {
    try {
      const response = await getUserPostsServiceHandler(username);
      return response.data.posts;
    } catch (error) {
      console.error(error);
    }
  });


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
      [getUserDetails.fulfilled]: (state, action) => {
        state.currUserData = action.payload;
      },
      [getUserDetails.rejected]: (state, action) => {
        console.error(action.payload);
      },
      [getUserPosts.fulfilled]: (state, action) => {
        state.userPosts = action.payload;
      },
      [getUserPosts.rejected]: (state, action) => {
        console.error(action.payload);
      },
    },
  });
  
  export const profileReducer = profileSlice.reducer;
  
