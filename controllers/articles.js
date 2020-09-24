const Articles=require('../model/articles');
const Comments= require('../model/comments');
const { articlesValidation } = require('../validation/articles');
const { updateValidation } = require('../validation/updateArticle');

//a callback to validate input and save a blog post
exports.postArticle= function (req,res){

    const { error } = articlesValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const article = new Articles({
        image:req.body.image,
        title:req.body.title,
        content: req.body.content
    });
    article.save()
    .then((data) => res.send(data))
    .catch((err)=>{
        res.status(400).send(err);
    });
}


//a callback to retrieve saved articles
exports.savedArticles = function (req,res) {
    Articles.find()
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err));
}


// a callback to updaete one post
exports.updateArticle = function (req,res){
    if(Object.keys(req.body).length === 0) return res.send({message:"Can't update with empty data"});
    const { error } = updateValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    Articles.findByIdAndUpdate(req.params.id, req.body,{useFindAndModify:false})
    .then(data =>{ res.send(req.params.id+" article is updated successfully!")})
    .catch( () => res.status(400).send("Bad request!"));
}


// a callback to delete one blog post
exports.deleteArticle = function (req, res){
    Articles.findByIdAndRemove(req.params.id,{useFindAndModify:false})
    .then(()=>{
        Comments.deleteMany({ articleId: req.params.id })
        .then(() => res.send("Article and associated comments are deleted successfully"))
        .catch(() => res.send("Could not delete comments"));
    }) 
    .catch(() => res.status(400).send("Bad request!"))
}