const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
        password : {type : String,  required : true ,minlength:8, maxlength:1024 },
        email :  {type : String, minlength:5, maxlength:1024 },
        minibiography :  {type : String, minlength:5, maxlength:1024 },
        username : {type : String,  required : true ,minlength:2, maxlength:255, unique : true,dropDups: true,},
        firstname : {type : String,},
        lastname : {type : String,},
        gender : {type : String,},
        rate : Number,
        ratedetails : [Number],
        numberofrates : Number,
        reviews : [Object],
        accepted : Boolean,
        firstlogin : {type :Boolean, default :true}
},{timestamps : true});

module.exports = instructorSchema;