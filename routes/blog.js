const router= require('express').Router();
const blogController = require('../controllers/blog');

/*-----------retrieve all posts and sorted-----------*/
router.get('/blog',blogController.listArticles); 

module.exports = router;