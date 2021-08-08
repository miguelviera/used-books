const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    required: "Quantity is required"
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  createdBy: {
    type: String,
    required: "CreatedBy is required"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', ProductSchema)