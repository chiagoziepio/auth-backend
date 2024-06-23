const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../../model/schema/usersdb");
const bcrypt = require("bcryptjs")
require("dotenv").config()
router.post("/:resetToken", async(req,res)=>{
    const {resetToken} = req.params
    const { password } = req.body
    if(!resetToken) return res.status(403).json({msg: "no reset token"})

    try{
       const decoded = jwt.verify(resetToken,process.env.SECRET_KEY);
        const id = decoded.id;
        const hashedPwd = await bcrypt.hash(password, 10)
        await userModel.findByIdAndUpdate({_id:id},{password: hashedPwd});
        res.status(200).json({msg: "password resetted"})
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "invalid token"})
    }


})

module.exports = router