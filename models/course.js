const mongoose = require('mongoose');
const Schema= mongoose.Schema;


const courseSchema = new Schema({
    name: { type: String, required: true},
    desc: { type: String, required: true},
    dept: { type: String, required: true},
    levl: { type: Number, required: true},
    preq: { type: Boolean, required: true},//can be 0 or 1//false or true
    cred: { type: Number, required: true}//can I make this an array for more than one course prerequisite?
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;