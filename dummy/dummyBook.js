Book = require('../models/bookModel');

bookA = new Book();

bookA.title = 'Book A';
bookA.author = 'Athor A';
bookA.pages = 500;
bookA.genre = 'Genre A';
bookA.item_count = 50;

module.exports = bookA;