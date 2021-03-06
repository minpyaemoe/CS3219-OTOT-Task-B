Book = require('../models/bookModel');

// Handle index actions
exports.index = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        return res.json({
            status: "success",
            message: "Books retrieved successfully",
            books: books
        });
    });
};

// Handle create book actions
exports.new = function (req, res) {
    var book = new Book();

    book.title = req.body.title ? req.body.title : book.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    book.genre = req.body.genre;
    book.item_count = req.body.item_count;

    book.save(function (err) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        return res.json({
            message: 'New book created!',
            book: book
        });
    });
};

// Handle view book info
exports.view = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        return res.json({
            message: 'Book details loading..',
            book: book
        });
    });
};

// Handle update book info
exports.update = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        book.title = req.body.title ? req.body.title : book.title;
        book.author = req.body.author;
        book.pages = req.body.pages;
        book.genre = req.body.genre;
        book.item_count = req.body.item_count;

        book.save(function (err) {
            if (err) {
                return res.json({
                    status: "error",
                    message: err,
                });
            }
            return res.json({
                message: 'Book Info updated',
                book: book
            });
        });
    });
};

// Handle delete book
exports.delete = function (req, res) {
    Book.deleteOne({
        _id: req.params.book_id
    }, function (err, book) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        return res.json({
            status: "success",
            message: 'Book deleted'
        });
    });
};