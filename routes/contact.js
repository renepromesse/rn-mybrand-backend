const router = require('express').Router();
const contactController = require('../controllers/contact');

router.get('/contact', contactController.defaultPage);

router.post('/contact', contactController.sendMessage);


module.exports = router;