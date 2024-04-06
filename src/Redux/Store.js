import {configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";

const Store= configureStore ({
    reducer:{
        auth:AuthSlice,
    },
    devTools:true,
});

export default Store;