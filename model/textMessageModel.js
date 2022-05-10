const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TextMessageSchema = new Schema({
    content: String,
    sender: String,
    receiver: String,
    createdAt: String
})



//sender : email of sender
// receiver: email of receiver

module.exports = new mongoose.model('TextMessage',TextMessageSchema);