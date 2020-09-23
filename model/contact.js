const mongoose= require("mongoose");

const messageSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        min: 3,
        max: 50
    },
    email:{
        type: String,
        required:true,
        min:5,
        max:100
    },
    read:{
        type: Boolean,
        required:true
    },
    message:{
        type: String,
        required:true,
        min:2,
        max:300
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports= mongoose.model('messages', messageSchema);