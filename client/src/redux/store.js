import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import userReducer from './User/userSlice'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers ({
    user: userReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaulMiddleware) => 
        getDefaulMiddleware({
        serializableCheck: false,
    })
})

export const persistor = persistStore(store)