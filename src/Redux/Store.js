import {configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import courseSlice from "./Slices/courseSlice";
import paymentSlice from "./Slices/paymentSlice";

const Store= configureStore ({
    reducer:{
        auth:AuthSlice,
        course:courseSlice,
        payment:paymentSlice,
    },
    devTools:true,
});

export default Store;