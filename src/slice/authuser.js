import { createSlice } from "@reduxjs/toolkit";

const authuser = createSlice({
  name: "user",
  initialState: { data: JSON.parse(localStorage.getItem("user-info")) },
  reducers: {
    setuser(state, action)
    {
      console.warn("data recived in authuser");
      return {
        ...action.payload,
      };
    },
    setlogout(state, action) {
      return {
        data: null,
      };
    },
  },
});
export const  { setuser,setlogout }=authuser.actions;
export default authuser.reducer;
