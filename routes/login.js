const router = require('express').Router();
const loginController = require('../controllers/login');

router.get('/login', loginController.defaultPage);

router.post('/login', loginController.loginCheck);

module.exports= router;