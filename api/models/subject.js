const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subjectId: String,
    name: String,
    credit: Number
});

module.exports = mongoose.model('Subject', subjectSchema);