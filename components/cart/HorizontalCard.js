import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './cart/AddToCartButton'

import { baseUrl } from '../../client/src/apis/config'


const HorizontalCard = ({product}) =>{

    return (
        <div className="HorizontalCard card sm-12" style={{marginBottom: "0.5em"}} key={product._id}>
            <div className="row no-gutters">
                
                <div className="col-sm-12 col-md-4">
                <Link to={`/products/${product._id}`} >
                    <img src={`${baseUrl}/api/product/image/${product._id}`} style={{height: "100%", width: "100%"}} className="card-img" alt="..." />
                </Link>
                </div>
                <div className="col-sm-12 col-md-8">
                <div className="card-body">
                    <h5 className="card-title d-inline">{product.name}</h5>
                    <p className="card-text d-inline float-right">${product.price}</p>
                    <p className="card-text"><small className="text-muted">Added on {new Date(product.created).toDateString()}</small></p>
                    <AddToCartButton item={product} />
                </div>
                </div>
            </div>
        </div>
    );
}      
export default HorizontalCard;
