
const User = require("../model/User");
const LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');

module.exports =(passport)=>{
  passport.use(new LocalStrategy({usernameField:'email'},(email, password, done)=> {
    console.log(email);
    User.findOne({ email: email },(err, user)=>{
      console.log(user);
      if (err) { 
        console.log(err)
        return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }else{
        console.log(password);
        console.log(user.password);
        bcrypt.compare(password, user.password,(err, res)=> {
          console.log(res)
          //res==True or False
          if(res){
            return done(null,user);      
          }else{
            return done(null, false, { message: 'Incorrect password.' });      
          }
        });
      }
    });
  }));


  passport.serializeUser((user, done)=> {
    console.log("Inside serializeUser");
    console.log(user._id)
    done(null, user._id);
  });

  passport.deserializeUser((id, done)=> {
    console.log("Inside deserializeUser")
    User.findById(id, function(err, user) {
      done(null,user)
    });
  });

};