import React from 'react'
import { Link } from 'react-router-dom'

import { baseUrl } from '../../apis/config'

import AddToCartButton from '../cart/AddToCartButton'
import auth from '../../auth/auth-helper'

const Card = ({product}) =>{

  return (
      <div className="VerticalCard card">
        <Link to={`/products/${product._id}`}>
          <img src={`${baseUrl}/api/product/image/${product._id}`} style={{height: "100%", width: "100%"}} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="card-title d-inline">{product.name}</h5>
          <p className="card-text d-inline float-right">${product.price}</p>
          <br />
          <br />
          {auth.isAuthenticated() && product.owner!=auth.isAuthenticated().user._id && <AddToCartButton item={product} />}
        </div>
      </div> 
    );
}      

export default Card;
