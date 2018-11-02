var mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    title: String,
    note: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notes', NotesSchema)