const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const videoSchema = new Schema({
//     discription : String,
//     url : String,
//     order : Number,
// }, {timestamps : true});

// const quizsSchema = new Schema({
//     id : Object,
// }, {timestamps : true});

// const subtitleSchema = new Schema({
//     totalHours : Number,
//     title : String,
//     summary : String,
//     quizs : [{quizsSchema}],
//     videos : [{videoSchema}],
// }, {timestamps : true});


const courseSchema = new Schema({
        image : String,
        createdById : Object,
        createdByName : String,
        // courseId : Object,
        totalHours : Number,
        price : Number,
        rate : Number,
        ratedetails : [Number],
        numberofrates : Number,
        reviews : [Object],
        discount : Object,
        // subtitle : Object,
        subject : String,
        summary : String, 
        title : String,
        registers : {type  : Number, default : 0},
        views : {type  : Number, default : 0},
        overviewvideo : Object,
        examsId : [Object],
        subtitles : [Object],
        totalItems : Number,
        
}, {timestamps : true});


module.exports = courseSchema;