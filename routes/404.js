const { route } = require('./contact');

const router = require('express').Router();

router.get("/", (req,res)=>{
    res.status(404).send("request not available");
});


module.exports= router;