import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getUsersServiceHandler, followUserServiceHandler, unfollowUserServiceHandler} from "../services/services"
import {editUserProfile} from "./authenticationSlice"
import { ToastHandler } from '../utils/toastutils';

const initialState = {
    users : []
}


export const getAllUsers = createAsyncThunk("user/getAllUsers", async () =>{
    try{
        const resp = await getUsersServiceHandler()
        return resp.data.users;
    }catch(err){
        console.error(err);
    }
})

export const followUser = createAsyncThunk(
    'user/followUser',
    async ({ followUserId, token, dispatch }) => {
      const response = await followUserServiceHandler(followUserId, token);
      dispatch(editUserProfile({ userData: response.data.user, encodedToken: token }));
      ToastHandler('success', `You are now following ${response.data.followUser.username}`);
      return response.data;
    },
  );
  
  export const unfollowUser = createAsyncThunk(
    'user/unfollowUser',
    async ({ followUserId, token, dispatch }) => {
      const response = await unfollowUserServiceHandler(followUserId, token);
      dispatch(editUserProfile({ userData: response.data.user, encodedToken: token }));
      ToastHandler('success', `You unfollowed ${response.data.followUser.username}`);
      return response.data;
    },
  );


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers:{
        [getAllUsers.fulfilled]: (state, action) =>{
            state.users = action.payload
        },
        [getAllUsers.rejected]: (state, action) =>{
            console.error(action.payload)
        },
        [followUser.fulfilled]: (state, action) => {
            state.users = [...state.users].map((user) =>
              action.payload.followUser.username === user.username ? action.payload.followUser : user,
            );
            state.users = [...state.users].map((user) =>
              action.payload.user.username === user.username ? action.payload.user : user,
            );
          },
          [followUser.rejected]: (state, action) => {
            console.error(action.payload);
          },
          [unfollowUser.fulfilled]: (state, action) => {
            state.users = state.users.map((user) =>
              action.payload.followUser.username === user.username ? action.payload.followUser : user,
            );
            state.users = [...state.users].map((user) =>
              action.payload.user.username === user.username ? action.payload.user : user,
            );
          },
          [unfollowUser.rejected]: (state, action) => {
            console.error(action.payload);
          },
    }
})

export const userReducer = userSlice.reducer

