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

export const addTaskServer = createAsyncThunk(
    "task/addTaskServer",
    async (newTask, { rejectWithValue }) => {
        const response = await fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })

        if (!response.ok) {
            return rejectWithValue("failed to add task")
        }

        const data = response.json()
        return data

    }

)

export const deleteTaskFromServer = createAsyncThunk(
    " task/deleteTaskFromServer",
    async (id, { rejectWithValue }) => {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            return rejectWithValue('failed delete task')
        }
        return id
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

            // post

            .addCase(addTaskServer.pending, (state) => {
                state.is_loading = true
                state.error = ""
                state.taskLists = []

            })
            .addCase(addTaskServer.fulfilled, (state) => {
                state.is_loading = false
                state.taskLists.push(action.payload)
            })

            .addCase(addTaskServer.rejected, (state, action) => {
                state.is_loading = false
                state.error = action.payload

            })

            // delete

            .addCase(deleteTaskFromServer.pending, (state) => {
                state.is_loading = true
                state.error = ""
            })
            .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
                state.is_loading = false
                state.taskLists = state.taskLists.filter((item) => item.id !== action.payload)
            })
            .addCase(deleteTaskFromServer.rejected, (state, action) => {
                state.is_loading = false
                state.error = action.payload
            })

    }

})

export default taskListSlice.reducer