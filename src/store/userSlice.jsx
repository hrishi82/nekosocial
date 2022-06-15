import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getUsersServiceHandler} from "../services/services"

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
    }
})

export const userReducer = userSlice.reducer

