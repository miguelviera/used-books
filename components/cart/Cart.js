import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import {create} from '../../apis/order'
import auth from '../../auth/auth-helper'
import {update, listByUser, remove, clearCart} from '../../apis/cart'

import './Cart.css';

import {useAppContext} from '../../Context'

import { baseUrl } from '../../client/src/apis/config'

const Cart = () => {
const { itemTotal, setItemTotal } = useAppContext();
const jwt = auth.isAuthenticated()
let history = useHistory();
const [cartItems, setCartItems] = useState([])
const [checkout, setCheckout] = useState(true)

useEffect(() => {
    loadCartItems()
}, [])

const loadCartItems = () => {
    listByUser(auth.isAuthenticated().user._id, {t: jwt.token}).then((data) => {
        setCartItems(data)
        setCheckout(data.length > 0)
    })
}

const handleSubmit  = setItemTotal => event => {
    event.preventDefault()

    create(auth.isAuthenticated().user._id, {
        t: jwt.token
        }, cartItems, getTotal()).then((data) => {
            if (data.error) 
                console.log(data.error)
            clearCart({
                t: jwt.token
                }).then((data) => {
                setItemTotal(0)
                history.push("/");
            })
    })
    
}

const handleChange = index => event => {
    let quantity = event.target.value
    let newCartItems = cartItems.map(item => item)
    newCartItems[index].quantity = quantity
    setCartItems(newCartItems)
    update(newCartItems[index]._id, quantity, {
        t: jwt.token
        }).then((data) => {
        // console.log('updated')
    })
}

const getTotal = () => {
    let total = 0
    for (let i = 0; i < cartItems.length; i++) 
        total += cartItems[i].quantity * cartItems[i].product.price
    return total
}   

const removeItem = (cartId) => event =>{
    remove(cartId, {
        t: jwt.token
        }).then((data) => {
        loadCartItems()
        setItemTotal(itemTotal-1)
    })
}

return (
    <div className="Card card col-md-12 col-lg-6">
        <div className="col-sm-12">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th className="text-center">Actions</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((element, i) => <tr key={i}>
                        <td className="col-sm-12">
                            <div className="media">
                                <Link className="thumbnail pull-left" to={`/products/${element.product._id}`} > <img className="media-object" alt=""
                                    src={`${baseUrl}/api/product/image/${element.product._id}`}
                                    style={{ width: "72px", height: "72px" }} /> </Link>
                                <div className="media-body">
                                    <h4 className="media-heading"><a href="#"></a></h4>
                                    <span>Status: </span><span className="text-warning"><strong>In Stock</strong></span>
                                </div>
                            </div>
                        </td>
                        <td className="col-md-1 text-left"><strong className="label label-danger">{element.product.name}</strong></td>
                        <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                            <input type="number" className="form-control" min="1" max={element.product.quantity} value={element.quantity} onChange={handleChange(i)}/>
                        </td>
                        <td className="col-sm-1 col-md-1 text-center"><strong>{element.product.price}</strong></td>
                        <td className="col-sm-1 col-md-1 text-center"><strong>{element.product.price * element.quantity}</strong></td>
                        <td className="col-sm-1 col-md-1">
                            <button type="button" className="btn btn-danger" onClick={removeItem(element._id, setItemTotal)}> 
                                Remove
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>

            {checkout && <div className="pull-right">
                <h3>Total</h3>
                <h3><strong>{}</strong></h3>
                <h3><strong>{getTotal()}</strong></h3>
                <button type="button" className="btn btn-success" onClick={handleSubmit(setItemTotal)}>
                    Checkout <span className="fa fa-play"></span>
                </button>
                <br />
                <br />
            </div> }
            
        </div>
    </div>
);
}

export default Cart;
