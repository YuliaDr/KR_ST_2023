import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './publicationsSlice';
import authReducer from './authSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
});