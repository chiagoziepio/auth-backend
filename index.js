const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")


//initialization and middlewares
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

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

//routes
app.use("/api/user", require("./routes/api/user"))

//start server
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})

