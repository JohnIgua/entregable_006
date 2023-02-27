import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setProductsCartGlobal } from "./cart.slice";

const initialState = {
            user: {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            createdAt: "",
            updatedAt: ""
        },
        token: "",
    }


const userInfoslices = createSlice({
    name: "userInfo",
    initialState: localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) 
    : initialState,
    reducers: {
        setUserInfoGlobal: (state, action) => {
            return action.payload;
        }
    }
})

export const {setUserInfoGlobal} = userInfoslices.actions;

export const loginUser = (data) => (dispatch) => {
    const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/users/login"
    axios
    .post(URL, data)
    .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data))/*aqui fue el error*/
        dispatch(setUserInfoGlobal(res.data))
    })
    .catch((err) => console.log(err))
}

export const userLogOut = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch(setUserInfoGlobal(initialState))
    /*aqui en esta linea vamos a desloguear dispatch(setPro) */
    dispatch(setProductsCartGlobal([]))
    /*vacear el estado*/
}

export default userInfoslices.reducer