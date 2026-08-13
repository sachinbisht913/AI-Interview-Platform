import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchHistory = createAsyncThunk(
    "history/fetchHistory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/history");

            return response.data.interviews;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch interview history."
            );
        }
    }
);

const historySlice = createSlice({
    name: "history",

    initialState: {
        interviews: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.interviews = action.payload;
            })

            .addCase(fetchHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default historySlice.reducer;