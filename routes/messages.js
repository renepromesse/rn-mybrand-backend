const router = require('express').Router();
const messageController = require('../controllers/message');
const tokenVerify= require('../tokenValidation/index');

/*-------------- retrieve all messages saved-----------------*/

router.get('/messages', tokenVerify , messageController.viewMessages);


module.exports= router;

