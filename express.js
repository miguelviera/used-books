const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const orderRoutes = require('./routes/order.routes')
const authRoutes = require('./routes/auth.routes')
const cartRoutes = require('./routes/shopping.cart')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount routes
app.use('/', userRoutes)
app.use('/', productRoutes)
app.use('/', orderRoutes)
app.use('/', authRoutes)
app.use('/', cartRoutes)


// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
  })

module.exports = app