import { configureStore } from '@reduxjs/toolkit'
import userReducer from './User/userSlice'

export const store = configureStore({
    reducer: {user: userReducer},
    middleware: (getDefaulMiddleware) => 
        getDefaulMiddleware({
        serializableCheck: false,
    })
})