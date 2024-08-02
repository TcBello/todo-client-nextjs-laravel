import { getToken } from "@/data/local/token_data_local_storage";
import RemoteAuthRepository from "@/data/remote/remote_auth_repository";
import { RemoteUserRepository } from "@/data/remote/remote_user_repository";
import UserEntity from "@/domain/entities/user_entity";
import LoadingState from "@/enums/loading_state";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
    isLoading: LoadingState,
    data: UserEntity | null,
    token: string | null,
    error: string | null
}

const initialData: UserState = {
    isLoading: LoadingState.idle,
    data: null,
    token: null,
    error: null
};

const userRepo = new RemoteUserRepository();
const authRepo = new RemoteAuthRepository();

/**
 * Handles the fetch user data in Redux User Slice Action
 */
export const fetchData = createAsyncThunk("user/fetchData", async () => {
    const data = await userRepo.getCurrentUser();

    return data;
});

/**
 * Handles the login of user in Redux User Slice Action
 * @param email
 * @param password
 */
export const login = createAsyncThunk("user/login", async (props: {email: string, password: string}) => {
    const user = await authRepo.login(props.email, props.password);
    const token = getToken();

    let data = {
        data: user,
        token: token
    }

    return data;
});

/**
 * Handles the register of user in Redux User Slice Action
 * @param username
 * @param email
 * @param password
 */
export const register = createAsyncThunk("user/register", async (props: {username: string, email: string, password: string}) => {
    const user = await authRepo.register(props.username, props.email, props.password);
    const token = getToken();

    let data = {
        data: user,
        token: token
    }

    return data;
});

/**
 * Handles the logout of user in Redux User Slice Action
 */
export const logout = createAsyncThunk("user/logout", async () => {
    await authRepo.logout();
});

/**
 * Handles the creation of Redux Slice of User
 */
const userSlice = createSlice({
    name: "user",
    initialState: initialData,
    reducers: {
        resetUserState: state => {
            state = initialData;
        }
    },
    extraReducers(builder) {
        // FETCH DATA
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = LoadingState.success;
            state.data = action.payload;
        }),
        builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        }),

        // LOGIN
        builder.addCase(login.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = LoadingState.success;
            state.data = action.payload.data;
            state.token = action.payload.token;
        }),
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        }),

        // REGISTER
        builder.addCase(register.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = LoadingState.success;
            state.data = action.payload.data;
            state.token = action.payload.token;
        }),
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        }),

        // LOGOUT
        builder.addCase(logout.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = LoadingState.success;
        }),
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        })
    },
});

export const UserReducer = userSlice.reducer;
export const { resetUserState } = userSlice.actions;
