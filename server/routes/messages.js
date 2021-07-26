const express = require("express")
const { CreateMessage, getMessage, deleteMessage, editMessage} = require("../handlers/messages")
const router = express.Router({mergeParams: true})
const {updateLikes} = require("../handlers/messages")

router.route("/").post(CreateMessage)
router.route("/:message_id/edit").patch(editMessage)
router.route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage)
    .patch(updateLikes)

module.exports = router