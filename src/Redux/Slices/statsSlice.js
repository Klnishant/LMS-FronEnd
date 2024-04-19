import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    users:{},
    subscriberCount:null,
    userCount:null,
}

export const getStats = createAsyncThunk("/get/stats", async ()=>{
    try {
        const res = await axiosInstance.get("/stats/get");
        toast.success("Data fetched successfully");

        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
});

const statsSlice = createSlice({
    name:"stats",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getStats.fulfilled,(state,action)=> {
            state.subscriberCount = action?.payload?.data?.subscriberCount;
            state.userCount = action?.payload?.data?.userCount;
        })
    }
});

export default statsSlice.reducer;