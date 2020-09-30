const Articles=require('../model/articles');
const Comments= require('../model/comments');
const { articlesValidation } = require('../validation/articles');
const { updateValidation } = require('../validation/updateArticle');

//a callback to validate input and save a blog post
exports.postArticle= ((req,res)=>{

    const { error } = articlesValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const article = new Articles({
        image:req.body.image,
        title:req.body.title,
        content: req.body.content
    });
    article.save()
    .then((data) => res.status(201).json(data))
    .catch((err)=>{
        res.status(500).json(err);
    });
});


//a callback to retrieve saved articles
exports.savedArticles =((req,res) => {
    Articles.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err));
});


// a callback to updaete one post
exports.updateArticle = ((req,res) =>{
    if(Object.keys(req.body).length === 0) return res.status(401).json({message:"Can't update with empty data"});
    const { error } = updateValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    Articles.findByIdAndUpdate(req.params.id, req.body,{useFindAndModify:false})
    .then(data =>{ res.status(201).json({ message: "Article is updated successfully!"})})
    .catch( () => res.status(400).json({message:"Bad request!"}));
});

// a callback to delete one blog post
exports.deleteArticle =((req, res) =>{
    Articles.findByIdAndRemove(req.params.id,{useFindAndModify:false})
    .then(()=>{
        Comments.deleteMany({ articleId: req.params.id })
        .then(() => res.status(201).json({message:"Article and associated comments are deleted successfully"}))
        .catch(() => res.json({message:"Could not delete comments"}));
    }) 
    .catch(() => res.status(400).json({message:"Bad request!"}))
});