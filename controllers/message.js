const Message= require('../model/contact');

//a callback to retrieve data saved messages

exports.viewMessages = function (req,res){
    Message.find()
   .then((data) =>res.send(data) );
}