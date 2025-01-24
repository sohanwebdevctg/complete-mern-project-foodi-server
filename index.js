require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

const menuRouter = require('./api/routers/menuRouters')
app.use('/menu', menuRouter)


// database connection
mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.hoynchx.mongodb.net/foodiDB`).then(
  console.log('success connection database')
).catch((error) => {
  err => console.log(error)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})