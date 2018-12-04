const express = require('express');

const router = express.Router();

const post= require('../controller/PostsController');
const user=require('../controller/UsersController');

const passport=require('passport')

//GET
router.get('/',notAuthentication,post.index)
router.get('/dashboard',checkAuthentication,post.dashboard)

//Register user
router.get('/signup',notAuthentication,user.register)
router.get('/login',notAuthentication,user.loginform)
router.get('/posts/create',checkAuthentication,post.createpost) 

router.get('/posts/:id/view',checkAuthentication,post.view)
router.get('/posts/:id/edit',checkAuthentication,post.editform)
router.get('/logout',checkAuthentication,user.logout);


//Post
router.post('/createpost',checkAuthentication,post.createpost)
router.post('/signup',notAuthentication,user.validateform)
router.post('/login',passport.authenticate('local',{
    successRedirect:'/dashboard',
    faliureRedirect:'/login',
    faliureFlash:true
}))


//Update
router.put('/posts/:id/edit',checkAuthentication,post.editpost)

//Delete
router.delete('/posts/:id/delete',checkAuthentication,post.deletepost)


function checkAuthentication(req,res,next){

    if(req.isAuthenticated()){
		
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

function notAuthentication(req,res,next){
	if(!req.isAuthenticated()){
		next();
	}else{
		res.redirect("/dashboard");
	}
}

module.exports = router;