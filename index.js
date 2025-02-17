require('dotenv').config() // dotenv configuration
const express = require('express') // express 
const app = express() // app instance
const cors = require('cors') // cors configuration
const port = process.env.PORT || 5000 //port is here
const database = require('./api/db/connection') // database connect function
const jwt = require('jsonwebtoken'); // jwt token
const cookieParser = require('cookie-parser') // cookie-parser

// middle ware
app.use(cors({
  origin : ['http://localhost:5173'],
  credentials : true
}))
app.use(express.json())
app.use(cookieParser())


// router connection
const userRouter = require('./api/routers/userRouter');

app.use('/api/v1/user', userRouter)

app.get('/', (req, res) => {
  res.send('This is Foodi-Server project')
})

// database connection function
database().then(() => {
  // database connection
  console.log('database connected')
  // listening on port
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((err) => {
  console.log(err.message)
})

