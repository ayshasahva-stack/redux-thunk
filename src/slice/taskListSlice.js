import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskLists: [],
    is_loading: false,
    error: ""
}

export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer",
    async (_, { rejectWithValue }) => {
        const response = await fetch("http://localhost:3001/tasks")
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue("no task found")
            // return rejectWithValue({error:"no task found"})
        }

    }

)
const taskListSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get
            .addCase(getTaskFromServer.pending, (state) => {
                state.is_loading = true
                state.error = ""
            })
            .addCase(getTaskFromServer.fulfilled, (state, action) => {
                state.is_loading = false
                state.taskLists = action.payload

            })
            .addCase(getTaskFromServer.rejected, (state) => {
                state.is_loading = false
                state.error = action.payload
                state.taskLists = []

            })

    }

})

export default taskListSlice.reducer