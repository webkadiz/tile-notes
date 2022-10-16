import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './slices/task'
import userReducer from './slices/user'
import appReducer from './slices/app'

const store = configureStore({
    reducer: {task: taskReducer, user: userReducer, app: appReducer},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
