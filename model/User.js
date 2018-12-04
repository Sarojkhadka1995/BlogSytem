const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userschema = new Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobile:{
        type:Number
    }
})

module.exports = mongoose.model('Users',userschema);
