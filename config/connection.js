const mongoose = require('mongoose');
const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/outlookDB';

mongoose.set('strictQuery', true)
mongoose.connect(url).then(() => {
    console.log("DATABASE IS CONNECTED");
}).catch(err => {
    console.log("THERE ARE SOME ISSUES WHILE CONNECTING TO THE DATABASE");
});

const USERS = require('../models/users');
const SENTMAILS = require('../models/sentmails');

module.exports = {
    USERS, SENTMAILS
}