import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/config';

export const fetchAdminBooks = createAsyncThunk(
    'adminBooks/fetchAdminBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/books');
            return response.data;
        } catch (e) {
            console.error('Error details:', e);
            return rejectWithValue(e.response.data);
        }
    }
);

export const createBook = createAsyncThunk(
    'adminBooks/createBook',
    async (bookData) => {
        try {
            const response = await http.post('/books', bookData);
            console.log('Book created:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    }
);

export const updateBook = createAsyncThunk(
    'adminBooks/updateBook',
    async ({ id, bookData }) => {
        console.log('Book updated', id, bookData);
        const response = await http.put(`/books/${id}`, bookData);
        return response.data;
    }
);

export const deleteBook = createAsyncThunk(
    'adminBooks/deleteBook',
    async (id) => {
        const response = await http.delete(`/books/${id}`);
        return id;
    }
);

const initialState = {
    books: [],
    loading: false,
    error: null,
};

const adminBookSlices = createSlice({
    name: 'adminBookSlices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchAdminBooks
            .addCase(fetchAdminBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchAdminBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // createBook
            .addCase(createBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
            // updateBook
            .addCase(updateBook.fulfilled, (state, action) => {
                const index = state.books.findIndex((book) => book._id === action.payload._id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
            })
            // deleteBook
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter((book) => book._id !== action.payload);
            });
    },
});

export default adminBookSlices.reducer;