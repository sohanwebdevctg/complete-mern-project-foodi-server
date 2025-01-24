require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const menuRouters = require('./api/routers/menuRouters')
app.use('/menu', menuRouters)


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hoynchx.mongodb.net/foodiDB`).then(
  console.log('success database connection')
).catch((error) => {
  console.log(error.message)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})