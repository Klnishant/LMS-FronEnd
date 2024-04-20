import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = ({
    key:"",
    subscription_id: "",
    isPaymentVerified:false,
    allPayments:{},
    finalMonth:{},
    monthlySalesRecord:[],
});

export const getRazorPayId = createAsyncThunk("/get/paymentId", async ()=>{
    try {
        const res = await axiosInstance.get("/payment/get/razor-pay-api-key");
        console.log(res);
        toast.success("Key get successfully");
    
        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const buySubscription = createAsyncThunk("/subscribe", async ()=> {
    try {
        const res = await axiosInstance.post("/payment/buy/subscription");
        console.log(res.data.data);
        toast.success("Purchase Subscription");

        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const verifySubscription = createAsyncThunk("/verify", async (data)=> {
    try {
        const res = await axiosInstance.post("/payment/verify/subscription",data);
        toast.success("Payment verified successfully")

        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const getAllPayment = createAsyncThunk("/get/all/payment", async ()=>{
    try {
        const res = await axiosInstance.get("/payment/get/all/payment?count=100");
        toast.success("Payment Details Fetched successfully");

        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
})

const paymentSlice = createSlice({
    name:"payment",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getRazorPayId.fulfilled,(state,action)=>{
            console.log(action.payload.data.razorpayApiKey);
            localStorage.setItem("key",action?.payload?.data?.razorpayApiKey)
            state.key=action?.payload?.data?.razorpayApiKey
        })
        .addCase(buySubscription.fulfilled,(state,action)=> {
            console.log(action.payload.data);
            state.subscription_id = action?.payload?.data
            console.log(state.subscription_id);
            localStorage.setItem("subscriptioId",action?.payload?.data?.allPayments);
        })
        .addCase(verifySubscription.fulfilled,(state,action)=> {
            console.log(action.payload);
            state.isPaymentVerified=true;
        })
        .addCase(getAllPayment.fulfilled,(state,action)=>{
            console.log(action);
            state.allPayments=action?.payload?.data;
            state.finalMonth=action?.payload?.finalMonth;
            state.monthlySalesRecord=action?.payload?.data?.monthlySale;
        })
    }
});

export default paymentSlice.reducer;