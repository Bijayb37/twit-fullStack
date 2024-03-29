const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profileImageUrl: {
        type: String
    },
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
})
//hash password when creaating a new user
userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next()
        }
        let hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return next()
    }   catch (err) {
        return next(err)
    }
})
//function to compare typed in password to hashed password in database
userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (err) {
        return next(err)
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User
