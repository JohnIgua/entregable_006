import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/Home/ProductCard'
import axiosEcommerce from '../utils/configAxios'

const Product = () => {
  const [product, setProducts] = useState()
  const [quantity, setQuantity] = useState(1)
  const handlePlus = () => setQuantity(quantity+1)
  const [similarProducts, setSimilarProducts] = useState([])

  const dispatch = useDispatch()

  const {id} = useParams()

  const handlLess = () => {
    const newQuantity = quantity-1
    if(newQuantity>=0){
      setQuantity(newQuantity)
    }
  }

  const handleClickAddProduct = () => {
     const data = {
        quantity,
        productId: product.id
    }
    dispatch(addProductCart(data))
  }
  
  useEffect(() => {
    const URL = `https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`
    axios.get(URL)
    .then((res) => setProducts(res.data))
    .catch((err) => console.log(err))
  }, [id])/*hace que un producto se vuelva primero en la fila*/

  useEffect(() => {
    if(product){/*nos aseguramos que tiene algo, porque el arreglo esta vacio*/
      axiosEcommerce.get(`/products?categoryId=${product?.categoryId}`)
      .then((res) => {
        const newSimilarProducts = res.data.filter(productByCategory => productByCategory.id != product.id)
        setSimilarProducts(newSimilarProducts)
      })
      .catch((err) => console.log(err))
    }
  }, [product])

  useEffect(() => {
    setQuantity(1)
  }, [id])
  

  return (
    <main>
      <section>
        <section>
          <div>
            <img src={product?.images[0].url} alt="" />
          </div>
        </section>
        <section>
          <h4>{product?.brand}</h4>
          <h3>{product?.title}</h3>
          <div>
            <div>
              <h4>Price</h4>
              <h3>{product?.price}</h3>
            </div>
            <div>
              <h4>Quantity</h4>
              <div>
                <button onClick={handlLess}>-</button>
                <h4>{quantity}</h4>
                <button onClick={handlePlus}>+</button>
              </div>
            </div>
          </div>
          <button onClick={handleClickAddProduct}>
            Add to cart <i className='bx bx-cart'></i>
          </button>
          <p>
              {product?.description}
          </p>
        </section>
      </section>

      <section>
        {similarProducts.map((product) => (<ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default Product