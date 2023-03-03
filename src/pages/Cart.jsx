import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/Cart/CartProduct'
import { getAllCartProducts, purchaseCart } from '../store/slices/cart.slice'
import "./styles/Cart.css"

const Cart = () => {
  const { products } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  const totalPriceCart = products.reduce((total, product) => total + (product.quantity * product.product.price),0)

  const handlePurchasesCart = () => {
    dispatch(purchaseCart())
  }

useEffect(() => {
  dispatch(getAllCartProducts())
}, [])

  return (
    <main>
      <section className='listInCart'>
        {
          products.map((product) => <CartProduct key={product.id} product={product} />)}
      </section>
      <hr />
      <section className='containFoot'>
        <div className='parrafoInicial'>
          <h3 className='totalText'>Total: </h3>
          <h3>${totalPriceCart}</h3>
        </div>
        <button className='allBuy' onClick={handlePurchasesCart}>Checkout</button>
      </section>
    </main>
  )
}

export default Cart