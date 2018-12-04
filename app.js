const express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var hbs = require('express-hbs');
const bodyParser = require('body-parser');
const routes=require('./routes/route')
const passport = require('passport');
const session = require('express-session');
var flash = require('express-flash-messages')


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nodeauth',{useNewUrlParser:true},(err)=>{
    if(err){
        console.log(err)
        res.status(500).send()
    }
});

const app = express();
app.use(flash());
app.use(methodOverride('_method'))

app.set('views',path.join(__dirname,'views'));
app.engine('hbs',hbs.express4({defaultLayout: 'views/layouts/mainLayout'}));
app.set('view engine','hbs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Passport js
require('./utils/passport')(passport);

app.use(express.static(path.join(__dirname,'public')));
app.use(session({
  //cookie:{maxAge:60000},
  secret: 'secret',
  saveUninitialized: false,
  resave: false
}));


app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/',routes);

//creating port

let port = 3000;

app.listen(port,()=>{
    console.log('listening on port' + port);
})


