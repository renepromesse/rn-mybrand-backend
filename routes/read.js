const router =require('express').Router();
const read_commentController = require('../controllers/read_comments');

/*----------retrieve one article --------------*/

router.get('/blog/:id', read_commentController.readArticle);


/*-----------creating comments-----------*/

router.post('/blog/:id', read_commentController.addComment);



module.exports = router;