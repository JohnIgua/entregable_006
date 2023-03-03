import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/Home/ProductCard'
import axiosEcommerce from '../utils/configAxios'
import "./styles/Product.css"

const arrayClassesSlider = ["first", "second", "third"]

const Product = () => {
  const [product, setProducts] = useState()
  const [quantity, setQuantity] = useState(1)
  const handlePlus = () => setQuantity(quantity+1)
  const [similarProducts, setSimilarProducts] = useState([])
  const [indexSlider, setIndexSlider] = useState(0)

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

  const handleClickNext = () => {
    const newIndexSlider = indexSlider+1
    const lastPosition = arrayClassesSlider.length-1
    if(newIndexSlider > lastPosition ){
      setIndexSlider(0)
    }else{
      setIndexSlider(newIndexSlider)
    }
  }

  const handleClickPrevious = () => {
    const newIndexSlider = indexSlider-1
    const lastPosition = arrayClassesSlider.length-1
    if(newIndexSlider<0){
      setIndexSlider(0)
    }else{
      setIndexSlider(newIndexSlider)
    }
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
    <main className='product'>
      <section className='product_detail'>
          <section className='product_slider'>
              <section className={`product_detail_imgContainer ${arrayClassesSlider[indexSlider]}`}>
                <div className='product_detail_img'>
                  <img src={product?.images[0].url} alt="" />
                </div>
                <div className='product_detail_img'>
                  <img src={product?.images[1].url} alt="" />
                </div>
                <div className='product_detail_img'>
                  <img src={product?.images[2].url} alt="" />
                </div>
              </section>
                  <div onClick={handleClickPrevious} className='product_btnLeft'>
                    <i className='bx bx-chevron-left' ></i>
                  </div>
                  <div onClick={handleClickNext} className='product_btnRigth'>
                    <i className='bx bx-chevron-right'></i>
                  </div>
          </section>
        <section className='product_detail_infoContainer'>
          <h4 className='product_detail_brand'>{product?.brand}</h4>
          <h3 className='product_detail_title'>{product?.title}</h3>
          <div className='product_detail_quantityContainer'>
            <div className='product_detail_priceContainer'>
              <h4 className='product_detail_priceTitle'>Price</h4>
              <h3 className='product_detail_price'>{product?.price}</h3>
            </div>
            <div className='product_detail_quantity'>
              <h4 className='product_detail_quantityTitle'>Quantity</h4>
              <div className='product_detail_counter'>
                <button onClick={handlLess}>-</button>
                <h4>{quantity}</h4>
                <button onClick={handlePlus}>+</button>
              </div>
            </div>
          </div>
          <button className='product_detail_btn' onClick={handleClickAddProduct}>
            Add to cart <i className='bx bx-cart'></i>
          </button>
          <p className='product_detail_text'>
              {product?.description}
          </p>
        </section>
      </section>

      <h2 className='product_title_similar'>Discover similar items</h2>

      <section className='product_similarContainer'>
        {similarProducts.map((product) => (<ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default Product