const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const hat = require('hat')

// Define database schema object
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        require: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        minLength: 3,
        select: false,
        required: [true, 'Please provide a password']
    },
    resetToken: String,
    resetExpire: Date,
})

// Hash password on save
UserSchema.pre('save', async function(next) {
    // Only hash on change
    if (!this.isModified('password'))
        next();

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.isPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

UserSchema.methods.getResetToken = function() {
    this.resetExpire = Date.now() + 10 * (60 * 1000)
    return (this.resetToken = hat())
}


// Export 
const User = mongoose.model('User', UserSchema)
module.exports = User