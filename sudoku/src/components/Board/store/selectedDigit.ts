import { createSlice, configureStore } from '@reduxjs/toolkit'

const selectedDigit =  createSlice({
    name: 'selectedDigit',
    initialState: 0,
    reducers: {
        setSelectedDigit: (state, action) => action.payload
    }
})
const store = configureStore({
    reducer: {
        selectedDigit: selectedDigit.reducer
    }
})
const { setSelectedDigit } = selectedDigit.actions

export { store, setSelectedDigit }