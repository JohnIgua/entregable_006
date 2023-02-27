import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/Home/ProductCard'

const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/products"
        axios.get(URL)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err))
    }, [])

  return (
    <main>
        <section>
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </section>

    </main>
  )
}

export default Home