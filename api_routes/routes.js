const Router = require('express').Router();

Router.get('/', function (req, res) {
    res.json({
        status: 'APIs are working',
        message: 'Welcome to Book Inventory!'
    });
});

const bookcontroller = require('../controllers/bookController');

Router.route('/books').get(bookcontroller.index).post(bookcontroller.new);
Router.route('/books/:book_id')
    .get(bookcontroller.view)
    .patch(bookcontroller.update)
    .put(bookcontroller.update)
    .delete(bookcontroller.delete)

module.exports = Router;
