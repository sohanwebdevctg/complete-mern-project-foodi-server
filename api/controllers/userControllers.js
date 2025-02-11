
// user register router data
const userRegister = async (req, res) => {
  const data = req.body;
  res.send(data)
}

// user login router data
const userLogin = async (req, res) => {
  const data = req.body;
  res.send(data)
}

module.exports = {userRegister, userLogin}