var express = require('express');
var router = express.Router();

function isLoggedIn(req,res,next){
  req.user ? next() : res.render('error')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user)
    {
      res.render('home', { title: 'Express',username: req.user.displayName,email: req.user.emails[0].value });
    }
  else
    res.redirect('/login')
});

router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/logout',(req,res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('/login')
})


router.get('/chat',(req,res)=>{
  res.render('chat')
})



module.exports = router;
