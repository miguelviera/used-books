import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {read} from '../../apis/product'
import AddToCartButton from '../cart/AddToCartButton'

const VerticalCard = ({id}) =>{
    const [product, setProduct] = useState({});

    useEffect(() => {
        read(id).then((data)=>{
          if (data.error) {
              console.log(data.error)
          } else {
              setProduct(data)
          }
        })
      }, [id])
    
    return (
        <div className="VerticalCard card" style={{width: "20em"}}>
            <Link to={`/products/${product._id}`} >
                {product._id?
                    <img src={`http://localhost:3000/api/product/image/${product._id}`} style={{height: "100%", width: "100%"}} className="card-img-top" alt="..." />:
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                }
            </Link>
            <div className="card-body">
            <p className="card-text">Category: {product.category}</p>
            <p className="card-text">{ product.quantity>0 ? 'In Stock' : 'Out of Stock'}</p>
            <h5 className="card-title d-inline">{product.name}</h5>
            <p className="card-text d-inline float-right">${product.price}</p>
            <p className="card-text">{product.description}</p>
                <AddToCartButton item={product} />
            </div>
        </div> 
    );
}      
export default VerticalCard;
