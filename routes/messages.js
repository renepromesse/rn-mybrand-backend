const router = require('express').Router();
const message= require('../model/contact');
const tokenVerify= require('../tokenValidation/index');

router.get('/messages', tokenVerify ,(req,res) =>{
     message.find()
    .then((data) =>res.send(data) );
});

module.exports= router;