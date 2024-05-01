import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminInfo: (state, action)=>{
            state.info = action.payload
        },
        adminLogOut: (state) => {
            state.info = null
        }
    }
})

export const {setAdminInfo, adminLogOut} = adminSlice.actions

export default adminSlice.reducer