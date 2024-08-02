import RemoteTodoRepository from "@/data/remote/remote_todo_repository";
import TodoEntity from "@/domain/entities/todo_entity";
import LoadingState from "@/enums/loading_state";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TodoState {
    isLoading: LoadingState,
    data: TodoEntity[],
    error: string | null
}

const initialState: TodoState = {
    isLoading: LoadingState.idle,
    data: [],
    error: null
}

const todoRepo = new RemoteTodoRepository();

/**
 * Handles the fetching data of todos in Redux Todo Slice Action
 * @param userId
 */
export const fetchTodos = createAsyncThunk(("todos/fetchTodos"), async (props: {userId: string}) => {
    const todos = await todoRepo.fetchTodos(props.userId);

    return todos ?? [];
});

/**
 * Handles the adding todo in Redux Todo Slice Action
 * @param userId
 * @param content
 */
export const addTodo = createAsyncThunk(("todos/addTodo"), async (props: {userId: string, content: string}) => {
    const todo = await todoRepo.addTodo(props.userId, props.content);

    if(todo != null) {
        const todos = await todoRepo.fetchTodos(props.userId);

        return todos ?? [];
    }

    return [];
});

/**
 * Handles the updating todo in Redux Todo Slice Action
 * @param userId
 * @param todoId
 * @param content
 */
export const updateTodo = createAsyncThunk("todos/updateTodo", async (props: {userId: string, todoId: string, content: string}) => {
    const todo = await todoRepo.updateTodo(props.todoId, props.content);

    if(todo != null) {
        const todos = await todoRepo.fetchTodos(props.userId);

        return todos ?? [];
    }

    return [];
});

/**
 * Handles the delete todo in Redux Todo Slice Action
 * @param userId
 * @param todoId
 */
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (props: {userId: string, todoId: string}) => {
    const isDeleted = await todoRepo.deleteTodo(props.todoId);

    if(isDeleted) {
        const todos = await todoRepo.fetchTodos(props.userId);

        return todos ?? [];
    }

    return [];

});

/**
 * Handles the creation of Redux Slice of Todos
 */
const todoSlice = createSlice({
    initialState: initialState,
    name: "todos",
    reducers: {
        resetTodosState: state => {
            state = initialState;
        }
    },
    extraReducers(builder) {
        // FETCH TODOS
        builder.addCase(fetchTodos.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = LoadingState.success;
            state.data = action.payload;
        }),
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        }),

        // ADD TODO
        builder.addCase(addTodo.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.isLoading = LoadingState.success;
            state.data = action.payload;
        }),
        builder.addCase(addTodo.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        }),

        // UPDATE TODO
        builder.addCase(updateTodo.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            state.isLoading = LoadingState.success;
            state.data = action.payload;
        }),
        builder.addCase(updateTodo.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        }),

        // DELETE TODO
        builder.addCase(deleteTodo.pending, (state) => {
            state.isLoading = LoadingState.loading;
        }),
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.isLoading = LoadingState.success;
            state.data = action.payload;
        }),
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = LoadingState.error;
            state.error = action.error.message ?? null;
        })
    },
});

export const TodoReducer = todoSlice.reducer;
export const { resetTodosState } = todoSlice.actions;
