import { configureStore } from "@reduxjs/toolkit"
import { guessApi } from "./guessApi"

export const store = configureStore({
    reducer: {
        [guessApi.reducerPath]: guessApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(guessApi.middleware)
})