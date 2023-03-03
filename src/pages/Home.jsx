import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/Home/ProductCard'
import axiosEcommerce from '../utils/configAxios'
import "./styles/Home.css"

const Home = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [nameFilter, setNameFilter] = useState("")
    const [filterProducts, setfilterProducts] = useState([])
    const [categoryFilter, setCategoryFilter] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameProduct = e.target.nameProduct.value
        setNameFilter(nameProduct)
    }

    useEffect(() => {
        const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/products"
        axios.get(URL)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
      axiosEcommerce.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
      const newProductsByName = products.filter(product => product.title.toLowerCase().includes(nameFilter.toLowerCase()))
        if(categoryFilter){
            const newProductByCategory = newProductsByName.filter(product => product.categoryId === categoryFilter)
            setfilterProducts(newProductByCategory)
        }else{
            setfilterProducts(newProductsByName)
        }        
    }, [nameFilter, products, categoryFilter])/*cada vez que cambie nameFilter, se aplique el efecto*/
    
    

  return (
    <main className='home'>
        <form className='searchAndListCategories' onSubmit={handleSubmit}>
            <div>
                <input id="nameProduct" type="text" />
                <button><i className='bx bx-search'></i></button>
            </div>
            <div>
                <h3>Categories</h3>
                <ul className='categories'>
                    <li onClick={() => setCategoryFilter(0)}>All</li>
                    {categories.map((category) => (
                    <li
                     onClick={() => setCategoryFilter(category.id)} key={category.id}>{category.name}</li>))}
                </ul>
            </div>
        </form>
        <section className='home_listProducts'>
            {
                filterProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </section>

    </main>
  )
}

export default Home