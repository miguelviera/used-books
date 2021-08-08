import React, {useState, useEffect} from 'react'
import {create} from '../../apis/product'

import {Redirect} from 'react-router-dom'
import auth from '../../auth/auth-helper'
import ProductForm from './ProductForm'
import {listCategories} from '../../apis/product'

import './NewPoduct.css';

const NewPoduct = () =>{
  const jwt = auth.isAuthenticated()
  const [categories, setCategories] = useState([])
  const [values, setValues] = useState({
      name: '',
      description: '',
      image: '',
      category: '',
      quantity: '',
      price: '',
      new_category: '',
      createdBy: auth.isAuthenticated().user._id,
      redirect: false,
      error: ''
  })

  const [new_category, setNewCategory] = useState({
      new_category: '',
      value: ''
  })

  useEffect(() => {
    listCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        if(data.length === 0) // If not categorties found
          setValues({...values,  category: 'notFound' })
        setCategories(data)
      }
    })
  }, [])
  
  
  const clickSubmit = (e) => {
    e.preventDefault()

    let productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.image && productData.append('image', values.image)
    values.category && productData.append('category', values.category==="notFound"?values.new_category:values.category)
    values.quantity && productData.append('quantity', values.quantity)
    values.price && productData.append('price', values.price)
    values.createdBy && productData.append('createdBy', values.createdBy)

    create({
      t: jwt.token
    }, productData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirect: true})
      }
    })
  }

  if (values.redirect) {
    return (<Redirect to={'/products'}/>)
  }

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values,  [name]: value })
  }

  return (
    <div className="NewProduct card " style={{width: "30em"}}>
      <div className="card-header">
        New Product Information
      </div>
      
      <div className="card-body">
        <ProductForm values={values} handleChange={handleChange} clickSubmit={clickSubmit} categories={categories}/>
      </div>
    </div>

  );
}

export default NewPoduct;