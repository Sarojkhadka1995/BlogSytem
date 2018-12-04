const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register=(req,res)=>{
    res.render('pages/signup',{
        viewTitle:"Register"
    });
}

exports.validateform=(req,res)=>{
    //res.send(req.body._id);
   if (req.body._id == ''){
        insertRecord(req,res);
   }else{
       //res.send("Inside update route");
       updateRecord(req,res);
   }
}

function insertRecord(req,res){
   console.log(req.body.fname); 
   var email=req.body.email
   User.findOne({email:email},(err,doc)=>{
       if(err){
           res.status(500).send("Error occured")
       }else{
           if(doc){
               res.status(500).send("User already exists in database");

           }else{
            bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
                     if(err){
                         console.log(err);
                         res.status(500).send();
                     }else{
                         console.log(hash);	
                         var user = new User({
                           username:req.body.fname,
                           email: req.body.email,
                           password:hash,
                           mobile:req.body.mobile
                       });
                       user.save((err,user)=>{
                           if(err){
                               res.render("pages/signup",{
                                   viewTitle:"Register"
                               });
                               console.log(err);
                           }else{
                               res.redirect('/login')
                           }
                       });
                   }
               });	
           }
       }
   })
}


function updateRecord(req, res){
   User.findOneAndUpdate({ _id: req.body._id }, {username:req.body.fname,email: req.body.email,
               password:hashPassword(req.body.password),
               mobile:req.body.mobile}, { returnNewDocument: true,upsert:true }, (err, doc) => {
       if (!err) { res.redirect('/login'); }
       else {
           res.render("pages/signup", {
                   viewTitle: 'Update User',
                   user: req.body
              });
           console.log('Error during record update : ' + err);
       }
   });
}


//Login form
exports.loginform=(req,res)=>{
    req.flash("Login failed");
    res.render('pages/login');
}

//Logout 
exports.logout=(req,res)=>{
    req.logout();
    res.redirect('/');
}

