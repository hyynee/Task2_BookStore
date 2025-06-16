import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http, sessionStorageUtils } from '../../utils/config';

const loadCartFromStorage = () => {
    const storedCart = sessionStorageUtils.getActiveSession()?.cart;
    return storedCart ? storedCart : { items: [] };
}

const saveCartToStorage = (cart) => {
    const activeSession = sessionStorageUtils.getActiveSession();
    if (activeSession) {
        activeSession.cart = cart;
        sessionStorageUtils.saveSession(activeSession);
    }
}

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const params = userId ? { userId } : { guestId };
            const response = await http.get(`/cart`, { params });
            return response.data.data;
        } catch (e) {
            console.error("Error fetching cart:", e.response?.data || e.message);
            return rejectWithValue(e.response?.data || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, guestId, bookId, quantity }, { rejectWithValue }) => {
        try {
            const response = await http.post(`/cart`, {
                userId,
                guestId,
                bookId,
                quantity
            });
            return response.data.data;
        } catch (e) {
            console.error("Error adding to cart:", e.response?.data || e.message);
            return rejectWithValue(e.response?.data || 'Failed to add to cart');
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async ({ userId, guestId, bookId, quantity }, { rejectWithValue }) => {
        try {
            const response = await http.put('/cart', { userId, guestId, bookId, quantity });
            return response.data.data;
        } catch (error) {
            console.error("Error updating cart:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to update item quantity");
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ userId, guestId, bookId }, { rejectWithValue }) => {
        try {
            const response = await http.delete(`/cart`, {
                data: { userId, guestId, bookId }
            });
            return response.data.data;
        } catch (e) {
            console.error("Error removing from cart:", e.response?.data || e.message);
            return rejectWithValue(e.response?.data || 'Failed to remove from cart');
        }
    }
);

export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await http.post(`/cart/merge`, { userId, guestId });
            return response.data.data;
        } catch (e) {
            console.error("Error merging carts:", e.response?.data || e.message);
            return rejectWithValue(e.response?.data || 'Failed to merge cart');
        }
    }
);

const initialState = {
    cart: loadCartFromStorage(),
    loading: false,
    error: null
}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        clearCart: (state) => {
            console.log('🧹 CLEARING CART - Before:', state.cart);
            state.cart = {
                items: []
            };
            const activeSession = sessionStorageUtils.getActiveSession();
            if (activeSession) {
                activeSession.cart = state.cart;
                sessionStorageUtils.saveSession(activeSession);
                console.log('🧹 CART CLEARED - After:', activeSession.cart);
            }
            console.log('🧹 AFTER CLEAR:', JSON.stringify(state.cart));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                console.log('Add to Cart Payload from API:', action.payload);
                saveCartToStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity in cart";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item in cart";
            })
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            });
    }
});

export const { clearCart } = cartReducer.actions;

export default cartReducer.reducer;