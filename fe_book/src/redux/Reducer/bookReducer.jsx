import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/config';

const initialState = {
    books: [],
    selectedBook: null,
    similarBooks: [],
    bestSeller: null,
    newArrivals: [],
    loading: false,
    error: null,
    filters: {
        author: "",
        minPrice: "",
        maxPrice: "",
        minReviews: "",
        sortBy: "",
        order: "asc",
        page: 1,
        limit: 10,
        accessPublic: true,
    }
}

const bookSlices = createSlice({
    name: 'bookSlices',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                author: "",
                minPrice: "",
                maxPrice: "",
                minReviews: "",
                sortBy: "",
                order: "asc",
                page: 1,
                limit: 10,
                accessPublic: true,
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //fetchBooksByFilters
            .addCase(fetchBooksByFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooksByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.books = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchBooksByFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //fetchBookDetail
            .addCase(fetchBookDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBook = action.payload;
            })
            .addCase(fetchBookDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // handle UPDATE book
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBook = action.payload;
                const index = state.books.findIndex((b) => b._id === updatedBook._id);
                if (index > -1) {
                    state.books[index] = updatedBook;
                } else {
                    console.error(`Book not found with id ${updatedBook._id}`);
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // similar books
            .addCase(fetchSimilarBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.similarBooks = action.payload;
            })
            .addCase(fetchSimilarBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // best seller books
            .addCase(fetchBestSellerBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestSellerBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.bestSeller = action.payload;
            })
            .addCase(fetchBestSellerBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // new arrival books
            .addCase(fetchNewArrivalBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewArrivalBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.newArrivals = action.payload;
            })
            .addCase(fetchNewArrivalBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setFilters, clearFilters } = bookSlices.actions

export default bookSlices.reducer

export const fetchBooksByFilters = createAsyncThunk("books/fetchByFilters",
    async ({
        author,
        minPrice,
        maxPrice,
        minReviews,
        sortBy,
        order,
        page,
        limit,
        accessPublic
    }) => {
        const query = new URLSearchParams();
        if (author) query.append('author', author);
        if (minPrice) query.append('minPrice', minPrice);
        if (maxPrice) query.append('maxPrice', maxPrice);
        if (minReviews) query.append('minReviews', minReviews);
        if (sortBy) query.append('sortBy', sortBy);
        if (order) query.append('order', order);
        if (page) query.append('page', page);
        if (limit) query.append('limit', limit);
        if (accessPublic !== undefined) query.append('accessPublic', accessPublic);

        const response = await http.get(`/books?${query.toString()}`);
        console.log('Books fetched with filters:', response);
        return response.data;
    }
)

export const fetchBookDetail = createAsyncThunk("books/fetchDetail",
    async (id) => {
        const response = await http.get(`/books/${id}`);
        return response.data;
    }
);

export const updateBook = createAsyncThunk("books/updateBook",
    async (bookData) => {
        const response = await http.put(`/books/${bookData._id}`, bookData);
        return response.data;
    }
);

export const fetchSimilarBooks = createAsyncThunk("books/fetchSimilarBooks",
    async ({ id }) => {
        const response = await http.get(`/books/similar/${id}`);
        return response.data;
    }
);

export const fetchBestSellerBooks = createAsyncThunk("books/fetchBestSeller",
    async () => {
        const response = await http.get(`/books/best-seller`);
        return response.data;
    }
);

export const fetchNewArrivalBooks = createAsyncThunk("books/fetchNewArrivals",
    async () => {
        const response = await http.get(`/books/new-arrivals`);
        return response.data;
    }
);