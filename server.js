const server_app = require('./index');

var port = process.env.PORT || 5000;

server_app.listen(port, function () {
    console.log("Running server on port " + port);
});

