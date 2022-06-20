import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./authenticationSlice";
import { postReducer } from "./postSlice";
import { userReducer } from "./userSlice";
import { utilitiesReducer } from "./utilitiesSlice";
import { profileReducer } from "./profileSlice";

export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        posts: postReducer,
        users: userReducer,
        utilities: utilitiesReducer,
        profile: profileReducer,
    }
})
