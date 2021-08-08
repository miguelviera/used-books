import React, {useState, useEffect} from 'react'
import { useAppContext } from '../../Context'
import {create, listByUser, update} from '../../apis/cart'
import auth from '../../auth/auth-helper'

export default function AddToCartButton({item}) {
  const jwt = auth.isAuthenticated()
  const { itemTotal, setItemTotal } = useAppContext();
  const [cartItems, setCartItems] = useState({})

  const addToCart = () => {
      create(item._id, {t: jwt.token}).then((data) => {
        setItemTotal(data.total)
      })
    }

  return (
    auth.isAuthenticated() && item.active==true && <button className="btn btn-primary float-right" onClick={addToCart}>Add to Card</button>
  )
}
