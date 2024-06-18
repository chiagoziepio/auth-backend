const passport = require("passport")
const { Strategy } = require("passport-local")
const userModel = require("../model/schema/usersdb");
const bcrypt = require("bcryptjs");

passport.serializeUser((user,done)=>{
    console.log("serializing user");
    done(null, user._id)
});

passport.deserializeUser(async(_id,done)=>{
    console.log("deserializing user");
    try {
        const findUser = await userModel.findById(_id);
        if(!findUser) return res.status(404).json({msg: `${username} is not registered`});
        done(null, findUser)
    } catch (error) {
        console.log(error);
        done(error, null)
    }
})

const passportUse = passport.use(
    new Strategy(async(username, password, done)=>{
        console.log(username);
        console.log(password);
        try{
            const findUser = await userModel.findOne({username});
            if(!findUser) throw new Error("user not found")
            const checkedPwd = await bcrypt.compare(password, findUser.password);
            if(!checkedPwd) throw new Error("username or password wrong");;
            done(null, findUser)
            
        }catch(error){
            console.log(error);
            done(error, null)
        }

    })
)

module.exports = passportUse