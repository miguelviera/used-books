const { CartItem } = require('../models/order.model')
const User = require('../models/user.model')
const errorHandler = require('./../helpers/dbErrorHandler')

const create = async (req, res) => {
  // Create new cart item
  try {
    let cartItems = await CartItem.find({ "createdBy": req.params.userId })
      .sort('-created')
      .exec()
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i]
      if (item.product == req.params.productId) {
        item.quantity++
        await item.save()
        return res.status(200).json({
          total: cartItems.length
        })
      }
    }
    // Create new cart item
    const cartItem = new CartItem({
      product: req.params.productId,
      createdBy: req.params.userId,
      quantity: 1
    })
    await cartItem.save()
    res.status(201).json({
      total: cartItems.length + 1
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

const listByUser = async (req, res) => {
  try {
    let cartItems = await CartItem.find({ "createdBy": req.profile._id })
      .sort('-created')
      .populate({
        path: 'product',
        select: 'id name price quantity'
      })
      .exec()
    res.json(cartItems)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const cartItemByID = async (req, res, next, id) => {
  try {
    let cartItem = await CartItem.findById(id).exec()
    if (!cartItem)
      return res.status('400').json({
        error: "CartItem not found"
      })
    req.cartItem = cartItem
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let cartItem = req.cartItem
    let deletedCartItem = await cartItem.remove()
    res.json(deletedCartItem)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const clearCart = async (req, res) => {
  try {
    let result = await CartItem.deleteMany({ createdBy: req.profile._id })
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let cartItem = req.cartItem
    cartItem.quantity = req.params.quantity
    await cartItem.save()
    res.json(cartItem)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

module.exports = {
  create,
  userByID,
  listByUser,
  remove,
  cartItemByID,
  clearCart,
  update
}