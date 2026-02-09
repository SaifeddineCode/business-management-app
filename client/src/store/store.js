import authReducer from "./slices/authSlice.js"
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : {
        auth : authReducer,
    }
})


export default store