const mongoose = require("mongoose")
// mongoose.connect('mongodb://localhost:27017/first', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb+srv://admin:admin@cluster0.ft7h2.mongodb.net/first?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

module.exports.User = require('./user')
module.exports.Message = require('./message')