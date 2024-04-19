import {configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import courseSlice from "./Slices/courseSlice";
import paymentSlice from "./Slices/paymentSlice";
import lectureSlice from "./Slices/lectureSlice";
import statsSlice from "./Slices/statsSlice";

const Store= configureStore ({
    reducer:{
        auth:AuthSlice,
        course:courseSlice,
        payment:paymentSlice,
        lectures:lectureSlice,
        stats:statsSlice,
    },
    devTools:true,
});

export default Store;