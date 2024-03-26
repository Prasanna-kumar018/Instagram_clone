import { configureStore } from "@reduxjs/toolkit";
import popup_Slice from "../slice/popup_Slice";
import authuser from "../slice/authuser";
import userProfile from "../slice/userProfile";
const store = configureStore({
    reducer: {
        'popups': popup_Slice,
        'user': authuser,
        'userprofiledata':userProfile
    }
})
export { store };