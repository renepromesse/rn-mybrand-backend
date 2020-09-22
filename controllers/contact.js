const Messages = require('../model/contact');
const { contactValidation } = require('../validation/contact');

//a callback to render a default value on get request

exports.defaultPage = function (req, res) {
    res.send("Welcome on contact Page");
}



//a callback to validate a message and save it
exports.sendMessage= function (req, res) {
     
    //validate req.body properties
    const {error} = contactValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);
    

    const msg= new Messages({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        read: false
    });
    try{
        msg.save();
        res.send({message:"The message sent successfully"});
    }catch(error){
        res.status(400).send(error);
    }
}