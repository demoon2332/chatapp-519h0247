const mongoose = require('mongoose')
const credential = require('./credential.json')
const { connectionString } = credential.mongo.development
mongoose.connect(connectionString)
const db = mongoose.connection

db.on('error',err => {
 console.error('MongoDB error: ' + err.message)
 process.exit(1)
})

db.once('open', () => console.log('MongoDB connection established'))