const express = require('express')
const orderCtrl = require('../controllers/order.controller')
const productCtrl = require('../controllers/product.controller')
const authCtrl = require('../controllers/auth.controller')
const userCtrl = require('../controllers/user.controller')

const router = express.Router()

router.route('/api/orders')
  .post(orderCtrl.create)

router.route('/api/orders/user/:userId')
  .get(authCtrl.requireSignin, orderCtrl.listByUser)

router.route('/api/order/:orderId')
  .delete(authCtrl.requireSignin, orderCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('productId', productCtrl.productByID)
router.param('orderId', orderCtrl.orderByID)

module.exports = router