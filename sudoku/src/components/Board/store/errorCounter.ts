import { createSlice, configureStore } from '@reduxjs/toolkit'

const errorCounter =  createSlice({
    name: 'errorCounter',
    initialState: 0,
    reducers: {
        setErrorCounter: (_, action) => action.payload
    }
})
const errorCounterStore = configureStore({
    reducer: {
        errorCounter: errorCounter.reducer
    }
})
const { setErrorCounter } = errorCounter.actions

export { errorCounterStore, setErrorCounter }