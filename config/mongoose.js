// import mongoose
const mongoose = require('mongoose')
// define mongodb as heroku or localdb
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/urlShortener'
// mongoose connect
mongoose.connect( MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// define mongodb connection as db
const db = mongoose.connection

// define db connection messages
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})
// export module as db
module.exports = db