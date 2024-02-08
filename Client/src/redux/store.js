import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';



const rootRecucer = combineReducers({user:userReducer})
const persistConfig= {
    key : 'root',
    version : 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootRecucer)

export const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    },
});

export const persistor = persistStore(store)