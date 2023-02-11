const mongoose = require('mongoose');

const sentMailSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('SENTMAILS', sentMailSchema);