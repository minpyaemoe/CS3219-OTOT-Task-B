const express = require('express')
const serveStaticWeb = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStaticWeb(path.join(__dirname, '/dist')))

app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`Front End Vue App is listening on locahost at port: ${port}`)