const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let post = new Schema ({
    title:{
        type:String
    },
    body:{
        type:String
    },
    created_date:{
        type: Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Post',post);
