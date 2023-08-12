import { configureStore } from "@reduxjs/toolkit";
import QuizReducers from "./Reducers/QuizReducer";
import UtilsReducers from "./Reducers/UtilsReducers";


export const Store = configureStore({
    reducer:{
        QuizReducers:QuizReducers,
        UtilsReducer:UtilsReducers
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck:false
    })
});

export type RootState = ReturnType <typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;