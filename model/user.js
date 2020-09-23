const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    
    email:{
        type: String,
        required:true,
        min:5,
        max:100
    },
    password:{
        type: String,
        required:true,
        min:4,
        max:300
    }
});


module.exports= mongoose.model('users', userSchema);