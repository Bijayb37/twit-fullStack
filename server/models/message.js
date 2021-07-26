const mongoose = require("mongoose")
const User = require("./user")

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 280
    },
    likes: {
      type: Number,
      default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})
//remove message from users message array when deleting a message
messageSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the message from their messages list
    user.message.remove(this._id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});


  

const Message = mongoose.model("Message", messageSchema)

module.exports = Message