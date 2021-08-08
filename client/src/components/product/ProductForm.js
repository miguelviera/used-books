import React from 'react'

const ProductForm = ({values, clickSubmit, handleChange, categories}) =>{

  return (<div className="card-body">
          <form onSubmit={clickSubmit}>
            <div className="form-group">
              <input type="file" accept="image/*" className="form-control-file" placeholder="Select Picture" onChange={handleChange('image')} required />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" value={values.name} onChange={handleChange('name')} required />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Description" value={values.description} onChange={handleChange('description')} required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select className="form-control" name="category" value={values.category} onChange={handleChange('category')} required>
                {categories.map((category, i) => <option key={i} value={category}>{category}</option>)}
                <option value="notFound">Not found</option>
              </select>
            </div>
            {values.category==="notFound" && <div className="form-group">
              <input type="text" className="form-control" placeholder="New Category" value={values.new_category} onChange={handleChange('new_category')} required />
              <small id="emailHelp" className="form-text text-muted">Fill this field with new category if not found!</small>
            </div>}
            <div className="form-group">
              <input type="number" className="form-control" placeholder="Quantity" value={values.quantity} onChange={handleChange('quantity')} required />
            </div>
            <div className="form-group">
              <input type="number" className="form-control" min="0" placeholder="Price" value={values.price} onChange={handleChange('price')} required />
            </div>
            <hr />
            <button type="submit" className="btn btn-primary mb-2 pull-right">Submit</button>
          </form>
        </div>
  );
}

export default ProductForm;