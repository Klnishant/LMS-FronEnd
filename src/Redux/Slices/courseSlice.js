import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    courseData:[]
}

export const createCourse = createAsyncThunk("/create/course", async (data)=> {
    try {
        const res = await axiosInstance.post("/course/create",data);
        console.log(res);
        toast.success("Course created successfully");
    
        return res.data
    } catch (error) {
        toast.error(error.message);
    }
});

export const getCourses = createAsyncThunk("/get/course", async ()=> {
    try {
        const res = await axiosInstance.get("/course/get/all");
        console.log(res.data.data);
        toast.success("Fetched course successfully");

        return res.data.data
    } catch (error) {
        toast.error(error?.message);
    }
})

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder.addCase(getCourses.fulfilled,(state,action)=> {
            console.log(action.payload);
            localStorage.setItem("courseData",JSON.stringify(action?.payload));
            state.courseData=[...action.payload];
        })
    }
});

export default courseSlice.reducer;