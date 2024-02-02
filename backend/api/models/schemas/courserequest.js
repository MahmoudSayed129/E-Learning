const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseRequestSchema = new Schema({
        image : String,
        courseID : Object,
        studentID : Object,
        studentName : String,
        studentUsername : String,
        corporate : String,
        title : String,
        status : String
}, {timestamps : true});


module.exports = CourseRequestSchema;