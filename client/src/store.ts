import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './slices/task'

const store = configureStore({
    reducer: {task: taskReducer},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
