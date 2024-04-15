import {configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import courseSlice from "./Slices/courseSlice";

const Store= configureStore ({
    reducer:{
        auth:AuthSlice,
        course:courseSlice,
    },
    devTools:true,
});

export default Store;