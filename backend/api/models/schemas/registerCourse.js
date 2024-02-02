const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const videoSchema = new Schema({
//     discription : String,
//     url : String,
//     title : String,
// }, {timestamps : true});

const registerCourseSchema = new Schema({
        image : String,
        createdById : Object,
        createdByName : String,
        courseID : Object,
        studentID : Object,
        studentName : String,
        studentUsername : String,
        completedVideos : [Object],
        attemptedQuizs : [Object],
        completedQuizs : {type : Number, default : 0},
        totalItems : Number,
        totalHours : Number,
        price : Number,
        rate : Number,
        numberofrates : Number,
        reviews : [Object],
        discount : Object,
        rateInstructor : Boolean,
        rateCourse : Boolean,
        subject : String,
        summary : String, 
        title : String,
        notes : [Object],
        pending : Boolean,
        overviewvideo : Object,
        pending : {type : Boolean,default : false},
        sentCertificate : {type : Boolean,default : false},
        examsId : [Object],
        subtitles : [Object]
}, {timestamps : true});


module.exports = registerCourseSchema;