import { createSlice } from "@reduxjs/toolkit";
import axiosEcommerce, { getConfig } from "../../utils/configAxios";

const initialState = {
    products: [], /*solo llega al estado lo agregado al carrito, ahora toca renderizar*/
    error:false
}

const cartSlice = createSlice({
    name: "cart",
    initialState, /*aqui se pone de esta forma porque la ecuacion es igual a lo mismo*/
    reducers: {
        setProductsCartGlobal: (state, action) => {
            return {...state, products: action.payload}/*al estado que ya estaba se le 
            aumenta el action.payload desde aqui se va hasta la variable objeto vacio*/
        },
        setChangeErrorStatus: (state) => !state
    }
})

export const {setProductsCartGlobal, setChangeErrorStatus} = cartSlice.actions /*aqui desestr el set*/

export const getAllCartProducts = () => (dispatch) => {
    axiosEcommerce.get("/cart", getConfig())
        .then((res) => dispatch(setProductsCartGlobal(res.data)))
        .catch((err) => console.log(err))
        /*desde aqui se va a mostrarse renderizado en el Cart*/
}

export const addProductCart = (data ) => (dispatch) => {
    axiosEcommerce.post("/cart", data, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => {
        console.log(err)
        console.log(err.response.data.error)
    })
    /*se agrega en el carrito desde el boton carrito en el ProductCard, 
    Solo hace! la accion de agregar unidades al carro, la parte de visualizacion
    en el objeto products lo hace con getAllCartProducts*/
}

export const deleteProductCart = (id ) => (dispatch) => {
    axiosEcommerce.delete(`/cart/${id}`, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err))
}

export const updateProductCart = (id, data ) => (dispatch) => {
    axiosEcommerce.put(`/cart/${id}`, data, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err))
    /*data es la nueva cantidad que se actualizo*/
}

export const purchaseCart = () => (dispatch) => {
    axiosEcommerce.post("/purchases", {}, getConfig())/*aqui lleva un objeto vacio por regla de react, el 3ro debe de ser getConfig*/
    .then((res) => dispatch(setProductsCartGlobal([])))/*aqui vacio totalmente el carro porque he comprado, fin del carrito*/
    .catch((err) => console.log(err))
}

/*en la 2da funcion siempre va dispatch*/

export default cartSlice.reducer