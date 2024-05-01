import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/user.slice"
import adminReducer from "./slices/admin.slice"


export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer
    }
})