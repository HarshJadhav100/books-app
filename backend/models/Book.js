
const { Timestamp } = require('mongodb');
const mongoose= require('mongoose');

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true

    }
    

},{timestamps:true});

const Book = mongoose.model('Book',bookSchema)

module.exports = Book;