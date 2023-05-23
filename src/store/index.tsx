import { configureStore } from '@reduxjs/toolkit'
import portfolioReducer from './portfolio/reducer'

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
