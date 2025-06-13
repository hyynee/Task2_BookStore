import { configureStore } from '@reduxjs/toolkit';
import adminBookReducer from './Reducer/adminBookReducer';
import authReducer from './Reducer/authReducer';
import bookReducer from './Reducer/bookReducer';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminBooks: adminBookReducer,
        books: bookReducer,
    },
});

export default store;