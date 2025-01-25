require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

// middle ware
app.use(cors())
app.use(express.json())


// database connection
const dataBaseLink = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.hoynchx.mongodb.net/foodiDB`;

const dataBaseConnection = async () => {
  const db = await mongoose.connect(dataBaseLink);
  return db;
}


// all routes data here
const menuRoutes = require('./api/routers/menuRouters')
const userRouter = require('./api/routers/userRouter')
const cardRouter = require('./api/routers/cardRouter')

app.use('/menu', menuRoutes);
app.use('/user', userRouter);
app.use('/card', cardRouter);













app.get('/', (req, res) => {
  res.send('Hello World!')
})

// database connection & listening ports
dataBaseConnection().then(
  app.listen(port, () => {
    console.log('successfully listening database connection')
    console.log(`Example app listening on port ${port}`)
  })
).catch((error) => {
  console.log(error.message)
})


