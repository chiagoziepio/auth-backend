const passport = require("passport")
const { Strategy } = require("passport-local")
const userModel = require("../model/schema/usersdb")

const passportUse = passport.use(
    new Strategy(async(username, password, done)=>{
        console.log(username);
        console.log(password);
        try{
            const findUser = await userModel.findOne({username});
            
        }catch(err){

        }

    })
)