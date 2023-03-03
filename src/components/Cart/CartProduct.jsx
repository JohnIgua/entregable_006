import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductCart, updateProductCart } from '../../store/slices/cart.slice'
import "./styles/CartProduct.css"

const CartProduct = ({product}) => {

    const dispatch = useDispatch()

  const handleDeleteCartProduct = () => {
    dispatch(deleteProductCart(product.id))
  }

  const handleClickPlus = () => {
    const newQuantity = product.quantity+1
    const data = {
        quantity: newQuantity
    }
    dispatch(updateProductCart(product.id, data))
  }

  const handleClickLess = () => {
    const newQuantity = product.quantity-1
    if(newQuantity<=0){
        dispatch(deleteProductCart(product.id))
    }else{
        const data = {
            quantity: newQuantity
        }
        dispatch(updateProductCart(product.id, data))
    }
  }

  return (
    <article className='cartProductContainer'>              
              <div className='containerImg'>
                <img src={product.product.images[0].url} alt="" />
              </div>
              <section className='container'>
                    <section className='firstDivision'>
                      <h3>{product.product.title}</h3>
                      <div className='containerQuantity'>
                        <button className='less' onClick={handleClickLess}>-</button>
                        <h3>{product.quantity}</h3>
                        <button className='plus' onClick={handleClickPlus}>+</button>
                      </div>
                    </section>
                    <section className='secondDivision'>
                      <button className='btnDelete' onClick={handleDeleteCartProduct}>
                          <i className='bx bx-trash'></i>
                      </button>
                      <section className='containInferior'>
                          <h3>Total</h3>
                          <h3>$ {product.quantity * product.product.price}</h3>
                      </section>
                    </section>

              </section>
            </article>
  )
}

export default CartProduct