const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const walletSchema = new Schema({
        total : Number,
        instructorID : Object,
        details : [Object]
},{timestamps : true});




module.exports = walletSchema;