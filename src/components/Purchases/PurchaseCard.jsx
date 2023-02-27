import React from 'react'

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
    <article>
                  <div>
                    <div>
                      <img src={purchase.product.images[0].url} alt="" />
                    </div>
                    <h4>{purchase.product.title}</h4>
                  </div>
                  <div>
                    <h4>{formatDateDDMMYYYY(purchase.createdAt)}</h4>
                    <div>
                      <h4>{purchase.quantity}</h4>
                    </div>
                    <h4>$ {purchase.product.price}</h4>
                  </div>
                </article>
  )
}

export default PurchaseCard

//Aqui falta acomodar lo de la fecha