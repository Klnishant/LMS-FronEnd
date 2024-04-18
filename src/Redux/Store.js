import {configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import courseSlice from "./Slices/courseSlice";
import paymentSlice from "./Slices/paymentSlice";
import lectureSlice from "./Slices/lectureSlice";

const Store= configureStore ({
    reducer:{
        auth:AuthSlice,
        course:courseSlice,
        payment:paymentSlice,
        lectures:lectureSlice,
    },
    devTools:true,
});

export default Store;