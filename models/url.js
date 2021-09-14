//  import mongoose
const mongoose = require('mongoose')
//  use mongoose schema
const Schema = mongoose.Schema
//  define url schema data type
const urlSchema = new Schema({ 
  inputURL: {
    type: String,
    required: true,
  },
  randomCode: {
    type: String,
    required: true,
  },
})
//  export url schema as URL
module.exports = mongoose.model('URL', urlSchema)