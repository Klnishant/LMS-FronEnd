import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import { toast } from "react-hot-toast";

const initialState = {
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || "",
    data:localStorage.getItem('data') || {}
};
console.log(initialState.data);

export const createAccount = createAsyncThunk("/auth/signup", async (data)=> {
    try {
        const res = await axiosInstance.post("/user/register",data);
        toast.promise(res,{
            loading:"wait your account is creating",
            success: "Account created successfully",
            error:"Failed to create account",
        });
        
        return res.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
});

export const logIn = createAsyncThunk("/auth/signIn", async (data)=> {
    try {
        const res = await axiosInstance.post("/user/logIn",data);
        // toast.promise(res,{
        //     loading:"Wait authentication in progress",
        //     success: "Log in successfully",
        //     error:"Failed to logIn"
        // })

        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logOut = createAsyncThunk("/auth/signOut",async ()=> {
    try {
        const res = await axiosInstance.delete("/user/logOut",{});
        // toast.promise(res,{
        //     loading:"Wait logOut in progress",
        //     success: "Log out successfully",
        //     error:"Failed to logOut"
        // });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk("/auth/update/user", async (data)=> {
    try {
        const res = await axiosInstance.patch("/user/update/profile",data);
        toast.promise(res,{
            loading:"Wait User updation in progress",
            success: (data)=> data?.data?.message,
            error:"Failed to update profile",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const getProfile = createAsyncThunk("/auth/get/profile", async ()=>{
    try {
        const res = await axiosInstance.get("/user/profile",{});
        toast.promise(res,{
            loading:"Wait while profile is getting",
            success: (data)=>{
                return data?.data?.message;
            },
            error:"Failed to fetching profile",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        const logInBuider = builder.addCase(logIn.fulfilled,(state,action)=> {
            localStorage.setItem("data",JSON.stringify(action?.payload?.data?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.data?.user?.role);
            state.isLoggedIn = true;
            state.data = action.payload?.data?.user;
            state.role = action?.payload?.data?.user?.role;
        })
        builder.addCase(logOut.fulfilled,(state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.data = {};
            state.role = "";
        })
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            if(!action?.payload?.user) return;
            localStorage.setItem("data",JSON.stringify(action?.payload?.data?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.data?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.data?.user;
            state.role = action?.payload?.data.user?.role;
        })
    }
});

export const { } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = authSlice.caseReducers; 

