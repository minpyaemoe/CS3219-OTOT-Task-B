const express = require('express')
const app = express()
const serverless = require('serverless-http');
const cors = require('cors');

let bodyParser = require('body-parser');

const apiRoutes = require("./api_routes/routes");
const dbconnection = require("./connections/dbconnection");

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());


app.use('/api', apiRoutes);

const db = dbconnection();

app.get('/', (req, res) => res.send('Welcome from Book Inventory with Express'));

module.exports = app
module.exports.handler = serverless(app)