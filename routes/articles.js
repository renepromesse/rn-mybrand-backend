const router = require('express').Router();
const articlesController = require('../controllers/articles');
const verifyToken = require('../tokenValidation/index');


/*-----------create new blog post-----------*/

router.post('/articles',verifyToken,articlesController.postArticle);


/*--------------get all saved blog posts--------*/

router.get('/articles',verifyToken,articlesController.savedArticles);


/*--------------updating one article------------*/

router.put('/articles/:id',verifyToken, articlesController.updateArticle);


/*---------------deleting article------------*/

router.delete('/articles/:id',verifyToken, articlesController.deleteArticle);



module.exports= router;