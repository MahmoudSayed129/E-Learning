const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
        role : String,
        email : {type : String},
        password : {type : String,  required : true  },
        username : {type : String,  required : true , unique : true,dropDups: true,},
        firstname : {type : String,maxlength:255},
        lastname : {type : String, maxlength:255},
        gender : {type : String},
        corporate : {type : String},
        firstlogin : {type : Boolean, default : true},
},{timestamps : true});

module.exports = roleSchema;