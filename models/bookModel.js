// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: Number,
    genre: String,
    item_count: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Book = module.exports = mongoose.model('Book', bookSchema);
module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit);
}