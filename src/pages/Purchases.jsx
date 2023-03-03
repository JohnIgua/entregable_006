import React, { useEffect, useState } from 'react'
import PurchaseCard from '../components/Purchases/PurchaseCard'
import axiosEcommerce, { getConfig } from '../utils/configAxios'
import "./styles/Purchases.css"

const Purchases = () => {

  const [purchases, setPurchases] = useState([])
  
  useEffect(() => {
    
    axiosEcommerce.get("/purchases", getConfig())        
        .then((res) => setPurchases(res.data))
        .catch((err) => console.log(err))

  }, [])

    /*const URL = "https://e-commerce-api-v2.academlo.tech/api/v1/products"
        axios.get(URL)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err)) */  

  return (
    <main>
      <section>
        <h3 className='titlePurchases'>
          My Purchases
        </h3>
        <section className='purchases_listProducts'>
        {purchases.map((purchase) => (
                    <PurchaseCard key={purchase.id} purchase={purchase} />               
        ))}
        </section>
      </section>
    </main>
  )
}

export default Purchases