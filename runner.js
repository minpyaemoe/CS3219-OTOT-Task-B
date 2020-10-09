const server_app = require('./server');

var port = process.env.PORT || 5000;

server_app.listen(port, function () {
    console.log("Running server on port " + port);
});

