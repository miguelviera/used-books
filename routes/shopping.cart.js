const express = require('express')
const cartCtrl = require('../controllers/cart.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/cart/:userId/:productId')
  .post(authCtrl.requireSignin, cartCtrl.create)

router.route('/api/cart/:userId')
  .get(cartCtrl.listByUser)

router.route('/api/cart/:cartItem')
  .delete(authCtrl.requireSignin, cartCtrl.remove)

router.route('/api/cart/:userId/clearCart')
  .delete(authCtrl.requireSignin, cartCtrl.clearCart)

router.route('/api/cart/:cartItem/:quantity')
  .put(cartCtrl.update)  

router.param('cartItem', cartCtrl.cartItemByID)
router.param('userId', cartCtrl.userByID)

module.exports = router