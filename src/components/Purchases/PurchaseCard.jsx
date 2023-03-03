import React from 'react'
import "./styles/PurchaseCard.css"

const PurchaseCard = ({purchase}) => {

const formatDateDDMMYYYY  = (oldFormat) => {
  const newDate = new Date(oldFormat)
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }
  return newDate.toLocaleDateString("en-En", options)
}

  return (
              <article className='purchaseContainer'>
                  <div className='firstContent'>
                    <div className='purchaseCard_img'>
                      <img src={purchase.product.images[1].url} alt="" />
                    </div>
                    <h4>{purchase.product.title}</h4>
                  </div>
                  <div className='secondContent'> 
                    <h4>{formatDateDDMMYYYY(purchase.createdAt)}</h4>
                    <div>
                      <h4>Cantidad: {purchase.quantity}</h4>
                    </div>
                    <h4>Precio: $ {purchase.product.price}</h4>
                  </div>
              </article>
  )
}

export default PurchaseCard

//Aqui falta acomodar lo de la fecha