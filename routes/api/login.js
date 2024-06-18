const express = require("express");
const passportUse = require("../../middleware/local-strategy")
const jwt = require("jsonwebtoken")
const router = express.Router()


router.post("/",passportUse.authenticate("local"),async(req,res)=>{
    console.log(`form auth:${req.user}`)

    const token = jwt.sign(
        {username: req.user.username},
        process.env.SECRET_KEY,
        {expiresIn : '30m'}
    );
    console.log(token);
   
    
    res.cookie("token", token,{httpOnly:true,maxAge: 1800000})
    console.log(req.sessionID);
     req.session.visited = true 
    return res.status(200).json({msg: "logged in successfully"})
   /* res.status(200).json({msg:"welcome"})*/
});

module.exports = router