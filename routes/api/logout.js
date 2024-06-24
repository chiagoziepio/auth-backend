const express = require("express")
const router = express.Router();

router.get("/", (req,res)=>{
    res.clearCookie('token')
    res.status(200).json({status:true,msg:"logged out"})
})

module.exports = router