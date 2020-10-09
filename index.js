const express = require('express')
const app = express()
const serverless = require('serverless-http');

let bodyParser = require('body-parser');

const apiRoutes = require("./api_routes/routes");
const dbconnection = require("./connections/dbconnection");

app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use('/api', apiRoutes);

const db = dbconnection();

app.get('/', (req, res) => res.send('Welcome from Book Inventory with Express'));

module.exports = app
module.exports.handler = serverless(app)