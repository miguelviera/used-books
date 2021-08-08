const express = require('express')
const productCtrl = require('../controllers/product.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/products/categories')
  .get(productCtrl.listCategories)

router.route('/api/products')
  .get(productCtrl.list)

router.route('/api/products')
  .post(productCtrl.create)

router.route('/api/products/:productId')
  .put(authCtrl.requireSignin, productCtrl.update)

router.route('/api/products/:productId')
  .get(productCtrl.read)

router.route('/api/products/:productId')
  .delete(authCtrl.requireSignin, productCtrl.remove)

router.route('/api/product/image/:productId')
  .get(productCtrl.photo, productCtrl.defaultPhoto)
router.route('/api/product/defaultphoto')
  .get(productCtrl.defaultPhoto)

router.param('productId', productCtrl.productByID)

module.exports = router