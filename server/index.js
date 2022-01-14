require("dotenv").config()
const express = require('express')
const app = express()
const errorHandler = require('./handlers/error')
const {Message} = require("./models")
const authRoutes = require("./routes/auth")
const messageRoutes = require("./routes/messages")
const {loginRequired, ensureCorrectUser} = require("./middleware/auth")
const PORT = process.env.PORT || 3002

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
//routes and middleware
app.use("/api/auth", authRoutes)
app.use("/api/users/:id/messages", loginRequired,ensureCorrectUser, messageRoutes)
//get all messages from database
app.get("/api/messages", async function(req,res,next) {
    try {
        const message = await Message.find().sort({createdAt: "desc"})
        .populate("user", {
            username: true,
            profileImageUrl: true
        })
        return res.status(200).json(message) 
    } catch (err) {
        return next(err)
    }
})

app.get("/api/ping", (req, res, next) => {
    return res.status(200).json({
        message: "connected"
    })
})
//custom 404 error
app.use((req, res, next) => {
    let err = new Error("Not Found")
    err.status = 404
    next(err)
})
//custom error haandler, make it easier to identify errors for the front end
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`connection open on port ${PORT}`)
})