import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/config';

export const createCheckout = createAsyncThunk("checkout/createCheckout",
    async (checkoutData, { rejectWithValue }) => {
        try {
            const response = await http.post('/checkout', checkoutData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

const initialState = {
    checkout: null,
    loading: false,
    error: null
}

const checkoutReducer = createSlice({
    name: 'checkoutReducer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export const { } = checkoutReducer.actions

export default checkoutReducer.reducer