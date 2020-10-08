const express = require('express')
const app = express()

let bodyParser = require('body-parser');

var port = process.env.PORT || 5000;

const apiRoutes = require("./api_routes/routes");
const dbconnection = require("./connections/dbconnection");

app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use('/api', apiRoutes);

const db = dbconnection();

app.get('/', (req, res) => res.send('Hello World with Express'));

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});