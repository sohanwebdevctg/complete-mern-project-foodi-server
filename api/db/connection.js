require('dotenv').config()

// database connection link
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.hoynchx.mongodb.net/`

// database connection function
const database = async () => {
  const dataLink = await mongoose.connect(url)
  return dataLink;
}

module.exports = database;