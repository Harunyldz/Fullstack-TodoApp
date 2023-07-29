import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


//veritabanından tüm veriyi çekmek için bir fonk.
const fetchData = createAsyncThunk('fetchData', async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/todo')
        return response.data.data
    } catch (error) {
        throw Error("Veri çekme hatası" + error.message)
    }
})

//todoSlice türetildi ve initialstate değerleri belirlendi
const todoSlice = createSlice({
    name: "todos",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default todoSlice.reducer
export { fetchData}