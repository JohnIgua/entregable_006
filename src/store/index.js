import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo.slices";
import cart from "./slices/cart.slice";


export default configureStore({
    reducer: {
        userInfo,
        cart,
    }
})