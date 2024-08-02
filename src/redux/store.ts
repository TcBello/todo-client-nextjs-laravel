import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TodoReducer } from "./slices/todo_slice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { UserReducer } from "./slices/user_slice";
import { loadReduxState } from "@/data/local/redux_state_local_storage";

const combinedReducers = combineReducers({
    "todos": TodoReducer,
    "user": UserReducer
})

export const store = () => configureStore({
    reducer: combinedReducers,
    preloadedState: loadReduxState(),
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
type RootState = ReturnType<typeof combinedReducers>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
