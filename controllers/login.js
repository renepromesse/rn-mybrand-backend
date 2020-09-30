
const Users= require('../model/user');
const jwt= require('jsonwebtoken');
const {loginValidation} = require('../validation/login');

/*----------- a callback to give out default page-----------*/

exports.defaultPage = function (req, res) {
    res.status(200).json({message : "Welcome on Login Page"});
}


/*-------------- a callback to login and create a token------*/

exports.loginCheck = async function  (req,res) {

    //validate req.body properties

    const {error} = loginValidation(req.body);
    if(error) return res.status(500).json(error.details[0].message);
    
    //retrieve one user with given parameters

    const user = await Users.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({ message : "Incorrect email or password" });
    if(user.password !== req.body.password) return res.status(400).json({ message : "Incorrect email or password" });
    const token = jwt.sign({_id:user._id}, process.env.AUTH_TOKEN);
    res.header('the-token', token).status(201).json({ "the-token" : token});
    
}