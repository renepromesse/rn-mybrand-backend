const router = require('express').Router();
const message= require('../model/contact');
const { contactValidation } = require('../validation/contact');


router.post('/contact', async (req,res) =>{
    
    const {error} = contactValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);
    

    const msg= new message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        read: false
    });
    try{
        const savedMessage= await msg.save();
        res.send(savedMessage);
    }catch(error){
        res.status(400).send(error);
    }
})

module.exports= router;