const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    title: String,
    createdAt: String,
    lastMessage: String,
    userList :[
        {
            user: String,
        }
    ]
})



module.exports = new mongoose.model('Room',RoomSchema);