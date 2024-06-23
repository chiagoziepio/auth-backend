const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userModel = require("../../model/schema/usersdb")

router.get("/", async(req,res)=>{
    console.log("from api/auth/status i.e the passport status ");
    const token = req.cookies.token;
    try {
        if(!token) return res.status(401).json({msg:"token needed for authorization"})
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        console.log(decoded);
        const username = decoded.username
        const findUser = await userModel.findOne({username});
        if(!findUser) return res.status(401).json({msg:"username not valid"})
        console.log(findUser);
        const neededUserDetail = [{username: findUser.username, email: findUser.email, id: findUser._id}];
        res.status(200).json({user: neededUserDetail})
        
    } catch (error) {

        console.log(`error from verify:${error}`);
        res.status(401).json({msg:error})
    }





    /* console.log(req.user);
    if(!req.user) return res.status(401).json({msg: "not logged in"})
    const verifiedUser = {
        username: req.user.username,
        email: req.user.email
    }
     res.status(200).json({user: verifiedUser}) */
});

module.exports = router