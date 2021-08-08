import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Header from './components/core/Header'
import Home from './components/core/Home'
import Profile from './components/user/Profile'
import EditProfile from './components/user/EditProfile'
import Cart from './components/cart/Cart'
import Orders from './components/order/Orders'
import Products from './components/product/Products'
import Product from './components/product/Product'
import NewPoduct from './components/product/NewPoduct'
import EditPoduct from './components/product/EditPoduct'
import Signin from './auth/Signin'
import Signup from './components/user/Signup'
import PrivateRoute from './auth/PrivateRoute'


function MainRouter () {
    return (
        <div className="Home">
            <Header />
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/used-books" component={Home}/>
                    <PrivateRoute exact path="/cart" component={Cart}/>
                    <Route exact path="/signin" component={Signin}/>
                    <Route exact path="/signup" component={Signup}/>
                    <PrivateRoute exact path="/profile" component={Profile}/>
                    <PrivateRoute exact path="/profile/edit" component={EditProfile}/>
                    <PrivateRoute exact path="/orders" component={Orders}/>
                    <PrivateRoute path="/products/new" component={NewPoduct}/>
                    <PrivateRoute exact path="/products/edit/:id" component={EditPoduct}/>
                    <Route exact path="/products/:id" component={Product}/>
                    <PrivateRoute exact path="/products" component={Products}/>
                </Switch>
            </div>
        </div>
    );
}

export default MainRouter ;