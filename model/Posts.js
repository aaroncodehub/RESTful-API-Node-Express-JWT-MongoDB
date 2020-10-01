const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    content: {
        type: String,
        required: true,
        max: 255,
        min:6
    },
    date: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Posts', userSchema)