const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inProgressCoureseSchema = new Schema({
        inProgressCourese : Object,
        watchedVideos : [Object],
},{timestamps : true});

const userSchema = new Schema({
        email : {type : String,minlength:5, maxlength:255, required : true },
        password : {type : String,  required : true  },
        username : {type : String,  required : true , unique : true,dropDups: true,},
        firstname : {type : String,  required : true ,maxlength:255},
        lastname : {type : String,  required : true , maxlength:255},
        gender : {type : String,  required : true },
        wallet : {type : Number ,default:0},
},{timestamps : true});




module.exports = userSchema;