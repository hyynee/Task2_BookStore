import { configureStore } from '@reduxjs/toolkit';
import adminBookReducer from './Reducer/adminBookReducer';
import authReducer from './Reducer/authReducer';
import bookReducer from './Reducer/bookReducer';
import cartReducer from './Reducer/cartReducer';
import checkoutReducer from './Reducer/checkoutReducer';
import orderReducer from './Reducer/orderReducer';
import adminOrderReducer from './Reducer/adminOrderReducer';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminBooks: adminBookReducer,
        books: bookReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        order: orderReducer,
        adminOrders: adminOrderReducer
    },
});

export default store;