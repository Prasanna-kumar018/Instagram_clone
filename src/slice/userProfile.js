import { createSlice } from "@reduxjs/toolkit";
const profiledata = createSlice({
  name: "userprofiledata",
  initialState: { data: null },
  reducers: {
    setProfile(state, action)
    {
      console.warn("data received in setProfile");
      return {
        ...action.payload,
      };
    },
    setlogoutprofile(state,action)
    {
      return {
         data:null
       }
    }
  },
});
export  const { setProfile ,setlogoutprofile} =profiledata.actions;
export default profiledata.reducer;
