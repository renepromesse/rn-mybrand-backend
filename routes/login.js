const router = require('express').Router();
const Users= require('../model/user');
const jwt= require('jsonwebtoken');
const {loginValidation} = require('../validation/login');


router.post('/login', async (req,res) =>{

    const {error} = loginValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);
    

    const user = await Users.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Your email is incorrect");
    if(user.password !== req.body.password) return res.status(400).send("Your password is incorrect.");
    const token = jwt.sign({_id:user._id}, process.env.AUTH_TOKEN);
    res.header('the-token', token).send(token);
    
});

module.exports= router;