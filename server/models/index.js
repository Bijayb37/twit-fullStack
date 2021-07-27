const mongoose = require("mongoose")
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports.User = require('./user')
module.exports.Message = require('./message')