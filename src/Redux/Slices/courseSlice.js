import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    courseData:[]
}

export const createCourse = createAsyncThunk("/create/course", async (data)=> {
    try {
        const res = await axiosInstance.post("/course/create",data);
        toast.success("Course created successfully");
    
        return res.data
    } catch (error) {
        toast.error(error.message);
    }
});


const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers: (builder)=> {

    }
});

export default courseSlice.reducer;