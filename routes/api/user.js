 const express = require("express");
 const router = express.Router()
 const {handleGtAllUser,handlePostNewUser} = require("../../controllers/userController")

 router.get("/", handleGtAllUser);

 router.post("/",handlePostNewUser)

 module.exports = router