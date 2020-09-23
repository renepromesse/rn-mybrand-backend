const Articles = require('../model/articles');

exports.listArticles= function (req, res){
    Articles.find()
    .sort({ date: -1 })
    .then( data => res.send(data))
    .catch(err => res.status(500).send(err));
}