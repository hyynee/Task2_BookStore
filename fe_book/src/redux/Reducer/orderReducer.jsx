import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/config';



export const fetchOrdersUser = createAsyncThunk('order/fetchOrdersUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/order/myorders');
            return response.data;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchOrderDetail = createAsyncThunk('order/fetchOrderDetail',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await http.get(`order/${orderId}`);
            console.log("Detail", response.data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const initialState = {
    orders: [],
    totalOrders: 0,
    orderDetail: null,
    loading: false,
    error: null,
}

const orderReducer = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchOrdersUser
            .addCase(fetchOrdersUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.totalOrders;
            })
            .addCase(fetchOrdersUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // fetchOrderDetail
            .addCase(fetchOrderDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetail = action.payload;
            })
            .addCase(fetchOrderDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export const { } = orderReducer.actions

export default orderReducer.reducer