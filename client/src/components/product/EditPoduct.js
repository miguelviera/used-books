import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { read, update, listCategories } from '../../apis/product'
import ProductForm from './ProductForm'
import auth from '../../auth/auth-helper'

import './EditPoduct.css';

const EditPoduct = () => {
  const jwt = auth.isAuthenticated()
  let history = useHistory();
  let { id } = useParams();
  const [categories, setCategories] = useState([])
  const [values, setValues] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
    quantity: '',
    price: '',
    createdBy: '121212',
    redirect: false,
    error: ''
  })

  useEffect(() => {
    read(id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log('created ' + JSON.stringify(data))
        setValues(data)
      }
    })
    listCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
  }, [id])

  const clickSubmit = (e) => {

    e.preventDefault()

    let productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.image && productData.append('image', values.image)
    values.category && productData.append('category', values.category)
    values.quantity && productData.append('quantity', values.quantity)
    values.price && productData.append('price', values.price)
    values.createdBy && productData.append('createdBy', values.createdBy)

    update(id, productData, {t: jwt.token}).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        history.push("/products");
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({ ...values, [name]: value })
  }

  return (
    <div className="NewProduct card " style={{ width: "30em" }}>
      <div className="card-header">
        Edit Product Information
        </div>
      <div className="card-body">
        <ProductForm values={values} handleChange={handleChange} clickSubmit={clickSubmit} categories={categories} />
      </div>
    </div>

  );
}

export default EditPoduct;