const Articles = require('../model/articles');

exports.listArticles= function (req, res){
    Articles.find()
    .sort({ date: -1 })
    .then( data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
}