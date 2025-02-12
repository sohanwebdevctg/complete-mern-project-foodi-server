const User = require("../models/User");

// user register router data
const userRegister = async (req, res) => {

  try{
    const data = req.body;
    const query = {email : data?.email}
    const findUser = await User.findOne(query);

    if(findUser){
      res.status(401).json({message : "User already registered."})
    }

    const createUser = await User.create({name : data?.name, email : data?.email, password : data?.password});

    if(createUser){
      res.status(200).json({message : "User created successfully."})
    }
  }catch(error){
    console.log(error.message)
  }

}

// user login router data
const userLogin = async (req, res) => {
  const data = req.body;
  res.send(data)
}

module.exports = {userRegister, userLogin}