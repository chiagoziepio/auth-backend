const bcrypt =require("bcryptjs")
const userModel = require("../model/schema/usersdb")
const handleGtAllUser = (async(req, res)=>{
    res.send("we are here")
    
 })

 const handlePostNewUser = (async(req, res)=>{
   const {username,email,password} = req.body
   console.log(req.body)
   if(!username || !email || !password) return res.status(400).json({msg: "all field should be filled"})
   const alreadyExistedUser = userModel.findOne({username})
   if(alreadyExistedUser) return res.status(400).json({msg:"username or email already existed"})
      try{

            const hashedPwd = await bcrypt.hash(password,10)
            const newUser  = new userModel( {
               username,
               email,
               password : hashedPwd
            })
             newUser.save()
            res.status(201).json({msg: "Account successfully created"})
   }catch(err){
      console.log(err);
      res.status(500).json({msg:"error processing your request"})
   }
  
 })


 module.exports = {handleGtAllUser,handlePostNewUser}