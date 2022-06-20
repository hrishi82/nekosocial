import { createSlice } from "@reduxjs/toolkit";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

const initialState = {
    formData: {
        content:"",
        comments:[]
      },
    singlePostPageComment: false,
    postInformation: '',
    TimeAgo: TimeAgo.addLocale(en),
    displaySidebar: false
}

const utilitiesSlice = createSlice({
    name: "utilities",
    initialState,
    reducers: {
        setFormData: (state, action)=>{
            state.formData = action.payload
        },
        setSingePageComment: (state, action)=>{
            state.singlePostPageComment = action.payload
        },
        setPostInformation: (state, action)=>{
            state.postInformation = action.payload
        },
        toggleSidebar: (state, action)=>{
            state.displaySidebar = !state.displaySidebar
        },
        resetFormData: (state)=>{
            state.formData = {
                content:"",
                comments:[]
              }
        },

    }
})

export const {setFormData, setSingePageComment, setPostInformation, toggleSidebar, resetFormData} = utilitiesSlice.actions
export const utilitiesReducer = utilitiesSlice.reducer
