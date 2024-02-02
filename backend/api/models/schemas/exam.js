const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
        images : Object,
        questions : [Object],
        time : Number,
}, {timestamps : true});

module.exports = examSchema;