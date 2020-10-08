const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')
const dummyBook = require('../dummy/dummyBook')

chai.use(chaiHttp);
chai.should();

const mongoose = require('mongoose');

describe("Books",  function() {
    var dummyBookid;
    describe("GET /", function() {
        before(function(done) {
            dummyBook.save(function (err) {
                if (err) {
                    return done(err)
                }
                dummyBookid = dummyBook._id;
                done()
            });
        });

        // Test to get all book records
        it("should get all book records", (done) => {
            chai.request(app)
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get a book record
        it("should get a book record", (done) => {
            chai.request(app)
                .get(`/api/books/${dummyBookid}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message", "Book details loading..");
                    res.body.should.not.have.property("data", null);
                    res.body.should.be.a('object');
                    done();
                 });
        });

        // Test to delete a book record
        it("should delete a book record", (done) => {
            chai.request(app)
                .delete(`/api/books/${dummyBookid}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message", "Book deleted");
                    done();
                 });
        });

        // Test to get single student record
        it("should not get a single student record", (done) => {
            chai.request(app)
                .get(`/api/books/${dummyBookid}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message", "Book details loading..");
                    res.body.should.have.property("data", null);
                    done();
                 });
        });

        //Close DB connection
        after(function() {
            mongoose.connection.close();
        })
    })
})