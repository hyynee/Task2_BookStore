import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/config';

export const fetchAllOrders = createAsyncThunk('adminOrder/fetchAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/order/all');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const updateOrderStatus = createAsyncThunk('adminOrder/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await http.put(`/order/update/${orderId}`, { status })
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const deleteOrder = createAsyncThunk('adminOrder/deleteOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await http.delete(`/order/delete/${orderId}`)
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const initialState = {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null
}

const adminOrderReducer = createSlice({
    name: 'adminOrderReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchAllOrders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.data.length;
                state.totalSales = action.payload.data.reduce((acc, order) => acc + order.totalPrice, 0);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // updateOrderStatus
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrders = state.orders.data.map(order =>
                    order._id === action.payload.data._id ? action.payload.data : order
                    // order._id trùng với action.payload.data._id => cập nhật
                );
                state.orders.data = updatedOrders;
            })
            // deleteOrder
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(o => o._id !== action.payload._id);
            })
    }
});

export const { } = adminOrderReducer.actions

export default adminOrderReducer.reducer