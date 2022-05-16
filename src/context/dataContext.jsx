import {createContext, useContext, useState, useEffect, useReducer} from "react"
import { dataReducer } from "../reducer/dataReducer"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'


const DataContext = createContext()

export const DataProvider = ({children}) =>{


    const initialFormData =   {
        content:"",
        comments:[]
      }

    const [formData, setFormData] = useState(initialFormData)
    const [singlePostPageComment, setSinglePostPageComment] = useState(false)
    const [postInformation, setPostInformation] = useState(false)

    const initialValue = {
        allUsers: [],
        allPosts: [],
        allPostOfUser: [],
        allCommentsOfPost: [],
        filters: {
            search: "",
            sortBy: ""
        },
        displayCommentInputModal:false,
    }
    const [state, dispatch] = useReducer(dataReducer, initialValue)
    
    TimeAgo.addLocale(en)

    return(
        <DataContext.Provider value={{state, dispatch, TimeAgo, formData, setFormData, initialFormData, singlePostPageComment, setSinglePostPageComment, postInformation, setPostInformation}}>{children}</DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
