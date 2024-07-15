import React from 'react'
import { useParams } from 'react-router-dom'

function Restaurant() {
    const {restaurantId} = useParams()

    console.log(restaurantId, "check restaurantId")
  return (
    <div>Restaurant</div>
  )
}

export default Restaurant