import { configureStore } from "@reduxjs/toolkit";
import counter from "../entities/counter/counterSlice";
import posts from "../entities/posts/postsSlice";
import quests from "../entities/quests/questsSlice";
// import users from "@/entities/users/usersSlice";
import profile from "@/entities/profile/profileSlice";
import friends from "@/entities/friends/friendsSlice";

import { apiSlice } from "@/entities/api/apiSlice";

import type { Store } from "@reduxjs/toolkit";


// const rootReducer = combineReducers({})

export const store: Store = configureStore({
    reducer: {
        counter,
        posts,
        // users,
        profile,
        friends,
        quests,
        api: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            //   .prepend(listenerMiddleware.middleware)
            .concat(apiSlice.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// export type RootState = ReturnType<typeof rootReducer>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// hooks > useDispatch / useSelector
// export const useNewDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types
