import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http, sessionStorageUtils } from '../../utils/config';

const activeSession = sessionStorageUtils.getActiveSession();
const initialGuestId = `guest_${new Date().getTime()}`;
sessionStorage.setItem('guestId', sessionStorage.getItem('guestId') || initialGuestId);

const initialState = {
    user: activeSession ? activeSession.user : null,
    token: activeSession ? activeSession.token : null,
    guestId: sessionStorage.getItem('guestId') || initialGuestId,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await http.post('/user/login', userData);
            const data = response.data; // { user, token }
            sessionStorageUtils.saveSession({
                email: data.user.email,
                user: data.user,
                token: data.token,
                isActive: true,
            });
            console.log('User role:', data.user.role);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await http.post('/user/register', userData);
            const data = response.data; // { user, token }
            sessionStorageUtils.saveSession({
                email: data.user.email,
                user: data.user,
                token: data.token,
                isActive: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            if (state.user?.email) {
                sessionStorageUtils.removeSession(state.user.email);
            }
            state.user = null;
            state.token = null;
            state.guestId = `guest_${new Date().getTime()}`;
            sessionStorage.setItem('guestId', state.guestId);
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            sessionStorage.setItem('guestId', state.guestId);
        },
        switchSession: (state, action) => {
            const email = action.payload;
            sessionStorageUtils.switchSession(email);
            const activeSession = sessionStorageUtils.getActiveSession();
            state.user = activeSession ? activeSession.user : null;
            state.token = activeSession ? activeSession.token : null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, generateNewGuestId, switchSession } = authSlice.actions;
export default authSlice.reducer;