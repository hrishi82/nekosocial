import {createContext, useContext, useState, useEffect, useReducer} from "react"
import { dataReducer } from "../reducer/dataReducer"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'


const DataContext = createContext()

export const DataProvider = ({children}) =>{


    const initialPostData =   {
        content:""
      }

    const [postData, setPostData] = useState(initialPostData)

    const initialValue = {
        allUsers: [],
        allPosts: [],
        allPostOfUser: [],
        filters: {
            search: "",
            sortBy: ""
        }
    }
    const [state, dispatch] = useReducer(dataReducer, initialValue)
    
    TimeAgo.addLocale(en)

    return(
        <DataContext.Provider value={{state, dispatch, TimeAgo, postData, setPostData, initialPostData}}>{children}</DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
