import React from 'react'
import { useParams} from 'react-router-dom'
import './Product.css';
import VerticalCard from '../cart/VerticalCard'


const Product = () =>{
  let { id } = useParams();
  return (
    <div className="Product">
      <VerticalCard id={id} />
    </div>
);
}

export default Product;