import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { listByUser, remove } from '../../apis/order'
import auth from '../../auth/auth-helper'
import './Orders.css';

const Orders = () =>{
  const [orders, setOrders] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    loadOrders()
  }, [])

  const handleRemove = (orderId) => {
    remove(orderId, {t: jwt.token}).then((data) => {
      if (data.error) 
        console.log(data.error)
      loadOrders()
    })
  }

  const loadOrders = () => {
    listByUser({
      userId: auth.isAuthenticated().user._id
    }, {t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOrders(data)
      }
    })
  }

  return (
      <table className="Orders table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Products</th>
            <th scope="col">Total</th>
            <th scope="col">Created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>
                        {order.products.map((item, i) => <li key={i} style={{listStyle: 'none'}}>
                          <Link to={`/products/${item.product._id}`}><h3 key={item._id}>{item.product.name} - Qt: {item.quantity}</h3><i className="far fa-trash-alt"></i></Link>
                        </li>)}
                      </td>
                      <th scope="row">{order.total}</th>
                      <td>{new Date(order.created).toDateString()}</td>
                      <td>
                        <button type="button" className="btn btn-danger" onClick={() => handleRemove(order._id)}>Remove<i className="far fa-trash-alt"></i></button>
                      </td>
                    </tr>
          )}
        </tbody>
      </table>
  );
}

export default Orders;
