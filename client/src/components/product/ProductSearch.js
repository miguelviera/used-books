import React, {useState, useEffect} from 'react'
import { list} from '../../apis/product'
import {listCategories} from '../../apis/product'
import Card from '../cart/Card'

import auth from '../../auth/auth-helper'


const ProductSearch = () =>{
  const [products, setProducts] = useState([])
  const [itemNotFound, setItemNotFound] = useState(false)
  const [categories, setCategories] = useState([])
  const [values, setValues] = useState({
    category: 'All',
    active: true,
    search: ''
  })

  useEffect(() => {
    listCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(['All', ...data])
      }
    })
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    list(values).then((data) => { 
      if (data.error) 
        console.log(data.error)
      else{
        setProducts(data)
        setItemNotFound(data.length === 0)
      }
    })
  }

  const handleChange = name => event => {
    event.preventDefault()
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values,  [name]: value })
    setItemNotFound(false)
  }

  return (
    <div>
      <div className="ProductSearch card" style={{marginBottom: "1em"}}>
        <div className="card-body">
            <form className="form-inline d-flex justify-content-center" role="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="filter-col mr-sm-2" htmlFor="category">Category</label>
                    <select id="category" className="form-control mr-sm-2" 
                        value={values.category}
                        onChange={handleChange('category')}>
                          {categories.map((category, i) => <option key={i}>{category}</option>)}
                    </select>                                
                </div> 
                <div className="form-group">
                    <input type="text" className="form-control input-sm mr-sm-2"
                      value={values.search} 
                      onChange={handleChange('search')}
                    placeholder="Search for Product Name" id="pref-search" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success mr-sm-2">SEARCH</button>
                </div>
            </form>
        </div>
      </div>
      {products.length===0&&values.category==="All"?
          <div className="col-md-12">
            Please, make your search
        </div>: ""
        }
        {itemNotFound&&values.category!=="All"?
          <div className="col-md-12">
            No items found
        </div>: ""
        }
      <ProductList products={products} />
    </div>
  );
}

const ProductList = ({products}) =>{
 
  return (
    <div className="ProductList">
      <div className="row">
        {
          products
            .filter(product => product.createdBy!=(auth.isAuthenticated()?auth.isAuthenticated().user._id:""))
            .map((product, i) => <div className="col-md-3" style={{marginBottom: "0.5em"}} key={i}>
            <Card product={product} />
            {/* {(auth.isAuthenticated() && product.createdBy!=auth.isAuthenticated().user._id) && <Card product={product} />} */}
          </div>)
        }
      </div> 
    </div>
  );
}

export default ProductSearch;
