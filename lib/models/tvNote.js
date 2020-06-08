/* eslint-disable eol-last */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tvShowName: {
    type: String,
    required: true
  },
  tvShowEpesode: {
    type: Number,
    min: 0,
    default: 0
    
  },
  thoughts: {
    type: String,
    maxlength: 500
  }

});



module.exports = mongoose.model ('tvNote', schema);