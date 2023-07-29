import { configureStore } from '@reduxjs/toolkit'
import todoReducer, { fetchData } from '../features/todoSlice'
import quoteReducer, { fetchQuoteData } from '../features/quoteSlice';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        quotes: quoteReducer
    }
})

store.dispatch(fetchData());//yeni eklenen todoları store a göndermek için
store.dispatch(fetchQuoteData())


export default store