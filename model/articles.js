const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
        min:3
    },
    title:{
        type:String,
        required:true,
        min:3
    },
    content:{
        type: String,
        required:true,
        min:10,
        max:500
    },
    date:{
        type:Date,
        default:Date.now
    } 
});

module.exports= mongoose.model('articles', articleSchema);