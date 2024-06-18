const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const passport = require("passport")
const cookieParser = require("cookie-parser")
const session = require("express-session")

//initialization and middlewares
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}))


const PORT = process.env.PORT  || 5050

// connection to database
mongoose.connect("mongodb://0.0.0.0/mern-users")
const connc = mongoose.connection
connc.once('open',()=>{
    console.log('connected to database');
});
connc.on('error',(err)=>{
    console.log(`database error:${err}`);
    process.exit()
})
app.use(cookieParser())
app.use(session({
    secret: "paddy naaa",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }

})) 
app.use(passport.initialize());
app.use(passport.session())
//routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/user/login", require("./routes/api/login"));
app.use("/api/user/resetpassword", require("./routes/api/forgotPwd"))

//start server
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})

