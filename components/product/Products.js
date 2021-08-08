import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {list, remove} from '../../apis/product'

import auth from '../../auth/auth-helper'

import { baseUrl } from '../../client/src/apis/config'

import './Products.css';

const Products = () =>{
  const [products, setProducts] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    loadProducts()
  }, [])

  const handleRemove = (productId) => {
    remove(productId, {t: jwt.token}).then((data) => {
      loadProducts()
    })
  }

  const loadProducts = () => {
    list({
      createdBy: auth.isAuthenticated().user._id
    }).then((data)=>{
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  return (
      <table className="Products table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pricture</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td><img style={{width: '4em'}} src={`${baseUrl}/api/product/image/${product._id}`} className="card-img-top" alt="..." /> </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>
                        <Link type="button" className="btn btn-success mr-sm-2" to={`/products/edit/${product._id}`}>Edit<i className="far fa-trash-alt"></i></Link>
                          <button type="button" className="btn btn-danger" onClick={() => handleRemove(product._id)}>Remove<i className="far fa-trash-alt"></i></button>
                      </td>
                    </tr>
          )}
        </tbody>
      </table>
  );
}

export default Products;
