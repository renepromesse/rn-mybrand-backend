const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name:{
        type: String,
        min: 3,
        max:60,
        required: true
    },
    email:{
        type:String,
        min:5,
        max: 60,
        required:true
    },
    comment:{
        type:String,
        min:2,
        max:200,
        required: true
    },
    articleId:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('comments', commentSchema);