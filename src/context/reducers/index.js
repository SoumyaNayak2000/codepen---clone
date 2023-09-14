import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import projectReducer from "./projectReducer";
import searchReducers from "./searchReducers";


const myReducer = combineReducers({
    user: userAuthReducer,
    projects : projectReducer,
    searchTerm : searchReducers
})

export default myReducer