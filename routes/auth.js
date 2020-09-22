const router = require('express').Router();

router.get('/users', (req, res)=>{
    res.send('users');
});

// router.post('/contact',(req,res) =>{
//     res.send('contact');
// })
module.exports= router;