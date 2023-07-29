import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const fetchQuoteData = createAsyncThunk("fetchQuoteData", async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/quote')
        return response.data.data
    } catch (error) {
        throw Error("Quote çekilirken bir hata oluştu" + error.message)
    }
})

const quoteSlice = createSlice({
    name: "quotes",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuoteData.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchQuoteData.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchQuoteData.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default quoteSlice.reducer
export {fetchQuoteData}