const mongoose = require('mongoose');
const Schema= mongoose.Schema;


const blargSchema = new Schema({
    title: { type: String, required: true},
    snippette: { type: String, required: true},
    body: { type: String, required: true}
}, { timestamps: true });

const Blarg = mongoose.model('Blarg', blargSchema);
module.exports = Blarg;