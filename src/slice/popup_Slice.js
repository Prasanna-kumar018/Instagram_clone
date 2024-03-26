import { createSlice } from "@reduxjs/toolkit"


let initialState = {
    data: [],
    count:0
}
let popups = createSlice({
    name: 'popups',
    initialState,
    reducers: {
        add(state, action)
        {
            state.count = state.count + 1;
            let res={...action.payload,id:state.count}
            state.data.push(res);
            console.log(JSON.stringify(state.data));
        },
        remove(state, action)
        {
           state.data= state.data.filter((item) =>
            {
                return item.id !== action.payload;
            })
        }
    }
})
export { popups };
export default popups.reducer;