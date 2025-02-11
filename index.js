require('dotenv').config() // dotenv configuration
const express = require('express') // express 
const app = express() // app instance
const cors = require('cors') // cors configuration
const port = process.env.PORT || 5000 //port is here
const database = require('./api/db/connection')

// middle ware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is Foodi-Server project')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})