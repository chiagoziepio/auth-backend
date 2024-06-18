const express = require("express");
const router = express.Router()
const userModel = require("../../model/schema/usersdb")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
router.post("/",async(req,res)=>{
    const { email }  = req.body
    try {
        
            if(!email) return res.status(400).json({msg: "provide an email"})
        
            const findUser = await userModel.findOne({email});
            if(!findUser) return res.status(404).json({msg: "email is not registered"});
           const resetToken = jwt.sign({id:findUser._id}, process.env.SECRET_KEY, {expiresIn: "5m"})
           const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD
                }
              });
              
              const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Reset password link',
                text: `http://localhost:5173/resetpassword/${resetToken}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return res.status(400).json({msg:"request was not successful"})
                } else {
                    
                  console.log('Email sent: ' + info.response);
                  return res.status(200).json({msg:"resent mail sent to your email"})
                }
              });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

module.exports = router