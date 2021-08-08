const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  quantity: Number,
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'}
})
const CartItem = mongoose.model('CartItem', CartItemSchema)

const OrderSchema = new mongoose.Schema({
  products: [CartItemSchema],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  total: Number
})
const Order = mongoose.model('Order', OrderSchema)

module.exports = {Order, CartItem}