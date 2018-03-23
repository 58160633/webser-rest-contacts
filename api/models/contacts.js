const mongoose = require('mongoose');

const contactsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    Phone: Number,
    mobile: Number 
});

module.exports = mongoose.model('contacts', contactsSchema);