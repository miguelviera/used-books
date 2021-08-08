const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "MarketPlaceAppSecretKey",
    mongoUri: process.env.MONGODB_URI ||
      process.env.MONGO_HOST ||
      'mongodb+srv://admin:admin@cluster0.eaqf7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  }
  
  module.exports = config
  
  