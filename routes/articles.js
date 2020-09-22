const router = require('express').Router();
const verifyToken = require('../tokenValidation/index');
const Articles=require('../model/articles');
const Comments= require('../model/comments');
const { articlesValidation } = require('../validation/articles');


/*-----------create new blog post-----------*/

router.post('/articles',verifyToken,(req,res)=>{

    const { error } = articlesValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);

    const article = new Articles({
        image:req.body.image,
        title:req.body.title,
        content: req.body.content
    });
    article.save()
    .then((data) => res.send(data))
    .catch((err)=>{
        res.status(500).send(err);
    });
});

/*--------------get all saved blog posts--------*/
//after returning all articles don't forget to filter the result 
//to output the ones with read status of false and change them to true

router.get('/articles',verifyToken,(req,res) =>{
    Articles.find()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});



/*--------------updating one article------------*/
router.put('/articles/:id',verifyToken,(req,res)=>{
    if(!req.body) return res.send({message:"Can't update with empty data"});
    Articles.findByIdAndUpdate(req.params.id, req.body,{useFindAndModify:false})
    .then(data =>{ res.send(req.params.id+" Articles updated successfully!")})
    .catch( () => res.status(500).send("Bad request!"));
    
});

/*---------------deleting article------------*/
router.delete('/articles/:id',verifyToken,(req, res) =>{
    Articles.findByIdAndRemove(req.params.id,{useFindAndModify:false})
    .then(()=>{
        Comments.deleteMany({ articleId: req.params.id })
        .then(() => res.send("Article and associated comments are deleted successfully"))
        .catch(() => res.send("Could not delete comments"));
    }) 
    .catch(() => res.status(500).send("Bad request!"))
});
module.exports= router;