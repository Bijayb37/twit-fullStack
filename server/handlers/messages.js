const { User, Message } = require("../models")

exports.CreateMessage = async function (req, res, next) {
    try {
        //create new message variaable, and add data from route param and req body
        let message = await Message.create({
            text: req.body.text,
            user: req.params.id
        })
        //add the message into the users message array
        let foundUser = await User.findById(req.params.id)
        foundUser.message.push(message.id)
        await foundUser.save()
        //populate the message's user reference to send data to front end
        let foundMessage = await Message.findById(message._id)
            .populate("user", {
                username: true,
                profileImageUrl: true
            })
        return res.status(200).json(foundMessage)
    } catch (err) {
        return next(err)
    }
}

// api/users/:id/messages
exports.getUsersMessage = async function (req, res, next) {
    try {
        const foundUser = await User.findById(req.params.id)
            .populate("messages")

        const message = await Message.find().sort({ createdAt: "desc" })
            .populate("user", {
                username: true,
                profileImageUrl: true
            })
        return res.status(200).json(message)
    } catch (err) {
        return next(err)
    }
}

// api/users/:id/messages/:message_id
exports.getMessage = async function (req, res, next) {
    try {
        const message = await Message.findById(req.params.message_id)
        return res.status(200).json({
            message: message.text
        })
    } catch (err) {
        return next(err)
    }
}

// api/users/:id/messages/:message_id
exports.deleteMessage = async function (req, res, next) {
    try {
        const message = await Message.findById(req.params.message_id)
        await message.remove()

        return res.status(200).json({
            removedStatus: "deleted",
            message: message.text
        })
    } catch (err) {
        return next(err)
    }
}

// api/users/:id/messages/:message_id
exports.updateLikes = async function (req, res, next) {
    try {
        const message = await Message.findByIdAndUpdate(req.params.message_id, { likes: req.body.likes }, { new: true })
        return res.status(200).json({
            likes: message.likes
        })
    } catch (err) {
        return next(err)
    }
}

// api/users/:id/messages/:message_id/edit
exports.editMessage = async function (req, res, next) {
    try {
        const message = await Message.findByIdAndUpdate(req.params.message_id, { text: req.body.text }, { new: true })
        return res.status(200).json({
            text: message.text
        })
    } catch (err) {
        return next(err)
    }
}