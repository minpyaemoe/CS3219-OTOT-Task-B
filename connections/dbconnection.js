const mongoose = require('mongoose')
const URI = process.env.MONGODB_URI || "mongodb+srv://user:+n6aHY4&$37aT{Sq@cluster0.ynm9w.mongodb.net/CS3219?retryWrites=true&w=majority"

const dbconnection = async() => {
  await mongoose.connect(URI, {  useUnifiedTopology: true, useNewUrlParser: true });
  console.log("Mongo DB connected successfully!");
}

module.exports = dbconnection;