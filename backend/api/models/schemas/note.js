const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
        userId : Object,
        videoId : Object,
        text : String,
}, {timestamps : true});

module.exports = noteSchema;