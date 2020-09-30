const Articles =require('../model/articles');
const Comments = require('../model/comments');
const {commentsValidation} = require('../validation/comments');

exports.readArticle = function (req,res){
    Articles.findById(req.params.id)
    .then(data =>{
        if(!data){
            res.status(404).json("This article doesn't exist or deleted!");
        }
        Comments.find({articleId: req.params.id})
        .then(result =>{
            res.status(200).json({article:data, comments:result});
        })
        .catch(error => res.status(500).json(data + " Can't query comments!"));
    })
    .catch(err => res.status(500).json("Bad request!!!"));

}


exports.addComment = function (req,res) {
    const { error } = commentsValidation(req.body);
    if(error) return res.status(500).json(error.details[0].message);

    const comment= new Comments({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        articleId: req.params.id
    });

    comment.save()
    .then((data) =>{
        res.status(201).json(data);
    })
    .catch(errors => res.status(500).json(errors.details[0].message));
}