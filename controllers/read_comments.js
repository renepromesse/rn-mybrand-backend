const Articles =require('../model/articles');
const Comments = require('../model/comments');
const {commentsValidation} = require('../validation/comments');

exports.readArticle = function (req,res){
    Articles.findById(req.params.id)
    .then(data =>{
        if(!data){
            res.status(404).send("This article doesn't exist or deleted!");
        }
        Comments.find({articleId: req.params.id})
        .then(result =>{
            res.send(data + result);
        })
        .catch(error => res.send(data + " Can't query comments!"));
    })
    .catch(err => res.status(500).send("Bad request!!!"));

}


exports.addComment = function (req,res) {
    const { error } = commentsValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);

    const comment= new Comments({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        articleId: req.params.id
    });

    comment.save()
    .then((data) =>{
        if(!data){
            res.status(500).send("Fail to add a comment!");
        }
        else{
            res.send(data);
        }
    })
    .catch(errors => res.status(500).send(errors.details[0].message));
}