// File: src/redux/dashboardSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/axios";
// Fetch Dashboard Data
export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/dashboard");

            return response.data.dashboard;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch dashboard."
            );
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",

    initialState: {
        dashboard: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload;
            })

            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;