import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures:[],
}

export const addLectures = createAsyncThunk("/create/lectures", async (data)=>{
    try {
        console.log(data);
        const formData = new FormData();
        formData.append("title",data.title);
        formData.append("description",data.description);
        formData.append("lectures",data.lecture);
        console.log(formData);
        const res = await axiosInstance.patch(`/course/add/lectue/c/${data.courseId}`,formData);
        toast.success("Lecture added successfully");

        return res.data
    } catch (error) {
        toast.error(error?.message)
    }
});

export const getLectures = createAsyncThunk("/get/lectures", async (data)=>{
    try {
        console.log(data);
        const res = await axiosInstance.get(`/course/get/lectures/c/${data}`);
        console.log(res);
        toast.success("Lecture fetched successfully");

        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const deleteLecture = createAsyncThunk("/delete/lecture", async(data)=>{
    try {
        const res = await axiosInstance.delete(`/course/delete/lecture/${data?.lectureId}/c/${data?.courseId}`);
        res.success("Lecture deleted successfully");
    } catch (error) {
        toast.error(error.message);
    }
})

const lectureSlice = createSlice({
    name:"lectures",
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder
        .addCase(getLectures.fulfilled,(state,action)=> {
            console.log(action);
            state.lectures=action?.payload?.data
        })
        .addCase(addLectures.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.course?.lectures;
        })
    }
});

export default lectureSlice.reducer;