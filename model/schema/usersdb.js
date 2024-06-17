const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    email:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password:{
        type: mongoose.Schema.Types.String,
        required: true,
        
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel